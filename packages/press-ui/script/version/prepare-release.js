// 发布前的准备
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { traverseFolder } = require('t-comm');

const {
  TO_DELETE_FILES,
  PATH_MAP,
} = require('./config');

function genPureReleaseDir() {
  execSync(`rm -rf ${PATH_MAP.TARGET_ROOT} \
  rm -rf ${PATH_MAP.TARGET_PACKAGES} \
  && mkdir -p ${PATH_MAP.TARGET_PACKAGES} \
  && cp -r ${PATH_MAP.SOURCE_PACKAGES}/* ${PATH_MAP.TARGET_PACKAGES} \
  && cp -r ${PATH_MAP.SOURCE_PACKAGES}/package.json ${path.dirname(PATH_MAP.TARGET_PACKAGES)} \
  && cp -r ${PATH_MAP.SOURCE_PACKAGES}/.npmrc ${PATH_MAP.TARGET_PACKAGES} \
  && rm -rf ${PATH_MAP.TARGET_PACKAGES}/node_modules`, {
    stdio: 'inherit',
  });


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

  const changeLogContent = fs.readFileSync(PATH_MAP.SOURCE_CHANGELOG, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(PATH_MAP.TARGET_CHANGELOG, changeLogContent, { encoding: 'utf-8' });
}


module.exports = {
  genPureReleaseDir,
  copyReadme,
};
