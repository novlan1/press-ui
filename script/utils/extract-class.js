const { extractClass } = require('t-comm/lib/component/extract-class');

// const reg = /(?!class=")(?=tip)([^"]+)/g;

const componentPath = process.argv[2];
console.log('[componentPath]', componentPath);

if (!componentPath) {
  console.error('[Extract Props] Please Input Component Name');
  process.exit(1);
}


function main() {
  extractClass({
    filePath: componentPath,
  });
}

main();
