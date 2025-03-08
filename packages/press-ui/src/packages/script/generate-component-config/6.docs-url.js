const fs = require('fs');
const path = require('path');
const { readFileSync, writeFileSync, hyphenate } = require('t-comm');

const {
  DEMO_DIR_MAP,
} = require('../utils/utils');


function updateDocsData(config, targetDir) {
  const compList = Object.values(config);
  compList.forEach((item) => {
    const { list } = item;
    list.forEach((comp) => {
      updateDocsUrl({ targetDir, comp });
    });
  });
}


function updateDocsUrl({ targetDir, comp }) {
  const demoUrl = getDemoUrl(comp);
  const { name } = comp;
  const hyphenatedName = hyphenate(name);

  // 这里组件都是放在 `targetDir/packages/press-xxx` 中
  const compDir = path.resolve(targetDir, 'packages', `press-${hyphenatedName}`);

  const readme = path.resolve(compDir, 'README.md');
  const readmeEn = path.resolve(compDir, 'README.en-US.md');

  realUpdateDocsUrl({
    readme,
    demoUrl,
  });
  realUpdateDocsUrl({
    readme: readmeEn,
    demoUrl,
  });
}


function realUpdateDocsUrl({ readme, demoUrl }) {
  if (fs.existsSync(readme)) {
    const content = readFileSync(readme);
    const newContent = content.replace(/(url\s*:\s*)pages\/[\w-]+\/[\w/\-?=]+\n/, `$1${demoUrl}\n`);
    writeFileSync(readme, newContent);
  }
}


function getDemoUrl(compConfig) {
  const { name, demoRedirect, subPackage = DEMO_DIR_MAP.PRESS } = compConfig;
  const hyphenatedName = hyphenate(name);
  if (!demoRedirect) {
    return `pages/${subPackage}/${hyphenatedName}/${hyphenatedName}`;
  }
  const hyphenatedRedirect = hyphenate(demoRedirect);

  return `pages/${subPackage}/${hyphenatedRedirect}/${hyphenatedRedirect}?comp=${hyphenatedName}`;
}


module.exports = {
  updateDocsData,
};
