const fs = require('fs');
const { execSync } = require('child_process');
const { writeFileSync, readFileSync } = require('t-comm');

const { insertDocChangeLog } = require('./change-log');
const {
  PROJECT_ROOT,
  PROJECT_ROOT_PKG,
  PATH_MAP,
} = require('./config');
const {
  genPureReleaseDir,
  copyReadme,
} = require('./prepare-release');

const PRE_RELEASE_VERSION = /\d+\.\d+\.\d+-(\w+).\d+/;


function getPreReleaseTag(version) {
  const match = version.match(PRE_RELEASE_VERSION);
  if (!match || !match[1]) return '';
  return match[1];
}

function getNewVersion() {
  const pkg = readFileSync(PATH_MAP.ROOT_PACKAGE_JSON, true);
  return pkg.version;
}

function changeVersion() {
  const newVersion = getNewVersion();

  const pkg = readFileSync(PATH_MAP.PACKAGE_JSON, true);
  console.log(`[VERSION] The new version is ${newVersion}`);
  pkg.version = newVersion;

  fs.writeFileSync(PATH_MAP.PACKAGE_JSON, JSON.stringify(pkg, null, 2), {
    encoding: 'utf-8',
  });
  return newVersion;
}
function release(version) {
  const publishTag = getPreReleaseTag(version);
  let publishScript = 'npm publish';
  if (publishTag) {
    publishScript = `npm publish --tag ${publishTag}`;
  }

  execSync(`cd ${PATH_MAP.TARGET_PACKAGES} && ${publishScript}`, {
    stdio: 'inherit',
  });
}

function changeRootVersion(version) {
  const content = readFileSync(PROJECT_ROOT_PKG, true);
  content.version = version;
  writeFileSync(PROJECT_ROOT_PKG, content, true);
}


function main() {
  const version = changeVersion();
  changeRootVersion(version);

  genPureReleaseDir();
  copyReadme();
  insertDocChangeLog();

  execSync('git add .', {
    stdio: 'inherit',
    cwd: PROJECT_ROOT,
  });

  release(version);
}


main();

