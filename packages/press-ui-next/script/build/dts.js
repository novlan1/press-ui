const glob = require('glob');
const { execCommand } = require('t-comm');

function main() {
  const list = glob.sync('./{es,esm,lib,cjs}/**/press-*.vue.d.ts');
  console.log('list', list);
  list.forEach((file) => {
    const target = file.replace(/\.vue\.d\.ts/, '.d.ts');
    execCommand(`mv ${file} ${target}`, process.cwd(), 'inherit');
  });
}

main();
