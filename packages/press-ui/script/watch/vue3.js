const glob = require('glob');
const { readFileSync, writeFileSync } = require('t-comm');

const GLOB_FILE = 'src/pages/**/*.vue';
const MATCH_REG = /import\s+(\w+)\s+from\s+'press-ui\/(.*?);/g;

function replaceToVue3() {
  const list = glob.sync(GLOB_FILE);

  list.forEach((item) => {
    const content = readFileSync(item);
    const newContent = innerReplace(content);
    if (newContent) {
      writeFileSync(item, newContent);
      console.log(`已经替换完成 ${item}`);
    }
  });
}

function innerReplace(content) {
  const match = content.match(MATCH_REG);
  if (!match) return;
  return content.replace(MATCH_REG, (a, b) => {
    if (b.startsWith('Press')) {
      const name = b.replace('Press', '');
      return `import { ${name} as ${b} } from 'press-ui-vue3';`;
    }
    return `import { ${b} } from 'press-ui-vue3';`;
  });
}


module.exports = {
  replaceToVue3,
};

