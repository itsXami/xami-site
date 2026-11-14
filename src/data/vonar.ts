// Facts about the current Vonar release. Source: the Vonar repo (README.md, docs/releases/,
// CMakeLists.txt, presets/) and the release assets on GitHub. Re-check everything on a new release.

import presets from './vonar-presets.json';

const version = '1.0.0';

export const vonar = {
  version,
  repoUrl: 'https://github.com/itsXami/vonar',
  licenseUrl: 'https://github.com/itsXami/vonar/blob/main/LICENSE',
  contributingUrl: 'https://github.com/itsXami/vonar/blob/main/CONTRIBUTING.md',
  releaseUrl: `https://github.com/itsXami/vonar/releases/tag/v${version}`,
  installer: {
    fileName: `Vonar-${version}-Setup.exe`,
    url: `https://github.com/itsXami/vonar/releases/download/v${version}/Vonar-${version}-Setup.exe`,
    // sha256sum of the release asset, downloaded from the URL above on 2026-11-14.
    sha256: 'e580c3dc3b25b4be998d9c526e5ed6636b3540e4d068ba92381f9d6532e30802',
    // 4,551,918 bytes.
    sizeLabel: '4.6 MB',
  },
  platform: 'Windows 10/11',
  format: 'VST3',
  presetCount: presets.length,
  effectCount: 10,
  // Source/Params.h WarpModes: Sync, Bend, Squeeze, Mirror, Quantize, FM, RM (plus Off).
  warpModeCount: 7,
  macroCount: 4,
};

export type Preset = { name: string; category: string; mood: string };
export const vonarPresets: Preset[] = presets;
