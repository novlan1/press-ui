const fs = require('fs');
const PATH_MAP = {
  SOURCE: './README.md',
  TARGET: 'docs/README.md',
};

function copyReadme() {
  const content = fs.readFileSync(PATH_MAP.SOURCE, {
    encoding: 'utf-8',
  });

  const newContent = content.replace('文档地址在[这里](https://test.igame.qq.com/tip/press-ui/press-ui/)。\n', '');

  fs.writeFileSync(PATH_MAP.TARGET, newContent, { encoding: 'utf-8' });
}

function main() {
  copyReadme();
}

main();
