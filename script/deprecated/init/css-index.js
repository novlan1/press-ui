const fs = require('fs');
const path = require('path');

const glob = require('glob');
const { writeFileSync } = require('t-comm');

function main() {
  const list = glob.sync('./src/packages/press-*/css/index.scss');
  console.log('list', list);
  const getIndexJs = file => path.resolve(path.dirname(file), 'index.js');
  list.forEach((file) => {
    const indexJs = getIndexJs(file);
    if (!fs.existsSync(indexJs)) {
      writeFileSync(indexJs, 'import \'./index.scss\';\n');
    }
  });
}

main();
