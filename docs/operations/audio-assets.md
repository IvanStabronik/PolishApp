# Assessed listening audio assets

**Honesty:** edge-tts Neural Polish is an **interim** stand-in for studio voiceover. Still DRAFT; not JPJO; not “reference quality” listening.

## Layout

Static files live in `web/public/audio/a1/` and are referenced from lesson YAML as same-origin paths:

```yaml
audio_text_pl: Dużą czy małą?   # retained for authoring / TTS fallback
audio_url: /audio/a1/EX-A1-WK-LIS-01.mp3
```

When `audio_url` is set, `GET /api/learning/listening-stimulus` returns `{ audioUrl, playToken }` **without** `textPl`.

## Generate (Windows / PowerShell)

```powershell
pip install edge-tts
cd D:\MyProjects\PolishApp
New-Item -ItemType Directory -Force -Path web\public\audio\a1 | Out-Null

# Example — Pierwsze spotkanie L01
edge-tts --voice pl-PL-MarekNeural `
  --text "Nazywam się Marek Nowak. A pani?" `
  --write-media web\public\audio\a1\EX-A1-PS-LIS-01.mp3
```

Polish voices: `pl-PL-MarekNeural` (male), `pl-PL-ZofiaNeural` (female).

## Current inventory (2026-09-10)

| File | Lesson | Text |
| --- | --- | --- |
| `EX-A1-PS-LIS-01.mp3` | Pierwsze spotkanie L01 | Nazywam się Marek Nowak. A pani? |
| `EX-A1-PS-L2-LIS-01.mp3` | Pierwsze spotkanie L02 | Jak ma pan na imię? |
| `EX-A1-PS-L3-LIS-01.mp3` | Pierwsze spotkanie L03 | Dziękuję za rozmowę. Do widzenia. |
| `EX-A1-WK-LIS-01.mp3` | W kawiarni L01 | Dużą czy małą? |
| `EX-A1-WK-L2-LIS-01.mp3` | W kawiarni L02 | Z mlekiem czy bez mleka? |
| `EX-A1-WK-L3-LIS-01.mp3` | W kawiarni L03 | Kanapka z serem czy z szynką? |

After YAML edits: `pnpm content:validate` from repo root. Bump lesson + listening exercise versions; keep `status: DRAFT`.
