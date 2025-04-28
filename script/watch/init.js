// 用于 press-ui-demo-vue2 等工程的初始化
const path = require('path');

const { execCommand, writeFileSync, readFileSync } = require('t-comm');


function updateVersion() {
  const packageJson = path.resolve(__dirname, '../../package.json');
  const curPackageJson = './package.json';

  const fileContent = readFileSync(packageJson, true);
  const curFileContent = readFileSync(curPackageJson, true);

  curFileContent.version = fileContent.version;
  writeFileSync(curPackageJson, curFileContent, true);
}


function initWithPressUI(cpList = [
  'pages',
  'packages',
  'utils',
]) {
  execCommand('npm run init', './src/press-ui');

  cpList.forEach((item) => {
    execCommand(`rm -rf src/${item} && cp -r src/press-ui/src/${item}/ src/${item}`, process.cwd(), 'inherit');
    console.log(`[init] 处理完 ${item}`);
  });

  updateVersion();
}


module.exports = {
  initWithPressUI,
};
