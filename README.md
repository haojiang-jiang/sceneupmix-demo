# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

**Hao Jiang, Edgar Choueiri**

3D Audio and Applied Acoustics (3D3A) Laboratory, Princeton University, Princeton, NJ, USA.

This repository contains the static paper demo, not the model implementation or the formal listening-study response database. Unconfirmed paper links, abstract, figure and citation remain explicit placeholders.

## Audio

Three continuous, beat-aligned passages each include a sum of the source stems and sixteen cached SceneUpmix layout/style variants. Slakh supplies native mono stems, while MoisesDB supplies stereo stems. All published files are 44.1 kHz two-channel PCM24; the Slakh original has identical left and right samples. The variants retain the frozen step-17000 checkpoint metadata and use the SAF direct binaural playback renderer described below. Playback selects pregenerated audio; it does not run the network in the browser.

- Slakh2100 / Manilow et al.: **Slakh Track01501** (synthesized instrumental, 20.27 seconds; Slakh validation split).
- Frank O Pinions: **Reluctant Auteur** (pop instrumental passage, 19.97 seconds; MoisesDB validation split).
- Modified Freq: **Take You Away** (rock, 20.25 seconds; MoisesDB test split).

A separate editing example retains **Lifes Changes by FNDEF** (rap, 18.46 seconds; MoisesDB validation split), with the same passage and metadata as the previous publication, re-rendered through SAF. It changes only the voice azimuth, distance or gain. Ten edits are selectable: -90/-45/+45/+90 degrees, normalized distance 0.1/0.5/0.9, and linear voice gain 0.1/0.5/1.0. Gain is an absolute metadata value, not an offset or multiplier of the predicted gain; 1.0 is unity gain. There is no redundant 0-degree edit; the predicted scene is the reset state. The ten edits and a voice-only preview are exported offline, not combined or generated live. Other objects and metadata are held fixed. Every version of a passage uses the same safety attenuation, without per-version loudness/tonal matching or switching crossfades.

The first passage has ten native mono stems and seven active musical roles; no vocal or rendered choir/voice preset is present. It was chosen by role-energy coverage and beat-group duration, without model/reference scores. The editing passage has vocal energy throughout the selected interval. The middle passage is naturally vocal-silent and includes guitar, drums/percussion and winds/brass: three active roles and five active stems. Its vocal-role waveform, including rendering context, was verified to be exactly zero at native sample rate; no vocal track was muted or removed. For Reluctant Auteur, "instrumental" describes this selected passage, not the full song. These are signal-based curation checks, not proof of perceptual superiority. This demonstration is separate from the formal listening experiment.

Music sources: [Slakh2100](https://github.com/ethman/slakh-generation#license-and-attribution), Manilow, Wichern, Seetharaman and Le Roux, "Cutting Music Source Separation Some Slakh," WASPAA 2019; and [MoisesDB](https://github.com/moises-ai/moises-db).

Slakh excerpts and rendered adaptations retain [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); MoisesDB excerpts and adaptations retain [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Binaural playback protocol

Spatial outputs use the actual [Spatial Audio Framework Binauraliser](https://github.com/leomccormack/Spatial_Audio_Framework), revision `18fd5aba46e20787b51f28f7197a68506c965c07`. SAF is the framework used by [SPARTA](https://leomccormack.github.io/sparta-site/). Linked left/right object emitters and object-derived direct, early and late routes are rendered directly to headphones, without the former HOA2-to-11-speaker projection. The same MIT KEMAR normal-pinna HRTFs use TRI_PS magnitude/ITD interpolation and fixed diffuse-field equalization. The EQ is HRTF-only and is not fitted to a song or condition. The original mix has no HRTF filtering or EQ.

HRTF attribution: Gardner and Martin (1995), "HRTF measurements of a KEMAR," JASA 97, 3907-3908. Early/late directional routes are not a physically diffuse room simulation or an exact replacement for the previous SH spread. These examples do not establish perceptually lossless rendering.

All 63 public WAVs were imported byte-for-byte from the validated export, with content-addressed filenames and one common peak-safety scalar per passage. Metadata, input passages and controls are unchanged; no model inference or training was repeated. The formal listening-study stimuli, responses and paper evaluation results are unchanged and use their original protocol. Current playback provenance is in `demo.json:renderer_update`; older export/source hashes and explicitly labeled previous-renderer diagnostics remain historical.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
