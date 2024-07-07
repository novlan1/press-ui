const glob = require('glob');
const { readFileSync, writeFileSync } = require('t-comm');

const GLOB_FILE = 'packages/press-ui/src/pages/**/*.vue';
const MATCH_REG = /import\s+Press(\w+)\s+from\s+'press-ui\/.*/;

function replaceToVue3() {
  const list = glob.sync(GLOB_FILE);
  console.log('list', list);

  list.slice(0, 3).forEach((item) => {
    const content = readFileSync(item);
    const newContent = innerReplace(content);
    if (newContent) {
      console.log('newContent', newContent);
      writeFileSync(item, newContent);
    }
  });
}

function innerReplace(content) {
  const match = content.match(MATCH_REG);
  console.log('match', match);
  if (!match) return;
  return content.replace(MATCH_REG, (a, b) => `import { ${b} as Press${b} } from 'press-ui-vue3;'`);
}


function main() {
  replaceToVue3();
}

main();
