# SceneUpmix

Editable 3D Object-Based Scene Authoring for Music Upmixing.

Public audio demo: https://haojiang-jiang.github.io/sceneupmix-demo/

This repository contains the static paper demo, not the model implementation or the formal listening-study response database. Paper details remain explicit placeholders until finalized.

## Audio

Three 8-second MoisesDB excerpts each include a stereo sum of the source stems and sixteen cached SceneUpmix layout/style variants. The variants use the same checkpoint and binaural rendering chain. Playback selects pregenerated audio; it does not run the network in the browser.

- The Unfortunates: **Beserker** (rock).
- Iain Kerr & Friends: **It Was Only Ever You** (blues).
- Iain Kerr & Friends: **Dreaming 'Bout Being With You** (jazz).

Music source: [MoisesDB](https://github.com/moises-ai/moises-db).

The excerpts and rendered adaptations retain the dataset's [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. These curated examples are not a representative performance estimate. Audio hashes and rendering provenance are recorded in `demo.json`.

## Hosting

GitHub Pages serves the `main` branch root with `.nojekyll`. The HTML, scripts, styles, and audio are self-contained; no application server or participant login is required.
