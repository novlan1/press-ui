const fs = require('fs');
const path = require('path');

const ICON_SCSS_PATH = 'src/packages/press-icon/uniicons.css';
const ICON_LIST_PATH = 'src/common/icon.json';
const REG = /(?<=icon-)([\w-]+):before\s*{\s*content:\s*"(.*?)"/mg;

function main() {
  const iconScss = fs.readFileSync(path.resolve(process.cwd(), ICON_SCSS_PATH), {
    encoding: 'utf-8',
  });


  let match ;
  const icons = {};
  while ((match = REG.exec(iconScss))) {
    icons[match[1]] = {
      name: match[1],
      unicode: match[2],
    };
  }
  saveToLocal(icons);
}

function saveToLocal(icons) {
  fs.writeFileSync(path.resolve(process.cwd(), ICON_LIST_PATH), JSON.stringify(icons, null, 2));
}

main();
