const { watchPackages } = require('../../src/packages/script/docs-demo/watch');
const { moveDocs } = require('../../src/packages/script/docs-demo/helper');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
