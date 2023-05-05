const { watchPackages } = require('./watch');
const { moveDocs  } = require('./md');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
