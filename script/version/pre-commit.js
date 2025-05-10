const { execSync } = require('child_process');

const { insertDocChangeLog } = require('t-comm');

const {
  genPureReleaseDir,
  copyReadme,
} = require('../../src/packages/script/release/prepare');
const {
  release,
} = require('../../src/packages/script/release/release');
const {
  changeVersion,
} = require('../../src/packages/script/release/version');


const {
  PROJECT_ROOT,
  PATH_MAP,
  TO_DELETE_FILES,
} = require('./config');


function main() {
  const version = changeVersion({
    rootPackageJson: PATH_MAP.ROOT_PACKAGE_JSON,
    packageJson: PATH_MAP.PACKAGE_JSON,
  });

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
  insertDocChangeLog({
    changelogPath: PATH_MAP.SOURCE_CHANGELOG,
    docChangelogPath: PATH_MAP.DOC_TARGET_CHANGELOG,
    packageJsonPath: PATH_MAP.PACKAGE_JSON,
  });

  execSync('git add .', {
    stdio: 'inherit',
    cwd: PROJECT_ROOT,
  });

  release({
    version,
    targetPackages: PATH_MAP.TARGET_PACKAGES,
  });
}


main();

