# Solstice One — Product Launch Video · Design Spec
Autonomous free creation (video-shotcraft pipeline.md stages 0–3). Fictional product, from scratch.

## Stage 0 — Product brief
- **Product:** Solstice One — a fictional smart circadian light (invented brand; no real trademarks).
- **Tagline:** "Light that follows your day."
- **Price:** $129. "Available now."
- **Audience:** general consumers, social launch (30–45 s, 1920×1080, 30 fps, English VO).
- **Core features (all shown):**
  1. Circadian Auto-Shift — 2200K dawn → 6500K noon → 2700K dusk → 1800K night, automatic.
  2. One-tap scenes in the app — Movie Night, Focus, Sunrise Alarm, Reading…
  3. Sleep Wind-Down — fades to 1800K over 30 minutes.
- **Constraints (hard):** NO images of living beings anywhere. NO real brand assets. All pages are
  my own HTML mockups (captured as textures — the from-scratch part). Freesound is BLOCKED from
  this VM (HTTP 403, verified 2026-11-17) → SFX are synthesized originals (see §6).
- **Decisions:** BGM = `bgm-tech-house.mp3` (Mixkit Free License, no attribution required;
  ~124 BPM documented). VO = male energetic, VoiceStudio KittenTTS `expr-voice-3-m`, speed 1.1
  (L5b at 1.25). Two mixes from one timeline via `bgm` inputProp: full mix (BGM+SFX+VO) and
  no-music mix (SFX+VO only).

