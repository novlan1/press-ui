const { writeFileSync } = require('t-comm');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

function main() {
  const list = glob.sync('./packages/press-ui/src/packages/press-*/css/index.scss');
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
