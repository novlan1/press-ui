const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { traverseFolder } = require('t-comm');

const { insetDocChangeLog } = require('./change-log');

const TO_DELETE_FILES = ['demo.vue', 'README.md', 'README.en-US.md', 'demo-helper/'];
const PATH_MAP = {
  SOURCE_PACKAGES: 'src/packages',
  TARGET_PACKAGES: 'log/packages',
  PACKAGE_JSON: './src/packages/package.json',
  ROOT_PACKAGE_JSON: './package.json',
  SOURCE_README: './README.md',
  TARGET_README: './log/packages/README.md',
};


function getNewVersion() {
  const pkg = JSON.parse(fs.readFileSync(PATH_MAP.ROOT_PACKAGE_JSON, {
    encoding: 'utf-8',
  }));
  return pkg.version;
}

function changeVersion() {
  const newVersion = getNewVersion();

  const pkg = JSON.parse(fs.readFileSync(PATH_MAP.PACKAGE_JSON, {
    encoding: 'utf-8',
  }));
  console.log(`[VERSION] The new version is ${newVersion}`);
  pkg.version = newVersion;

  fs.writeFileSync(PATH_MAP.PACKAGE_JSON, JSON.stringify(pkg, null, 2), {
    encoding: 'utf-8',
  });
}
function release() {
  execSync(`cd ${PATH_MAP.TARGET_PACKAGES} && npm publish`, {
    stdio: 'inherit',
  });
}

function genPureReleaseDir() {
  const dir = path.dirname(PATH_MAP.TARGET_PACKAGES);
  execSync(`rm -rf ${PATH_MAP.TARGET_PACKAGES} && cp -r ${PATH_MAP.SOURCE_PACKAGES} ${dir}`);

  traverseFolder((file) => {
    // const name = path.basename(file);
    const reg = new RegExp(`press-[\\w-]+/(${TO_DELETE_FILES.join('|')})`);
    if (reg.test(file)) {
      fs.unlinkSync(file);
      console.log('已删除文件: ', file);
    }
  }, PATH_MAP.TARGET_PACKAGES);
}

function copyReadme() {
  const content = fs.readFileSync(PATH_MAP.SOURCE_README, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(PATH_MAP.TARGET_README, content, { encoding: 'utf-8' });
}


function main() {
  changeVersion();

  genPureReleaseDir();
  copyReadme();
  insetDocChangeLog();

  execSync('git add .', {
    stdio: 'inherit',
  });

  release();
}


main();

