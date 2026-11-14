// Checks internal links in the built site (no dependencies).
// Usage: node scripts/check-links.mjs dist
//
// Scans every .html and .css file in the build output for local references
// (href, src, srcset, url(...)) and fails if any target file is missing.
// External links (http:, https:, mailto:, etc.) are skipped — those are
// checked manually before publishing (CLAUDE.md, checklist item 16).

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'dist');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function exists(p) {
  try {
    return await stat(p);
  } catch {
    return null;
  }
}

// Resolve a URL path to a file in the build output, like a static host would.
async function resolveTarget(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const base = path.join(root, decoded);
  if (!base.startsWith(root)) return null;
  const candidates = decoded.endsWith('/')
    ? [path.join(base, 'index.html')]
    : [base, `${base}.html`, path.join(base, 'index.html')];
  for (const c of candidates) {
    const s = await exists(c);
    if (s?.isFile()) return c;
  }
  return null;
}

function extractRefs(content, ext) {
  const refs = [];
  if (ext === '.html') {
    for (const m of content.matchAll(/\s(?:href|src)\s*=\s*["']([^"']*)["']/gi)) refs.push(m[1]);
    for (const m of content.matchAll(/\ssrcset\s*=\s*["']([^"']*)["']/gi)) {
      for (const part of m[1].split(',')) refs.push(part.trim().split(/\s+/)[0]);
    }
  }
  for (const m of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) refs.push(m[1]);
  return refs.filter(Boolean);
}

function isExternal(ref) {
  return /^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith('//');
}

const rootStat = await exists(root);
if (!rootStat?.isDirectory()) {
  console.error(`Build output not found: ${root} (run "npm run build" first)`);
  process.exit(1);
}

const files = (await walk(root)).filter((f) => /\.(html|css)$/.test(f));
const broken = [];
let checked = 0;

for (const file of files) {
  const ext = path.extname(file);
  const content = await readFile(file, 'utf8');
  for (const ref of extractRefs(content, ext)) {
    if (isExternal(ref) || ref.startsWith('#')) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    // Absolute paths resolve from the site root; relative ones from the file's folder.
    const urlPath = clean.startsWith('/')
      ? clean
      : '/' + path.posix.join(path.relative(root, path.dirname(file)).split(path.sep).join('/'), clean);
    checked++;
    if (!(await resolveTarget(urlPath))) {
      broken.push(`${path.relative(root, file)} -> ${ref}`);
    }
  }
}

if (broken.length) {
  console.error(`Broken internal links (${broken.length}):`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}

console.log(`Internal links OK: ${checked} references in ${files.length} files.`);
