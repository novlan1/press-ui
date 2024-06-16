const glob = require('glob');
const { execCommand } = require('t-comm');

function main() {
  const list = glob.sync('packages/press-ui/src/packages/**/*.ts');
  console.log('list', list);

  list.forEach((item) => {
    if (!item.endsWith('.spec.ts') && !item.endsWith('.d.ts')) {
      execCommand(`npx tsc ${item} --declaration --emitDeclarationOnly --lib esnext,dom`, process.cwd(), 'inherit');
    }
  });
}

main();
