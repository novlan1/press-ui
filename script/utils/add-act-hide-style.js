const fs = require('fs');
const ACT_PATH = './src/packages/press-act-launch-dialog/css';
function main() {
  const dir = fs.readdirSync(ACT_PATH, {
    encoding: 'utf-8',
  });
  console.log('dir', dir);

  dir.forEach((item) => {
    replaceScss(`${ACT_PATH}/${item}`);
  });
}

function replaceScss(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  if (!content.includes('.tip')) return;

  const newContent = content.replace('.tip', '.press-act:not(.press-act--hidden-tip) {\n.tip')

    .replace(/$/, '\n}');

  fs.writeFileSync(filePath, newContent, {
    encoding: 'utf-8',
  });
}

main();
