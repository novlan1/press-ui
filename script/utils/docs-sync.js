const { readFileSync, writeFileSync } = require('t-comm');

const CONTRIBUTING_CONFIG = {
  from: './CONTRIBUTING.md',
  to: './docs/contributing.md',
  replaceReg: /\n\s*\[TOC\]\s*\n/,
  replaceTarget: '\n\n',
};

const README_CONFIG = {
  from: './README.md',
  to: './docs/README.md',
  replaceReg: /\n\[查看文档\][^\n]+\n/,
  replaceTarget: '\n',
  replaceContributing: /CONTRIBUTING\.md/,
  replaceContributingTarget: 'contributing.md',
};


function syncContributing() {
  const contributing = readFileSync(CONTRIBUTING_CONFIG.from);
  const newContent = contributing.replace(CONTRIBUTING_CONFIG.replaceReg, CONTRIBUTING_CONFIG.replaceTarget);
  writeFileSync(CONTRIBUTING_CONFIG.to, newContent);
}

function syncReadMe() {
  const docs = readFileSync(README_CONFIG.from);
  console.log('docs', docs);
  let newContent = docs.replace(README_CONFIG.replaceReg, README_CONFIG.replaceTarget);
  newContent = newContent.replace(README_CONFIG.replaceContributing, README_CONFIG.replaceContributingTarget);
  writeFileSync(README_CONFIG.to, newContent);
}


function main() {
  syncContributing();
  syncReadMe();
}

main();
