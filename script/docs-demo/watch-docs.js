const { moveDocs } = require('../../src/packages/script/docs-demo/helper');
const { watchPackages } = require('../../src/packages/script/docs-demo/watch');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
