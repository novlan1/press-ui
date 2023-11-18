const fs = require('fs');
const { hyphenate } = require('t-comm/lib/base/string');
const VUE_FILE_PATH = 'src/packages/press-p-c-scan-login/press-p-c-scan-login.vue';

function parseDefaultValue(value) {
  if (value.indexOf('=>') > -1) {
    value = value.replace(/\(\)\s*=>\s*\(?/, '').replace(/\)?$/, '')
      .trim();
  }
  console.log('value', value);
  if (['\'\'', '[]', '{}'].indexOf(value) > -1) {
    return '-';
  }
  value = value.replace(/^'|'$/g, '');
  return `\`${value}\``;
}

function extractProps() {
  const data = fs.readFileSync(VUE_FILE_PATH, {
    encoding: 'utf-8',
  });
  const propsList = [];
  const reg = /([\w]+):\s*\{\s+type:\s*([\w]+),\s+default:\s(.*),/g;

  let match = reg.exec(data);
  while (match) {
    // console.log('match', match);
    propsList.push({
      name: hyphenate(match[1]),
      type: (match[2]).toLocaleLowerCase(),
      defaultValue: parseDefaultValue(match[3]),
    });
    match = reg.exec(data);
  }
  return propsList;
}

function genTable(list) {
  const table = [
    '| 参数               | 说明             | 类型      | 默认值 |',
    '| ------------------ | ---------------- | --------- | ------ |',
  ];
  list.forEach((item) => {
    const { name, type, defaultValue } = item;
    table.push(`| ${name}          |          | _${type}_   | ${defaultValue}      |`);
  });

  return table.join('\n');
}


function main() {
  const propsList = extractProps();
  const table = genTable(propsList);
  fs.writeFileSync('./log/table.md', table, {
    encoding: 'utf-8',
  });
}

main();
