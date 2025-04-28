const componentConfig = require('../../config/component-config.json');
const { moveDemo } = require('../../src/packages/script/docs-demo/helper');
const { watchPackages } = require('../../src/packages/script/docs-demo/watch');


function main() {
  moveDemo(null, componentConfig);

  watchPackages(moveDemo);
}

main();
