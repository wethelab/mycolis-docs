#!/usr/bin/env node
// Checks the writing rules of CONTRIBUTING.md that a build cannot see.
// Exits with code 1 and lists every offending line when a rule is broken.
//
// Rules:
// - no em dash or en dash anywhere in the site sources;
// - in pages: no emoji, no exclamation mark, no forbidden wording
//   (promotional or minimising words, "officiel", internal app names);
// - every image a page or a component references exists under static/.

import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

function walk(dir, extensions) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files.push(...walk(path, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      files.push(path);
    }
  }
  return files;
}

// Docs pages, plus the standalone Markdown pages of src/pages (legal pages),
// which follow the same writing rules.
const pages = [
  ...walk(join(root, 'docs'), ['.md', '.mdx', '.json']),
  ...walk(join(root, 'src', 'pages'), ['.md', '.mdx']),
];
const sources = [
  ...pages,
  ...walk(join(root, 'src'), ['.tsx', '.ts', '.css']),
  ...walk(join(root, 'i18n'), ['.json', '.md', '.mdx']),
  join(root, 'docusaurus.config.ts'),
];

const problems = [];

function report(file, lineIndex, rule, line) {
  problems.push(
    `${relative(root, file)}:${lineIndex + 1}  ${rule}\n    ${line.trim()}`,
  );
}

// Each rule: [message, test(line) => boolean].
const everywhere = [
  ['tiret cadratin ou demi-cadratin', (line) => /[\u2014\u2013]/.test(line)],
];

// Whole words, with Unicode letter boundaries: \b ignores accented letters.
const word = (pattern) => new RegExp(`(?<!\\p{L})${pattern}(?!\\p{L})`, 'iu');

// Optional local list of extra forbidden words, kept out of the repository:
// .check-docs.local.json, a JSON array of plain words, ignored by git.
const localWordsFile = join(root, '.check-docs.local.json');
const localWords = existsSync(localWordsFile)
  ? JSON.parse(readFileSync(localWordsFile, 'utf8'))
  : [];
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const forbiddenWords = [
  word('officiel(?:le)?s?'),
  ...localWords.map((localWord) => word(escape(String(localWord)))),
  word('simplement'),
  word('facilement'),
  word('il suffit'),
  word('en quelques clics'),
  word('puissante?s?'),
  word('bien sûr'),
  word('évidemment'),
  // Only what exists is documented: no announcement of future features.
  word('bientôt'),
  word('prochainement'),
  word('à venir'),
];

const inPages = [
  ['emoji', (line) => /\p{Extended_Pictographic}/u.test(line)],
  // An exclamation mark, outside the markdown image syntax and HTML comments.
  ['point d\'exclamation', (line) => /!(?!\[)/.test(line.replace(/<!--.*?-->/g, ''))],
  [
    'formulation interdite (voir CONTRIBUTING.md)',
    (line) => forbiddenWords.some((word) => word.test(line)),
  ],
];

for (const file of sources) {
  const isPage = pages.includes(file);
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const [rule, test] of everywhere) {
      if (test(line)) report(file, index, rule, line);
    }
    if (!isPage) return;
    for (const [rule, test] of inPages) {
      if (test(line)) report(file, index, rule, line);
    }
  });
}

// Images: site absolute /img/... paths in pages, components and the config.
const imagePattern = /["'(]\/?(img\/[^"')\s]+)/g;
for (const file of sources) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const match of line.matchAll(imagePattern)) {
      if (!existsSync(join(root, 'static', match[1]))) {
        report(file, index, `image absente de static/ : ${match[1]}`, line);
      }
    }
  });
}

if (problems.length > 0) {
  console.error(`${problems.length} problème(s) :\n`);
  console.error(problems.join('\n\n'));
  process.exit(1);
}

console.log(`Contrôle réussi : ${sources.length} fichiers vérifiés.`);
