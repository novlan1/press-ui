const fs = require('fs');
const VUE_FILE_PATH = 'src/packages/press-p-c-login/press-p-c-login.vue';

function extractEvents() {
  const data = fs.readFileSync(VUE_FILE_PATH, {
    encoding: 'utf-8',
  });
  const propsList = [];
  const reg = /\$emit\('([\w]+)'/g;
  // const reg = /([\w]+):\s*\{\s+type:\s*([\w]+),\s+default:\s(.*),/g;

  let match = reg.exec(data);
  while (match) {
    // console.log('match', match);
    propsList.push({
      name: match[1],
      // type: (match[2]).toLocaleLowerCase(),
      // defaultValue: parseDefaultValue(match[3]),
    });
    match = reg.exec(data);
  }
  return propsList;
}

function genTable(list) {
  const table = [
    '| 事件名 | 说明     | 参数 |',
    '| ------------------ | ---------------- | --------- |',
  ];
  list.forEach((item) => {
    const { name } = item;
    table.push(`| ${name}          |   |-   |`);
  });

  return table.join('\n');
}


function main() {
  const propsList = extractEvents();
  const table = genTable(propsList);
  fs.writeFileSync('./log/table.md', table, {
    encoding: 'utf-8',
  });
}

main();
