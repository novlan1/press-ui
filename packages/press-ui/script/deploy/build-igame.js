const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('t-comm');
const path = require('path');


const ENV_FILE = require('../env/env-file')();

const MANIFEST_PATH = path.resolve(__dirname, '../../src/manifest.json');
const PUBLIC_PATH_MAP = {
  IGAME: 'https://image-1251917893.file.myqcloud.com/',
  NORMAL: './',
};


function updateManifest(publicPath) {
  const data = readFileSync(MANIFEST_PATH, true);
  data.h5.publicPath = publicPath;
  writeFileSync(MANIFEST_PATH, data, true);
}


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

    updateManifest(PUBLIC_PATH_MAP.IGAME);
    execSync('npm run init && npm run build', {
      stdio: 'inherit',
    });
    updateManifest(PUBLIC_PATH_MAP.NORMAL);

    execSync('mkdir -p dist/press-ui-demo/dist && cp -r dist/build/h5/* dist/press-ui-demo/dist', {
      stdio: 'inherit',
    });
  }
}

main();
