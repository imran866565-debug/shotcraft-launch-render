# 模板历史音频来源

此目录的音频是 Ink Press 已有成片的固定依赖，用于原样预览和回归验证。
新制作与换音按 `references/sfx-sourcing.md` 从 Freesound 获取。
下表保留旧授权记录；未能反查的素材不能据此认定已核验授权。

| 文件 | 来源 / 记录 |
|---|---|
| click-camera.mp3 | Mixkit SFX Free License · Camera shutter click · https://assets.mixkit.co/active_storage/sfx/1133/1133-preview.mp3 |
| transition-soft.mp3 | Mixkit SFX Free License · Air zoom vacuum · https://assets.mixkit.co/active_storage/sfx/2608/2608-preview.mp3 |
| transition-snap.mp3 | Mixkit SFX Free License · Fast transitions swoosh · https://assets.mixkit.co/active_storage/sfx/3115/3115-preview.mp3 |
| swoosh-quick.mp3 | Mixkit SFX Free License · Fast small sweep transition · https://assets.mixkit.co/active_storage/sfx/166/166-preview.mp3 |
| whoosh-fast.mp3 | Mixkit SFX Free License · Fast whoosh transition · https://assets.mixkit.co/active_storage/sfx/1490/1490-preview.mp3 |
| impact-cine.mp3 | Mixkit SFX Free License · Cinematic whoosh deep impact · https://assets.mixkit.co/active_storage/sfx/1143/1143-preview.mp3 |
| keyboard.mp3 | 旧记录标为 Mixkit；原始条目无法反查，发布前复核或换音 |
| riser-cine.mp3 | 旧记录标为 Mixkit；原始条目无法反查，发布前复核或换音 |
| sparkle.mp3 | 旧记录标为 Mixkit；原始条目无法反查，发布前复核或换音 |
| whoosh-big.mp3 | 旧记录标为 Mixkit；原始条目无法反查，发布前复核或换音 |
| pop.mp3 | 来源待考，发布前复核或换音 |

这些音效不受仓库代码的 Apache-2.0 许可覆盖。历史完整音效库记录可从 Git 历史查询。

---

# Solstice One launch film — audio actually used in this project

The template's historical audio above was NOT used. All SFX below were
synthesised for this film with numpy/scipy (deterministic, seed 12345, 48 kHz,
peak-normalised −3 dBFS) because Freesound returned HTTP 403 from this VM
(egress-proxy IP block) — see `analysis/synth_sfx.py`. Fully owned, no licence
needed. `pop.mp3` in this folder is a leftover template file and is not used.

| File | What it is |
|---|---|
| whoosh-big.mp3 / whoosh-fast.mp3 / swoosh-quick.mp3 | Synthesised whooshes (filtered noise + envelope) |
| transition-soft.mp3 / transition-snap.mp3 | Synthesised soft/snap transitions |
| impact-cine.mp3 | Synthesised cinematic impact (low sine thump + noise burst) |
| sparkle.mp3 | Synthesised high shimmer (sine-cluster arpeggio) |
| riser-cine.mp3 | Synthesised 1.6 s riser, peak at the end |
| keyboard.mp3 | Synthesised 9 key clicks for the typing shot |
| click-camera.mp3 | Synthesised short click for the card tap |
| bgm-tech-house.mp3 | BGM, Mixkit Free License (no attribution required), trimmed to the film window (source beat #30 onward, 40.02 s). Beat grid measured: 123.89 BPM, t0 0.5099 s, 92.4% match within 30 ms. |
| vo1.wav … vo5.wav | Voiceover, VoiceStudio KittenTTS preset `expr-voice-3-m`, male energetic. Script in `VOICEOVER_SCRIPT.md`. |
