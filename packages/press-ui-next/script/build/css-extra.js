const { execCommand, readFileSync, writeFileSync } = require('t-comm');


function main() {
  const res = execCommand(
    'grep -rl \'./css/css.mjs\' {es,esm,lib,cjs}/{mixins,common}/**/*js',
    process.cwd(),
    {
      stdio: 'pipe',
      line: -1,
    },
  );
  const list = res?.split('\n').map(item => item.trim())
    .filter(item => item);

  console.log('[list]', list);

  list.forEach((file) => {
    const content = readFileSync(file);
    writeFileSync(file, content.replace('import \'./css/css.mjs\';', ''));
  });
}
main();
