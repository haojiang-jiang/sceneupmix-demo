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

A separate editing example retains **Lifes Changes by FNDEF** (rap, 18.46 seconds; MoisesDB validation split). A Three.js view allows dragging the voice while all other objects remain fixed. The voice now renders in real time in an AudioWorklet, using the pinned SAF afSTFT core compiled to WebAssembly and the same prepared KEMAR HRTFs. Azimuth and elevation update without downloading another rendered passage; SAF's underlying VBAP lookup resolution is 2 and 5 degrees respectively. Distance and gain are continuous normalized controls in [0,1]; display radius is not a metric distance. Width and diffuseness stay at their predicted values. The predicted scene is the reset state, and voice-only and loop controls are provided.

The editor loads the excerpt's L/R voice, fixed accompaniment and HRTF coefficients once. Eighteen source-derived routes preserve the existing direct/early/late design, magnitude/ITD interpolation and diffuse-field EQ. Audio processing runs at 44.1 kHz in float32, with PCM24 FLAC accompaniment. Known source audio permits compensation for the 1536-sample afSTFT delay; this is not live microphone processing. No waveform crossfades, per-setting EQ, loudness matching or live model inference are used. Hard parameter changes and un-faded loop boundaries can click. `realtime-editor.json` records current runtime asset hashes; `realtime/LICENSES.txt` contains DSP notices. The old 159 grid FLACs and discrete-edit WAVs remain for reproducibility but no longer drive the UI. Only the authorized vocal excerpt with surrounding context is published, not a full dry track, checkpoint or SOFA file.

Original and SceneUpmix each have their own labeled timeline and loop control. Only one player is active at a time; switching within a passage preserves its playhead.

The first passage has ten native mono stems and seven active musical roles; no vocal or rendered choir/voice preset is present. It was chosen by role-energy coverage and beat-group duration, without model/reference scores. The editing passage has vocal energy throughout the selected interval. The middle passage is naturally vocal-silent and includes guitar, drums/percussion and winds/brass: three active roles and five active stems. Its vocal-role waveform, including rendering context, was verified to be exactly zero at native sample rate; no vocal track was muted or removed. For Reluctant Auteur, "instrumental" describes this selected passage, not the full song. These are signal-based curation checks, not proof of perceptual superiority. This demonstration is separate from the formal listening experiment.

Music sources: [Slakh2100](https://github.com/ethman/slakh-generation#license-and-attribution), Manilow, Wichern, Seetharaman and Le Roux, "Cutting Music Source Separation Some Slakh," WASPAA 2019; and [MoisesDB](https://github.com/moises-ai/moises-db).

Slakh excerpts and rendered adaptations retain [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); MoisesDB excerpts and adaptations retain [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Binaural playback protocol

Spatial outputs use the actual [Spatial Audio Framework Binauraliser](https://github.com/leomccormack/Spatial_Audio_Framework), revision `18fd5aba46e20787b51f28f7197a68506c965c07`. SAF is the framework used by [SPARTA](https://leomccormack.github.io/sparta-site/). Linked left/right object emitters and object-derived direct, early and late routes are rendered directly to headphones, without the former HOA2-to-11-speaker projection. The same MIT KEMAR normal-pinna HRTFs use TRI_PS magnitude/ITD interpolation and fixed diffuse-field equalization. The EQ is HRTF-only and is not fitted to a song or condition. The original mix has no HRTF filtering or EQ.

HRTF attribution: Gardner and Martin (1995), "HRTF measurements of a KEMAR," JASA 97, 3907-3908. Early/late directional routes are not a physically diffuse room simulation or an exact replacement for the previous SH spread. These examples do not establish perceptually lossless rendering.

All 63 public WAVs and the main demo catalog remain byte-identical, with content-addressed filenames and one common peak-safety scalar per passage. Across six tested full-passage poses, the real-time editor matches independent native SAF renders with RMS errors from 2.33e-9 to 7.25e-9 (relative waveform error -140 to -135 dB); random seeks also match. These sampled numerical checks are not a claim of perceptually lossless rendering. Browser validation covers Chrome/WebKit, desktop/mobile viewports, audible signal output, offline dragging, gain/solo, seeking/looping, and exclusive switching between editor and main examples. Actual device/headphone latency is not measured by the UI-message tests. No model inference or training was repeated. The formal listening-study stimuli, responses and paper evaluation results are unchanged. Current provenance is in `demo.json:renderer_update` and `realtime-editor.json`; `editor.json` and earlier diagnostics are historical.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
