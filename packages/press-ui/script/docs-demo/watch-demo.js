const { watchPackages } = require('../../src/packages/script/docs-demo/watch');
const { moveDemo } = require('../../src/packages/script/docs-demo/helper');


function main() {
  moveDemo();

  watchPackages(moveDemo);
}

main();
