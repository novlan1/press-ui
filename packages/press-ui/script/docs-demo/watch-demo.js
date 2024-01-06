const { watchPackages } = require('./watch');
const { moveDemo } = require('./helper');


function main() {
  moveDemo();

  watchPackages(moveDemo);
}

main();
