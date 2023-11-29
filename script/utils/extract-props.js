const { extractProps } = require('t-comm/lib/component/extract-props');

const componentPath = process.argv[2];
console.log('[componentPath]', componentPath);

if (!componentPath) {
  console.error('[Extract Props] Please Input Component Name');
  process.exit(1);
}

function main() {
  extractProps({
    filePath: componentPath,
    targetFilePath: './log/table-props.md',
  });
}

main();
