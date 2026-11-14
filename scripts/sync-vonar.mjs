// Copies facts from a checkout of the Vonar repo into the site (no dependencies).
// Usage: node scripts/sync-vonar.mjs ../vonar
//
// - src/data/vonar-presets.json   name, category, mood of every factory preset (from presets/*.json)
// - src/content/vonar-releases/   release notes (from docs/releases/*.md), shown on /vonar/changelog/
//
// Preset names, categories and release notes must come from the Vonar repo, never typed by hand
// (CLAUDE.md, "Treści — zasady").

import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repo = process.argv[2];
if (!repo) {
  console.error('Usage: node scripts/sync-vonar.mjs <path to Vonar repo>');
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
await writeFile('src/data/vonar-presets.json', JSON.stringify(presets, null, 2) + '\n');
console.log(`Wrote ${presets.length} presets to src/data/vonar-presets.json`);

const relSrc = path.join(repo, 'docs', 'releases');
const relDst = 'src/content/vonar-releases';
await mkdir(relDst, { recursive: true });
const notes = (await readdir(relSrc)).filter((f) => /^v\d+\.\d+\.\d+\.md$/.test(f));
for (const f of notes) await copyFile(path.join(relSrc, f), path.join(relDst, f));
console.log(`Copied ${notes.length} release notes to ${relDst}/`);
