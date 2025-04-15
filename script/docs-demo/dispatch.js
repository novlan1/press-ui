const path = require('path');
const { moveDemo, moveDocs } = require('../../src/packages/script/docs-demo/helper');

function main() {
  moveDemo(null, null, {
    toDeleteDirs: [
      path.resolve(__dirname, '../../src/pages/press'),
    ],
  });
  console.log();
  moveDocs();
}

main();
