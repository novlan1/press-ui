const path = require('path');
const { writeFileSync, readFileSync, execCommand } = require('t-comm');


const ROOT = process.cwd();
const VUE3_CONFIG = {
  NAME: 'press-ui-vue3',
  PKG: './src/vue3/package.json',
  NPMRC: './src/vue3/.npmrc',
  PUBLISH_TARGET: './lib',
};


function copyPkg() {
  const { version } = require(path.resolve(ROOT, 'package.json'));
  const content = readFileSync(VUE3_CONFIG.PKG, true);

  content.version = version;
  content.name = VUE3_CONFIG.NAME;

  writeFileSync(VUE3_CONFIG.PKG, content, true);

  execCommand(`cp ${VUE3_CONFIG.PKG} ${VUE3_CONFIG.PUBLISH_TARGET}`);
  execCommand(`cp ${VUE3_CONFIG.NPMRC} ${VUE3_CONFIG.PUBLISH_TARGET}`);
}

function main() {
  copyPkg();
}

main();
