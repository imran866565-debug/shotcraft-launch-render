import { useVisualTheme, themePaint, themeAsset } from '../themes/visual-theme';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { SceneOpen } from './live/SceneOpen';
import { SceneFlyIn } from './live/SceneFlyIn';
import { SceneDetail } from './live/SceneDetail';
import { PaperTitleCard } from './PaperTitleCard';
import { SceneOutroLive } from './live/SceneOutroLive';
import { AuroraShot } from './AuroraShot';
import { EndCard } from './EndCard';
import { FlashCut } from './FlashCut';
import { Caption } from './Caption';

// Solstice One — fictional smart circadian light launch film.
// 1061f = 35.37s @ 30fps. All shot boundaries land on beats of the trimmed BGM
// (BPM 123.89, T = 0.48429s, beatF(n) = round(n * 14.5287); see DESIGN_SPEC.md).
export const AIFL_SHOTS = {
  morning: { from: 0, duration: 218 },   // 0–7.3s   brand ~83f + hero macro
  card1: { from: 218, duration: 58 },   // 7.3–9.2s "Your light never changes. Your day does."
  aurora: { from: 276, duration: 160 }, // 9.2–14.5s dawn→midnight flip
  table: { from: 436, duration: 189 },  // 14.5–20.8s deck deal → type "movie night" → click
  macro: { from: 625, duration: 101 },  // 20.8–24.2s Movie Night detail rows
  card2: { from: 726, duration: 59 },   // 24.2–26.2s "One light. Every moment."
  outro: { from: 785, duration: 145 },  // 26.2–31.0s group-photo launch
  endcard: { from: 930, duration: 131 },// 31.0–35.4s static brand + $129 hold
} as const; // sum = 1061

export const AIFL_TOTAL = 1061;

// title-card copy: space-separated words, `*word*` = amber italic accent.
export const TITLE_CARDS = {
  card1: { text: 'Your light never changes. *Your* day does.' },
  card2: { text: 'One light. *Every* moment.' },
} as const;

export const parseWords = (text: string): { text: string; accent?: boolean }[] =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      const m = w.match(/^\*(.+)\*$/);
      return m ? { text: m[1], accent: true } : { text: w };
    });

// warm flash cuts straddle these hard cuts (from = cut − 5, 10f long)
export const FLASH_CUTS = [AIFL_SHOTS.table.from, AIFL_SHOTS.macro.from];

// keyboard: 33f for the 11-char "movie night" typing (3f/char)
export const sfxDuration = (s: { from: number; src: string }) =>
  s.src === 'keyboard.mp3' ? 33 : 90;

// voiceover lines (KittenTTS expr-voice-3-m, male energetic). Absolute frames.
export const VO_LINES = [
  { from: 15, src: 'vo1.wav' },
  { from: 165, src: 'vo2.wav' },
  { from: 395, src: 'vo3.wav' },
  { from: 650, src: 'vo4.wav' },
  { from: 860, src: 'vo5.wav' },
] as const;

// SFX pinned to animation beats. `from` already compensates the per-file peak
// lag + the 1.28f output-audio offset (sound-design §4.6; see DESIGN_SPEC.md).
// Riser peaks at its END, so its `from` = stamp − 48f duration.
export const SFX: { from: number; src: string; volume: number }[] = [
  { from: 3, src: 'transition-soft.mp3', volume: 0.4 },   // brand lockup lands
  { from: 71, src: 'whoosh-fast.mp3', volume: 0.45 },    // brand → dashboard
  { from: 120, src: 'whoosh-big.mp3', volume: 0.5 },     // hero card pops
  { from: 137, src: 'sparkle.mp3', volume: 0.35 },       // beam lap 1
  { from: 211, src: 'transition-snap.mp3', volume: 0.5 },// card reseats
  { from: 216, src: 'swoosh-quick.mp3', volume: 0.4 },   // title card 1
  { from: 269, src: 'transition-soft.mp3', volume: 0.4 },// aurora opens
  { from: 371, src: 'impact-cine.mp3', volume: 0.55 },   // aurora flip
  { from: 462, src: 'whoosh-big.mp3', volume: 0.5 },     // first card deals
  { from: 493, src: 'whoosh-fast.mp3', volume: 0.4 },    // deal accelerates
  { from: 555, src: 'keyboard.mp3', volume: 0.4 },       // typing "movie night"
  { from: 589, src: 'whoosh-fast.mp3', volume: 0.4 },    // grid filters away
  { from: 615, src: 'click-camera.mp3', volume: 0.6 },   // click on Movie Night
  { from: 616, src: 'transition-soft.mp3', volume: 0.45 },// detail opens
  { from: 724, src: 'swoosh-quick.mp3', volume: 0.4 },   // title card 2
  { from: 780, src: 'riser-cine.mp3', volume: 0.5 },     // riser into outro stamp
  { from: 825, src: 'impact-cine.mp3', volume: 0.55 },   // wordmark stamps
  { from: 850, src: 'sparkle.mp3', volume: 0.3 },        // rule glint
  { from: 923, src: 'transition-soft.mp3', volume: 0.4 },// endcard fades in
];

