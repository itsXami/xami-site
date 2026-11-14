// Regenerates src/data/vonar-presets.json from a checkout of the Vonar repo (no dependencies).
// Usage: node scripts/sync-vonar-presets.mjs ../vonar
//
// Preset names, categories and moods must come from Vonar's preset JSON files, never typed by hand
// (CLAUDE.md, "Treści — zasady").

import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repo = process.argv[2];
if (!repo) {
  console.error('Usage: node scripts/sync-vonar-presets.mjs <path to Vonar repo>');
  process.exit(1);
}

const dir = path.join(repo, 'presets');
const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort();
const presets = [];
for (const f of files) {
  const p = JSON.parse(await readFile(path.join(dir, f), 'utf8'));
  if (p.name === 'Init') continue; // the neutral starting patch, not part of the 327-sound library
  presets.push({ name: p.name, category: p.category, mood: p.mood });
}

const out = path.resolve('src/data/vonar-presets.json');
await writeFile(out, JSON.stringify(presets, null, 2) + '\n');
console.log(`Wrote ${presets.length} presets to ${path.relative(process.cwd(), out)}`);
