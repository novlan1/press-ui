const { genPureReleaseDir, copyReadme } = require('./prepare-release');

function main() {
  genPureReleaseDir();
  copyReadme();
}

main();
