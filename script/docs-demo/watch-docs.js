const { watchPackages } = require('./watch');
const { moveDocs } = require('./helper');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
