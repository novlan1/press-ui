const { remToPxInFile } = require('t-comm/lib/rem-to-px/rem-to-px');

const componentPath = process.argv[2];
console.log('[componentPath]', componentPath);

if (!componentPath) {
  console.error('[Extract Props] Please Input Component Name');
  process.exit(1);
}

function main() {
  remToPxInFile(componentPath);
}

main();
