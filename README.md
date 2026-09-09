# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

**Hao Jiang, Edgar Choueiri**

3D Audio and Applied Acoustics (3D3A) Laboratory, Princeton University, Princeton, NJ, USA.

This repository contains the static paper demo, not the model implementation or the formal listening-study response database. Unconfirmed paper links, abstract, figure and citation remain explicit placeholders.

## Audio

Three continuous, beat-aligned MoisesDB passages each include a stereo sum of the source stems and sixteen cached SceneUpmix layout/style variants. All audio is 44.1 kHz stereo PCM16. The variants use the same frozen checkpoint and binaural rendering chain. Playback selects pregenerated audio; it does not run the network in the browser.

- FNDEF: **Lifes Changes** (rap, 18.46 seconds; MoisesDB validation split).
- FNDEF: **You're The One** (pop, 18.27 seconds; MoisesDB validation split).
- Modified Freq: **Take You Away** (rock, 20.25 seconds; MoisesDB test split).

A separate editing example changes only the voice azimuth, distance or gain in the first passage. Ten edits are selectable: -90/-45/+45/+90 degrees, normalized distance 0.1/0.5/0.9, and linear voice gain 0.1/0.5/1.0. Gain is an absolute metadata value, not an offset or multiplier of the predicted gain; 1.0 is unity gain. There is no redundant 0-degree edit; the predicted scene is the reset state. The ten edits and a voice-only preview are exported offline, not combined or generated live. Other objects and metadata are held fixed. Every version of a passage uses the same safety attenuation, without per-version loudness/tonal matching or switching crossfades.

These replacement passages were curated for sustained vocal activity, richer active instrumentation and distinct dataset genre tags. The editing passage has vocal energy throughout the selected interval; the pop passage has six active role groups and nine active stems. These are signal-based curation checks, not proof of perceptual superiority. This demonstration is separate from the formal listening experiment.

Music source: [MoisesDB](https://github.com/moises-ai/moises-db).

The excerpts and rendered adaptations retain the dataset's [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
