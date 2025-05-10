const {
  genPureReleaseDir,
  copyReadme,
} = require('../../src/packages/script/release/prepare');

const {
  TO_DELETE_FILES,
  PATH_MAP,
} = require('./config');


function main() {
  genPureReleaseDir({
    targetRoot: PATH_MAP.TARGET_ROOT,
    targetPackages: PATH_MAP.TARGET_PACKAGES,
    sourcePackages: PATH_MAP.SOURCE_PACKAGES,
    toDeleteFiles: TO_DELETE_FILES,
  });
  copyReadme({
    sourceReadme: PATH_MAP.SOURCE_README,
    targetReadme: PATH_MAP.TARGET_README,
    sourceChangelog: PATH_MAP.SOURCE_CHANGELOG,
    targetChangelog: PATH_MAP.TARGET_CHANGELOG,
  });
}

main();