// narration captions over the live shots (absolute frames; outro stays clean)
export const CAPTIONS = [
  { from: 130, duration: 60, text: 'ONE LAMP · EVERY LIGHT' }, // 130–190: camera is locked on the hero; the pill sits below the card over dark space (at 90–150 it covered the bottom-row card titles)
  { from: 440, duration: 60, text: 'TEN SCENES · ONE TAP' },
  { from: 630, duration: 70, text: 'MOVIE NIGHT · 2200K' },
] as const;

// BGM ducking: dip under voiceover lines (8f fades), full level between lines.
const VO_WINDOWS: [number, number][] = [
  [15, 154], [165, 385], [395, 640], [650, 849], [860, 1033],
];
const BgmAudio: React.FC<{ bgm: boolean }> = ({ bgm }) => {
  const frame = useCurrentFrame();
  let vol = 0.32;
  for (const [a, b] of VO_WINDOWS) {
    const dip = interpolate(frame, [a - 8, a, b, b + 8], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    vol = Math.min(vol, 0.32 - 0.16 * dip);
  }
  if (!bgm) vol = 0;
  return <Audio src={staticFile('audio/bgm-tech-house.mp3')} volume={vol} />;
};

export const AiflMain: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => {
  const theme = useVisualTheme();
  const paint = (css: string) => themePaint(theme, css);
  const asset = (src: string) => themeAsset(theme, src);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0B12' }}>
      {/* background music bed (ducked under VO; off in the no-music mix) */}
      <BgmAudio bgm={bgm} />
      {/* voiceover (present in BOTH mixes) */}
      {VO_LINES.map((v) => (
        <Sequence key={v.src} from={v.from} durationInFrames={300}>
          <Audio src={staticFile(`audio/${v.src}`)} volume={1} />
        </Sequence>
      ))}
      {/* beat-pinned sound effects (present in BOTH mixes) */}
      {SFX.map((s, i) => (
        <Sequence key={`sfx-${i}`} from={s.from} durationInFrames={sfxDuration(s)}>
          <Audio src={asset(`audio/${s.src}`)} volume={s.volume} />
        </Sequence>
      ))}
      <Sequence from={AIFL_SHOTS.morning.from} durationInFrames={AIFL_SHOTS.morning.duration}>
        <SceneOpen />
      </Sequence>
      <Sequence from={AIFL_SHOTS.card1.from} durationInFrames={AIFL_SHOTS.card1.duration}>
        <PaperTitleCard
          duration={AIFL_SHOTS.card1.duration}
          words={parseWords(TITLE_CARDS.card1.text)}
        />
      </Sequence>
      <Sequence from={AIFL_SHOTS.aurora.from} durationInFrames={AIFL_SHOTS.aurora.duration}>
        <AuroraShot />
      </Sequence>
      <Sequence from={AIFL_SHOTS.table.from} durationInFrames={AIFL_SHOTS.table.duration}>
        <SceneFlyIn />
      </Sequence>
      <Sequence from={AIFL_SHOTS.macro.from} durationInFrames={AIFL_SHOTS.macro.duration}>
        <SceneDetail />
      </Sequence>
      <Sequence from={AIFL_SHOTS.card2.from} durationInFrames={AIFL_SHOTS.card2.duration}>
        <PaperTitleCard
          duration={AIFL_SHOTS.card2.duration}
          words={parseWords(TITLE_CARDS.card2.text)}
        />
      </Sequence>
      <Sequence from={AIFL_SHOTS.outro.from} durationInFrames={AIFL_SHOTS.outro.duration}>
        <SceneOutroLive />
      </Sequence>
      <Sequence from={AIFL_SHOTS.endcard.from} durationInFrames={AIFL_SHOTS.endcard.duration}>
        <EndCard />
      </Sequence>
      {/* narration captions over the live shots (under the flash cuts) */}
      {CAPTIONS.map((c) => (
        <Sequence key={c.from} from={c.from} durationInFrames={c.duration}>
          <Caption text={c.text} duration={c.duration} color="#F5F1EA" accent="#FFB454" />
        </Sequence>
      ))}
      {/* warm flash cuts straddling scene changes */}
      {FLASH_CUTS.map((cut) => (
        <Sequence key={cut} from={cut - 5} durationInFrames={10}>
          <FlashCut duration={10} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