## Stage 1 — Visual direction
- **Direction:** "Sunrise in a dark room" — dark premium dashboard (#0B0B12) against warm paper
  brand/title cards (#faf7f2); the film moves light → dark → light (brand) → dark (product) →
  light (aurora flip start) → dark (flip) → dark product → light outro scrim? No — outro stays
  dark with warm stage light. Amber is the single accent.
- **Tokens:** bg dark `#0B0B12`, panels `#14141F/#171724`, text `#F5F1EA`, muted `#9A97A8`,
  amber `#FFB454`, rose `#E07856`, indigo `#6B4FE0`, paper `#FAF7F2`, ink `#13110F`.
- **Fonts:** wordmark/titles Georgia serif (letterpress); UI mono for kickers/captions.
- **Motion character:** consumer-energetic ("活泼愉悦" preset: ~27f entrances,
  bezier(0.34,1.56,0.64,1), overshoot 1.08) for UI; the hero card is slow/premium per its card
  (lock→touchdown ≈3.3 s). One motion voice, no mixed easings.
- **Styleframe:** skipped as a separate render — the mockup dashboard + captured textures ARE the
  styleframe (verified by eye at 2x before any Remotion code).

## Stage 2 — Feature → shot mapping
| Feature | Shot card (gallery-verified) | Implementation |
|---|---|---|
| Brand | `brand-ink-open` (83f) | template SceneOpen 0–83, re-skinned: wordmark "Solstice One", kicker "LIGHT THAT FOLLOWS YOUR DAY" |
| Hero product | `spotlight-hero-card` (172f demo; 138f in-template) | template SceneOpen 84–220, hero = card4 "Solstice One" texture, note "One lamp, / every light." |
| Hook | `paper-title-card` (55f) | "Your light never changes. *Your day* does." |
| Circadian shift | `aurora-bloom-bg-flip` (156f) | own AuroraShot.tsx (plain Remotion, card parameters kept): A "Your light never changes." → flip → B "Until now." Blobs re-skinned amber/rose/indigo |
| Feature volume | `deck-deal-flyin` (150f) | template SceneFlyIn 0–113, 26 cards dealt (10 real + 16 extras) |
| App search | `type-and-filter` (~150f) | template SceneFlyIn 118–190, query "movie night", target card9 "Movie Night" → detail |
| Scene detail | (template macro, 100f) | SceneDetail on detail-full.png, 4 rows fly in |
| Breather | `paper-title-card` (55f) | "One light. *Every* moment." |
| Finale | `outro-group-photo-launch` (145f) | SceneOutroLive, 9 Solstice elements, wordmark "Solstice One", tagline "LIGHT THAT FOLLOWS YOUR DAY · $129" |
| End card | (static hold) | EndCard.tsx: orb + wordmark + "$129 · AVAILABLE NOW", fade-in, hold |

## Stage 3 — Storyboard & frame timeline (beat-anchored)
- **Beat grid (measured, analysis/beat_data.json):** BGM trimmed to start at source beat #30
  (15.0388 s); grid BPM **123.89**, T = **0.48429 s**, t0 = 0.5099 s (source), match 92.4%
  within 30 ms, MAE 14.4 ms, drift −24.6 ms/40 s (≈1.6f — inside the ≤3f cut tolerance).
  Film-time `beatF(n) = round(n × 14.5287)`. All shot boundaries land on beats.
- **Total: 1061f = 35.37 s @30fps.**

| # | Shot | From–To (f) | Beats | Content |
|---|---|---|---|---|
| 0 | morning (brand+hero) | 0–218 | 0–15 | crosshair → SOLSTICE ONE letterpress → kicker → spotlight locks hero card, rise/hover/beam/reseat |
| 1 | card1 | 218–276 | 15–19 | "Your light never changes. *Your day* does." |
| 2 | aurora | 276–436 | 19–30 | amber blobs rise on light bg → flip to dark (~f373) → "Until now." |
| 3 | table (deck+filter) | 436–625 | 30–43 | pile orbit → 26 cards deal → scroll → type "movie night" → filter → click → push-in |
| 4 | detail | 625–726 | 43–50 | Movie Night detail page, 4 rows fly in |
| 5 | card2 | 726–785 | 50–54 | "One light. *Every* moment." |
| 6 | outro | 785–930 | 54–64 | 9 elements fly in, wordmark stamps, rule + tagline |
| 7 | endcard | 930–1061 | 64–73 | static brand + $129, hold to end |

- **Slams (≤3, whole-frame):** (1) aurora flip ~f373 (visual accent; SFX impact nailed to it);
  (2) outro wordmark stamp f827 (impact SFX on beat 57 = f828, stamp shifted +3f to match).
  Deal start is a strong accent, not a full-frame slam.
- **Holds:** brand lockup 46–76f (1 s, card hard rule); hero reseat hold to shot end;
  outro sign-off hold 930–1061 (endcard).

## Voiceover (KittenTTS expr-voice-3-m, male energetic)
| Line | Text | Dur | Placement (f) |
|---|---|---|---|
| L1 vo1.wav | "Meet Solstice One. The light that finally follows your day." | 4.63 s (139f) | 15–154 |
| L2 vo2.wav | "Your old light never changes. Solstice does. From dawn gold to midnight glow, automatically." | 7.33 s (220f) | 165–385 |
| L3 vo3.wav | "Three tricks in one lamp. A circadian auto-shift, one-tap scenes, and a sleep wind-down that fades like a sunset." | 8.18 s (245f) | 395–640 |
| L4 vo4.wav | "Just say the scene. Movie night. Done. The whole room changes in one tap." | 6.64 s (199f) | 650–849 |
| L5 vo5b.wav | "Solstice One. Light that follows your day. Available now, one twenty-nine." | 5.75 s (173f) | 860–1033 |

## Audio
- **BGM:** `public/audio/bgm-tech-house.mp3` (source trimmed 15.0388 s → 40 s, Mixkit Free License).
  Volume 0.32, ducked to 0.16 under VO lines (8f fades). Controlled by `bgm` inputProp.
- **SFX (synthesized, analysis/synth_sfx.py; peak lags in analysis/sfx-peaks.json):**
  from = targetPeakF − peakLagF − 1.28 (output-offset constant, to be verified by
  cross-correlation after first render).
  | Target (f) | Sound | Peak lag | From | Action |
  |---|---|---|---|---|
  | 12 | transition-soft | 6.9 | 4 | brand lockup lands |
  | 78 | whoosh-fast | 6.0 | 71 | brand → dashboard |
  | 130 | whoosh-big | 9.3 | 119 | hero card pops |
  | 142 | sparkle | 4.2 | 137 | beam lap 1 |
  | 212 | transition-snap | 0.0 | 211 | card reseats |
  | 220 | swoosh-quick | 2.7 | 216 | title card 1 |
  | 278 | transition-soft | 6.9 | 270 | aurora opens |
  | 373 | impact-cine | 0.6 | 371 | aurora flip |
  | 472 | whoosh-big | 9.3 | 461 | first card deals |
  | 500 | whoosh-fast | 6.0 | 493 | deal accelerates |
  | 556 | keyboard | — (start-aligned) | 555 | typing "movie night" (33f) |
  | 596 | whoosh-fast | 6.0 | 589 | grid filters |
  | 616 | click-camera | 0.0 | 615 | click on Movie Night |
  | 625 | transition-soft | 6.9 | 617 | detail opens |
  | 728 | swoosh-quick | 2.7 | 724 | title card 2 |
  | 827 | riser-cine | 45.6 (ends at target) | 780 | riser into outro stamp (48f) |
  | 827 | impact-cine | 0.6 | 825 | wordmark stamps |
  | 855 | sparkle | 4.2 | 850 | rule glint |
  | 932 | transition-soft | 6.9 | 924 | endcard fades in |

## Render plan
- Test render first (60f stills + 120f clip) to measure s/frame on this VM (SwiftShader).
  If full 1080p > ~40 min, move the render to GitHub Actions (repo imran866565-debug, Remotion
  render in Actions, download MP4). Two mixes from one timeline: `--props={"bgm":true}` (default)
  and `--props={"bgm":false}` (props-nobgm.json). Verify both with ffprobe; extract audio and
  re-run the beat grid to confirm cut error ≤3f.

## Render + QC record (2026-11-17, measured)
- Browser: Remotion's own Chromium download unreachable via egress proxy; renders used
  Playwright's bundled headless shell
  `~/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell`
  via `--browser-executable`. `/opt/meta-chromium/chrome` refuses to start in this sandbox.
- Test clip 121f (frames 0–120, full mix): 25.9s total, audio present throughout (RMS −19…−25 dBFS,
  peak −4.4 dBFS).
- Full mix: rendered 14:20:37–14:26:44 UTC (~6m07s), 1061f, 12,171,355 bytes, 35.413333s.
- No-music mix: re-rendered 14:33–14:40:40 UTC (~6m), 1061f, 12,173,362 bytes, 35.413333s.
  (First no-music render shipped with BGM because ThemedFilm dropped the `bgm` prop —
  it rendered `<AiflMain />` bare; fixed to pass `bgm` through, then re-rendered.)
- Stills QC: 13 keyframes in qc/keyframes/ (f40…f1000) — all checked visually. Two fixes
  from stills QC: (1) AuroraShot `lerp` call sites had arguments in the wrong order
  (blobs translated −186% off-screen; fixed, blobs now visible); (2) captions got a dark
  translucent lower-third pill so the line never collides with card text underneath.
- Audio QC (script /tmp/qc_audio.py, on rendered MP4s): mixes differ as designed —
  VO-gap windows 19–34 dB quieter in the no-music mix (BGM gone), VO-active windows
  within ~1 dB. SFX offset: impact-cine peak measured at frame 372.29 vs expected
  372.88 → error −0.59f (inside the ≤3f tolerance; assumed 1.28f output offset is
  close — real offset ≈0.7f). Beat grid on rendered full mix: 66 kick peaks,
  best t0 0.048s, 50/66 inliers within 30ms, median err 13.7ms; shot boundaries on
  integer beats (f436=30.0, f625=43.0, f785=54.0, f930=64.0).
- Independent final review: clean-context subagent (per skill stage 7), report pending.
