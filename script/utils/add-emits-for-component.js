const glob = require('glob');
const fs = require('fs');

function main() {
  const list = glob.sync('src/packages/**/*.vue');
  // const list = ['src/packages/press-turntable/press-turntable.vue'];
  console.log('[list]', list);

  list.forEach((file) => {
    const content = fs.readFileSync(file, {
      encoding: 'utf-8',
    });
    const emits = getEmitList(content);
    console.log('[emits]', emits);

    insertEmits(file, content, emits);
  });
}

function getSourceFromReg(content, reg) {
  let match = reg.exec(content);
  const result = [];

  while (match) {
    result.push(match[1]);
    match = reg.exec(content);
  }
  return result;
}

function getEmitList(source) {
  const reg = /emit\('([^',]+)'/g;
  const emits = getSourceFromReg(source, reg);
  return Array.from(new Set(emits));
}

function insertEmits(file, source, emits) {
  if (source.indexOf('emits: [') > -1) return;
  if (!emits.length) return;

  const emitsStr = emits.map(item => `'${item}'`).join(', ');

  const newSource = source.replace(/(?=\s\sdata\(\)\s*\{)/, `  emits: [${emitsStr}],\n`);

  fs.writeFileSync(file, newSource, {
    encoding: 'utf-8',
  });
}

main();
