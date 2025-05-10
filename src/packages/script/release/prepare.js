const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { traverseFolder } = require('t-comm');


function genPureReleaseDir({
  targetRoot,
  targetPackages,
  sourcePackages,
  toDeleteFiles,
}) {
  execSync(`rm -rf ${targetRoot} \
  rm -rf ${targetPackages} \
  && mkdir -p ${targetPackages} \
  && cp -r ${sourcePackages}/* ${targetPackages} \
  && cp -r ${sourcePackages}/package.json ${path.dirname(targetPackages)} \
  && cp -r ${sourcePackages}/.npmrc ${targetPackages} \
  && rm -rf ${targetPackages}/node_modules`, {
    stdio: 'inherit',
  });


  traverseFolder((file) => {
    // const name = path.basename(file);
    const reg = new RegExp(`press-[\\w-]+/(${toDeleteFiles.join('|')})`);
    if (reg.test(file)) {
      fs.unlinkSync(file);
      console.log('已删除文件: ', file);
    }
  }, targetPackages);
}


function copyReadme({
  sourceReadme,
  targetReadme,
  sourceChangelog,
  targetChangelog,
}) {
  const content = fs.readFileSync(sourceReadme, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(targetReadme, content, { encoding: 'utf-8' });

  const changeLogContent = fs.readFileSync(sourceChangelog, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(targetChangelog, changeLogContent, { encoding: 'utf-8' });
}


module.exports = {
  genPureReleaseDir,
  copyReadme,
};
