const { moveDocs } = require('@plugin-light/cli/script/docs-demo/helper');
const { watchPackages } = require('@plugin-light/cli/script/docs-demo/watch');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
