const fs = require('fs');

const { replaceAllPolyfill } = require('t-comm');
const ACT_PATH = './src/packages/press-act-select-award/css';
const TOP_CLASS = '.press__cover';

replaceAllPolyfill();

function main() {
  const dir = fs.readdirSync(ACT_PATH, {
    encoding: 'utf-8',
  });
  console.log('[dir]', dir);

  dir.forEach((item) => {
    replaceScss(`${ACT_PATH}/${item}`);
  });
}

function replaceScss(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  // if (!content.includes('.tip')) return;

  const newContent = content
    .replace('.press', '.press-act:not(.press-act--hidden-tip) {\n.press')
    .replace(/$/, '\n}')
    .replaceAll(TOP_CLASS, `&${TOP_CLASS}`);

  fs.writeFileSync(filePath, newContent, {
    encoding: 'utf-8',
  });
}


main();
