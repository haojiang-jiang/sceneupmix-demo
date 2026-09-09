# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

**Hao Jiang, Edgar Choueiri**

3D Audio and Applied Acoustics (3D3A) Laboratory, Princeton University, Princeton, NJ, USA.

This repository contains the static paper demo, not the model implementation or the formal listening-study response database. Unconfirmed paper links, abstract, figure and citation remain explicit placeholders.

## Audio

Three continuous, beat-aligned passages each include a sum of the source stems and sixteen cached SceneUpmix layout/style variants. Slakh supplies native mono stems, while MoisesDB supplies stereo stems. All published files are 44.1 kHz two-channel PCM16; the Slakh original has identical left and right samples. The variants use the same frozen checkpoint and binaural rendering chain. Playback selects pregenerated audio; it does not run the network in the browser.

- Slakh2100 / Manilow et al.: **Slakh Track01501** (synthesized instrumental, 20.27 seconds; Slakh validation split).
- Frank O Pinions: **Reluctant Auteur** (pop instrumental passage, 19.97 seconds; MoisesDB validation split).
- Modified Freq: **Take You Away** (rock, 20.25 seconds; MoisesDB test split).

A separate editing example retains **Lifes Changes by FNDEF** (rap, 18.46 seconds; MoisesDB validation split), unchanged from the previous publication. It changes only the voice azimuth, distance or gain. Ten edits are selectable: -90/-45/+45/+90 degrees, normalized distance 0.1/0.5/0.9, and linear voice gain 0.1/0.5/1.0. Gain is an absolute metadata value, not an offset or multiplier of the predicted gain; 1.0 is unity gain. There is no redundant 0-degree edit; the predicted scene is the reset state. The ten edits and a voice-only preview are exported offline, not combined or generated live. Other objects and metadata are held fixed. Every version of a passage uses the same safety attenuation, without per-version loudness/tonal matching or switching crossfades.

The first passage has ten native mono stems and seven active musical roles; no vocal or rendered choir/voice preset is present. It was chosen by role-energy coverage and beat-group duration, without model/reference scores. The editing passage has vocal energy throughout the selected interval. The middle passage is naturally vocal-silent and includes guitar, drums/percussion and winds/brass: three active roles and five active stems. Its vocal-role waveform, including rendering context, was verified to be exactly zero at native sample rate; no vocal track was muted or removed. For Reluctant Auteur, "instrumental" describes this selected passage, not the full song. These are signal-based curation checks, not proof of perceptual superiority. This demonstration is separate from the formal listening experiment.

Music sources: [Slakh2100](https://github.com/ethman/slakh-generation#license-and-attribution), Manilow, Wichern, Seetharaman and Le Roux, "Cutting Music Source Separation Some Slakh," WASPAA 2019; and [MoisesDB](https://github.com/moises-ai/moises-db).

Slakh excerpts and rendered adaptations retain [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); MoisesDB excerpts and adaptations retain [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
