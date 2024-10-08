const { getStyleList } = require('@plugin-light/shared');

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const TARGET_GLOB = 'src/packages/press-act-*/css';
const TARGET_FILE = 'demo-helper/style-list.ts';

function getStyleListStr(list) {
  const listStr = list.map(item => `'${item}',`).join('\n  ');
  return `// Auto Generated By Script. Do not Change it.
export const STYLE_LIST = [
  ${listStr}
];
`;
}

function injectContent(content, file) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(file, content, {
    encoding: 'utf-8',
  });
}

function genStyleList() {
  const list = glob.sync(TARGET_GLOB);
  console.log('list', list);
  list.forEach((dir) => {
    const styleList = getStyleList(dir);
    console.log('styleList', styleList);
    const content = getStyleListStr(styleList);
    const target = path.join(dir, '..', TARGET_FILE);
    injectContent(content, target);
  });
}

function main() {
  genStyleList();
}

main();
