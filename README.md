# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

**Hao Jiang, Edgar Choueiri**

3D Audio and Applied Acoustics (3D3A) Laboratory, Princeton University, Princeton, NJ, USA.

This repository contains the static paper demo, not the model implementation or
the formal listening-study response database. Unconfirmed paper links, abstract,
figure and citation remain explicit placeholders.

## Audio

Three continuous, beat-aligned MoisesDB passages each include a sum of the source
stems and sixteen cached SceneUpmix layout/style variants:

- Iain Kerr & Friends: **It Was Only Ever You** (blues instrumental passage,
  20.02 seconds; test split). Every stem is folded to mono as `(L+R)/2` before
  model inference and rendering. This is a recorded-music mono demonstration,
  not native mono stems or synthesized Slakh audio.
- Frank O Pinions: **Reluctant Auteur** (pop instrumental passage, 19.97 seconds;
  validation split). Native stereo stems; unchanged from the preceding demo.
- Frank O Pinions: **What Are The Odds** (pop instrumental passage, 18.02 seconds;
  validation split). Native stereo stems, replacing the earlier rock excerpt.

Instrumental describes these passages, not necessarily the full songs. Their
vocal-role waveforms, including renderer context, are exactly silent at native
44.1 kHz. No stems are removed or muted. The first passage has piano/keys, bass
and drums; the middle has guitar, drums/percussion and winds/brass; the third has
guitar, keys and drums. Dataset genres are retained rather than inventing three
distinct genre labels. These are curated demonstration excerpts, not a new
evaluation set or a measured musical-preference ranking.

The first and third passages were inferred with the unchanged step-17000 M/S
checkpoint, then rendered with the same SAF playback chain. The first original
has identical left and right channels; mono preparation also applies to the
objects used for inference and every spatial output. The second song, the
editor, the model, and formal study stimuli/results remain unchanged.

All published WAVs are 44.1 kHz, two-channel PCM24. Original and SceneUpmix each
have a labeled timeline and loop control. Only one player is active at a time;
switching within a passage preserves its playhead. The sixteen conditions per
song are pregenerated; the network does not run in the browser.

Music source: [MoisesDB](https://github.com/moises-ai/moises-db). Recorded excerpts,
mono fold-downs and spatial adaptations retain
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
Artists are credited above and on the page. Audio hashes and current input/model
provenance are recorded in `demo.json`, including `music_refresh`. The former
Slakh and Take You Away files are no longer referenced or published in this version.

## Real-time voice editor

The separate editor retains **Lifes Changes by FNDEF** (rap, 18.46 seconds;
MoisesDB validation split). A Three.js view allows dragging the voice while all
other objects remain fixed. An AudioWorklet uses the pinned SAF afSTFT core
compiled to WebAssembly and the same prepared KEMAR HRTFs. Azimuth/elevation
updates do not download another rendered passage; SAF's underlying lookup has
2-degree azimuth and 5-degree elevation resolution. Distance and gain are
continuous normalized controls in [0,1]; the display radius is not in metres.
Width and diffuseness stay predicted. Reset, voice-only and loop are provided.

The editor loads the excerpt's L/R voice, fixed accompaniment and HRTF
coefficients once. Eighteen source-derived routes preserve the existing
direct/early/late design, magnitude/ITD interpolation and diffuse-field EQ.
Processing is 44.1 kHz float32 with PCM24 FLAC accompaniment. Known source audio
permits compensation for the 1536-sample afSTFT delay; this is not live microphone
processing. No waveform crossfades, per-setting EQ, loudness matching or live
model inference are used. Hard changes and unfaded loop boundaries can click.

`realtime-editor.json` records active runtime hashes; `realtime/LICENSES.txt`
contains DSP notices. The old 159 grid FLACs and discrete-edit WAVs remain for
reproducibility but no longer drive the UI. Only the vocal excerpt with context
is published, not a full dry track, checkpoint or SOFA file. These editor assets
are byte-identical to the preceding published version.

## Binaural playback

Spatial outputs use the actual
[Spatial Audio Framework Binauraliser](https://github.com/leomccormack/Spatial_Audio_Framework),
revision `18fd5aba46e20787b51f28f7197a68506c965c07`, the framework used by
[SPARTA](https://leomccormack.github.io/sparta-site/). Linked L/R object emitters
and object-derived direct, early and late routes render directly to headphones,
without the earlier HOA2-to-11-speaker projection. MIT KEMAR normal-pinna HRTFs
use TRI_PS magnitude/ITD interpolation and fixed diffuse-field EQ. EQ is
HRTF-only, not fitted to a song or condition. The original has no HRTF or EQ.

HRTF attribution: Gardner and Martin (1995), "HRTF measurements of a KEMAR,"
JASA 97, 3907-3908. Early/late routes are not a physically diffuse room simulation
or an exact replacement for the previous SH spread. One common true-peak safety
scalar per passage prevents clipping without matching loudness between versions.
No claim of perceptually lossless rendering is made.

For the unchanged editor, six tested full-passage poses match native SAF with RMS
error 2.33e-9 to 7.25e-9 (relative waveform error -140 to -135 dB); random seeks
also match. These numerical checks are not subjective quality ratings. Prior
Chrome/WebKit desktop/mobile-viewport tests cover nonzero output, offline
dragging, gain/solo, seeking/looping and player exclusivity. Actual headphone
latency is not measured by UI-message tests. Current renderer provenance is in
`demo.json:renderer_update`; `music_refresh` identifies subsequent new-song
inference. The formal listening-study site and paper results are unchanged.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. HTML, scripts,
styles and audio are self-contained; no application server or login is required.
