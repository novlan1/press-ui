const { execCommand } = require('t-comm');

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
}


module.exports = {
  initWithPressUI,
};
