const { watchPackages } = require('./watch');
const { moveDemo  } = require('./md');


function main() {
  moveDemo();

  watchPackages(moveDemo);
}

main();
