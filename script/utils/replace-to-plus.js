const { execCommand, readFileSync, writeFileSync } = require('t-comm');
// const TARGET_DIR = '/Users/yang/Documents/git-woa/web/src';
const TARGET_DIR = '/Users/yang/Documents/git-woa/dzs-match/src';
const reg = /@tencent\/press-ui\/press-([\w-]+)/g;

const LOG_FILE = 'log/replace-to-plus.json';


function main() {
  const res = execCommand(`grep -rl press-ui/press- ${TARGET_DIR} | xargs echo`, process.cwd(), 'pipe');
  console.log('[res]', res);

  const list = res.split(/\s/);
  console.log('[list]', list, list.length);

  const result = new Set();
  list.forEach((item) => {
    const content = readFileSync(item);
    const component = getComponent(content);

    component.forEach((comp) => {
      result.add(comp);
    });
  });

  writeFileSync(LOG_FILE, Array.from(result), true);
  console.log(`已保存至 ${LOG_FILE}`);
}

function getComponent(content) {
  const match = content.match(reg);
  return match;
}

main();
