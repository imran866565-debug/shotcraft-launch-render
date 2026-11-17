# Solstice One — product launch video

A 35.4-second launch film for **Solstice One**, a fictional smart circadian
light ("Light that follows your day", $129). The product, its dashboard UI,
and every frame are invented from scratch — no real brand, no real trademarks,
no images of living beings.

## The two mixes (same visuals, same timeline)

- **`product-launch-full-mix.mp4`** — background music + SFX + male energetic voiceover. 12,171,355 bytes, 35.41 s.
- **`product-launch-no-music.mp4`** — same voiceover + SFX, **no background music**. 12,173,362 bytes, 35.41 s.

Both are 1920×1080, 30 fps, 1061 frames (35.37 s), H.264 + AAC.

## Film structure (beat-synced, 123.89 BPM)

| Frames | Shot | What happens |
|---|---|---|
| 0–218 | Brand + hero | Letterpress "Solstice One" → spotlight locks the hero card, beam laps, card reseats |
| 218–276 | Title card 1 | "Your light never changes. *Your* day does." |
| 276–436 | Aurora flip | Amber blobs rise on light grey → flip to dark (~f373) → "Until now." |
| 436–625 | Table | 26 scene cards deal → type "movie night" → filter → click the card |
| 625–726 | Detail | Movie Night detail rows fly in |
| 726–785 | Title card 2 | "One light. *Every* moment." |
| 785–930 | Outro | 9 UI elements fly in, wordmark stamps on beat 57 |
| 930–1061 | End card | Static brand lockup + "$129 · AVAILABLE NOW" hold |

## Shot cards used (video-shotcraft skill)

`brand-ink-open`, `spotlight-hero-card`, `paper-title-card`,
`aurora-bloom-bg-flip` (flip window 0.57→0.64 kept at ~0.36 s),
`deck-deal-flyin`, `type-and-filter`, `outro-group-photo-launch` —
all verified against the skill's `gallery/api/library.json`, with each card's
demo TSX read in full. The aurora shot was re-implemented in plain Remotion
from the card's parameters (no demo fixtures).

## Audio

- **Voiceover:** VoiceStudio (local) KittenTTS preset `expr-voice-3-m`,
  male energetic. Script: `VOICEOVER_SCRIPT.md` (5 lines, 4.6–8.2 s each).
- **BGM:** Mixkit Free License tech-house track, trimmed to the film window;
  beat grid measured from the track (123.89 BPM, 92.4% match within 30 ms).
  Ducked to half volume under voiceover lines.
- **SFX:** all 10 effects synthesised with numpy/scipy (deterministic,
  seed 12345) because Freesound returned HTTP 403 from this VM — see
  `analysis/synth_sfx.py` and `public/audio/ATTRIBUTION.md`. Peak lags
  measured per file; SFX are pinned to animation beats with the
  peak-lag + 1.28-frame output-offset compensation from the skill's
  sound-design rules.
- The two mixes come from one timeline via the `bgm` input prop
  (`--props='{"bgm":true}'` / `'{"bgm":false}'`).

## Render path

Rendered locally on this VM with Remotion 4.0.484 + Playwright's bundled
Chromium headless shell (Remotion's own Chromium download is unreachable
through the egress proxy). Test clip: 121 frames in ~26 s (~0.21 s/frame);
full 1061-frame renders ≈ 4 minutes each. No GPU, SwiftShader only.
No GitHub Actions needed.

## Files

- `src/` — Remotion project (Main.tsx timeline, live scenes, AuroraShot, EndCard)
- `public/textures/live/` — dashboard/detail mockup textures (captured from
  `mockups/dashboard.html` etc. with Playwright)
- `public/audio/` — BGM, synthesised SFX, voiceover wavs
- `analysis/` — beat analysis, SFX synthesis + peak measurement
- `DESIGN_SPEC.md` — full design record (brief, tokens, storyboard, beat grid,
  VO placement, SFX table, render plan)
- `VOICEOVER_SCRIPT.md` — the voiceover script with timings
