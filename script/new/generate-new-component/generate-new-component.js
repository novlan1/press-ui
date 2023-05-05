const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const { copyComponentDir } = require('./copy-dir');
const { sortComponentConfig } = require('./sort');

const COMPONENT_CONFIG_PATH = path.resolve(process.cwd(), './script/component-config/component-config.json');


function getTypeMap() {
  const json = require(COMPONENT_CONFIG_PATH);

  const typeMap = Object.keys(json).reduce((cAcc, key) => {
    const value = json[key];
    const { title, list } = value;

    let desc = `${title}，如 `;

    desc += list.slice(0, 2)
      .reduce((acc, item) => {
        acc.push(item.name);
        return acc;
      }, [])
      .join('、');

    cAcc[desc] = key;

    return cAcc;
  }, {});

  return typeMap;
}

async function main() {
  const config = await getComponentConfig();
  if (!config) return;

  writeCompConfig(config);
  genDocsAndDemoConfig();
  copyComponentDir(config);
}


async function getComponentConfig() {
  const typeMap = getTypeMap();
  const typeList = Object.keys(typeMap);

  const result = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入组件英文名称，格式为大驼峰，如 MessageList、Cell？',
        validate: (val) => {
          if (val && val.trim()) {
            return true;
          }
          return '请输入组件英文名称';
        },
      },
      {
        type: 'input',
        name: 'title',
        message: '请输入组件中文名称？',
        validate: (val) => {
          if (val && val.trim()) {
            return true;
          }
          return '请输入组件中文名称';
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择组件分类？',
        choices: typeList,
      },

    ]);

  const { name, title, type } = result;
  const typeDesc = type.split('组件')[0];
  const confirm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认创建英文名为 ${name}，中文名为 ${title}，类型为 ${typeDesc} 的组件吗？`,
    },
  ]);

  if (!confirm.confirm) {
    return;
  }

  return {
    name: name.trim(),
    title: title.trim(),
    type: typeMap[type],
  };
}

function writeCompConfig(config) {
  const json = require(COMPONENT_CONFIG_PATH);
  const { type, name, title } = config;
  json[type].list.push({
    name,
    title,
  });

  const sortedJson = sortComponentConfig(json);
  fs.writeFileSync(COMPONENT_CONFIG_PATH, JSON.stringify(sortedJson, null, 2));
}

function genDocsAndDemoConfig() {
  execSync('npm run gen:config', {
    stdio: 'inherit',
  });
}

main();
