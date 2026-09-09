# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

**Hao Jiang, Edgar Choueiri**

3D Audio and Applied Acoustics (3D3A) Laboratory, Princeton University, Princeton, NJ, USA.

This repository contains the static paper demo, not the model implementation or the formal listening-study response database. Unconfirmed paper links, abstract, figure and citation remain explicit placeholders.

## Audio

Three continuous, beat-aligned MoisesDB passages each include a stereo sum of the source stems and sixteen cached SceneUpmix layout/style variants. All audio is 44.1 kHz stereo PCM16. The variants use the same frozen checkpoint and binaural rendering chain. Playback selects pregenerated audio; it does not run the network in the browser.

- Iain Kerr & Friends: **Dreaming 'Bout Being With You** (jazz, 18.48 seconds).
- Modified Freq: **Real** (electronic, 19.06 seconds).
- Modified Freq: **Sunspot** (rock, 22.57 seconds).

A separate editing example changes only the voice azimuth, depth or gain in the first passage. Nine edits are selectable: -90/-45/+45/+90 degrees, depth 0.1/0.5/0.9, and voice gain -6/-3 dB. The predicted direction is approximately 0 degrees, so its redundant center edit is hidden. Ten exported edits and a voice-only preview remain archived; they are not combined or generated live. Other objects and metadata are held fixed. Every version of a passage uses the same safety attenuation, without per-version loudness/tonal matching or switching crossfades.

Music source: [MoisesDB](https://github.com/moises-ai/moises-db).

The excerpts and rendered adaptations retain the dataset's [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
