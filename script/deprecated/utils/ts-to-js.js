const glob = require('glob');
const { execCommand } = require('t-comm');

function main() {
  const list = glob.sync('src/packages/**/*.ts');
  console.log('list', list);

  list.forEach((item) => {
    const jsName = item.replace(/\.ts$/, '.js');
    if (!item.endsWith('.spec.ts') && !item.endsWith('.d.ts')) {
      execCommand(`mv ${item} ${jsName}`, process.cwd(), 'inherit');
    }
  });
}

main();
