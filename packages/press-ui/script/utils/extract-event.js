const { extractEvent } = require('t-comm/lib/component/extract-event');

const componentPath = process.argv[2];
console.log('[componentPath]', componentPath);

if (!componentPath) {
  console.error('[Extract Props] Please Input Component Name');
  process.exit(1);
}

function main() {
  extractEvent({
    filePath: componentPath,
    targetFilePath: './log/table-event.md',
  });
}

main();
