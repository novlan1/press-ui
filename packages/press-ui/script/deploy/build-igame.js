const { execSync } = require('child_process');
const ENV_FILE = require('../env/env-file')();

function main() {
  require('dotenv').config({ path: ENV_FILE });

  process.env.UNI_INPUT_DIR = './src';
  const appDir = process.env.VUE_APP_DIR;
  if (appDir === 'project/press-ui') {
    execSync('npm run docs:build:igame', {
      stdio: 'inherit',
    });
    execSync('mkdir -p dist/press-ui/dist && cp -r docs/.vuepress/dist/* dist/press-ui/dist', {
      stdio: 'inherit',
    });
  } else if (appDir === 'project/press-ui-demo') {
    // execSync(' echo VUE_APP_DIR = project/press-ui-demo > .env.local', {
    //   stdio: 'inherit',
    // });

    execSync('npm run init && npm run build', {
      stdio: 'inherit',
    });
    execSync('mkdir -p dist/press-ui-demo/dist && cp -r dist/build/h5/* dist/press-ui-demo/dist', {
      stdio: 'inherit',
    });
  }
}

main();
