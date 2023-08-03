const fs = require('fs');
const path = require('path');
const { traverseFolder, camelize, capitalize } = require('t-comm');

const dir = 'src/packages';


function main() {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (!item.startsWith('press-')) {
      continue;
    }

    traverseFolder((file) => {
      const basename = path.basename(file);
      console.log('[basename]',  basename);

      if (basename.startsWith('press-')) {
        addName(file, basename);
      }
    }, `${dir}/${item}`);
  }
}

function addName(file, basename) {
  const fileName = basename.replace('.vue', '');
  const compName = capitalize(camelize(fileName));

  const str = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  const newStr = str.replace(/export default {(?!\s+name)/, `export default {\n  name: '${compName}',`);

  fs.writeFileSync(file, newStr, {
    encoding: 'utf-8',
  });
}

main();
