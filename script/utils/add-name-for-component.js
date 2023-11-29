const fs = require('fs');
const path = require('path');
const { traverseFolder, camelize, capitalize, addNameForComponent } = require('t-comm');

const dir = 'src/packages';


function main() {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (!item.startsWith('press-')) {
      continue;
    }

    traverseFolder((file) => {
      const basename = path.basename(file);

      if (basename.startsWith('press-')) {
        addName(file, basename);
      }
    }, `${dir}/${item}`);
  }
}

function addName(file, basename) {
  const fileName = basename.replace('.vue', '');
  const compName = capitalize(camelize(fileName));

  addNameForComponent(file, compName);
}

main();
