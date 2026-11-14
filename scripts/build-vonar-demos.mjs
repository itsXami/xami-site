// Makes the website's demo MP3s and src/data/vonar-demos.json (no npm dependencies; needs ffmpeg).
// Usage: node scripts/build-vonar-demos.mjs <VOLT_Render output dir>
//
// 1. In a Vonar build, render previews of the chosen presets:
//      VOLT_Render --out <dir>/<name> --preset "<name>"   (one run per preset in vonar-demo-picks.json)
//    The renderer writes <dir>/<name>/previews/NNN_Preset_Name.flac.
// 2. This script finds each FLAC, encodes it to MP3 128 kb/s at the renderer's level (no gain change, no
//    metadata), saves it to public/audio/vonar/, and writes the data file the page reads.
// Names come from src/data/vonar-demo-picks.json (the user's choice); categories from vonar-presets.json
// (generated from Vonar's preset JSON) — never typed by hand.

import { execFileSync } from 'node:child_process';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const renderDir = process.argv[2];
if (!renderDir) {
  console.error('Usage: node scripts/build-vonar-demos.mjs <VOLT_Render output dir>');
  process.exit(1);
}

const picks = JSON.parse(await readFile('src/data/vonar-demo-picks.json', 'utf8'));
const presets = JSON.parse(await readFile('src/data/vonar-presets.json', 'utf8'));
const byName = new Map(presets.map((p) => [p.name, p]));

async function findFlacs(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await findFlacs(full)));
    else if (e.name.endsWith('.flac')) out.push(full);
  }
  return out;
}
const flacs = await findFlacs(renderDir);

const audioDir = 'public/audio/vonar';
await mkdir(audioDir, { recursive: true });
const demos = [];
for (const name of picks) {
  const preset = byName.get(name);
  if (!preset) throw new Error(`Not a Vonar preset: ${name}`);
  const stem = name.replace(/ /g, '_');
  const flac = flacs.find((f) => path.basename(f).replace(/^\d+_/, '') === `${stem}.flac`);
  if (!flac) throw new Error(`No rendered preview for ${name} in ${renderDir}`);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const mp3 = path.join(audioDir, `${slug}.mp3`);
  execFileSync('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y', '-i', flac, '-map_metadata', '-1',
    '-c:a', 'libmp3lame', '-b:a', '128k', mp3]);
  demos.push({ name: preset.name, category: preset.category, src: `/audio/vonar/${slug}.mp3` });
}

await writeFile('src/data/vonar-demos.json', JSON.stringify(demos, null, 2) + '\n');
console.log(`Wrote ${demos.length} demos to src/data/vonar-demos.json and ${audioDir}/`);
