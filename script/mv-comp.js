const fs = require('fs');
const path = require('path');
const SAVE_FILE_PATH = path.resolve(__dirname, '../src/global-comp.js');

const EXCLUDE_COMPONENT_LIST = ['UniListAd'];

function uppercase(name) {
  return name.replace(/(^|-)\S/g, a => a.toUpperCase()).replace(/-/g, '');
}

function main() {
  const dir = './src/uni_modules/';
  const dirs = fs.readdirSync(dir);

  const compNames = [];

  const strList = dirs.map((dir) => {
    const compsPath = `./src/uni_modules/${dir}/components`;

    // components文件夹存在
    if (fs.existsSync(compsPath)) {
      const comps = fs.readdirSync(compsPath);

      return comps.map((comp) => {
        const compPath = `${compsPath}/${comp}/${comp}.vue`;

        // 组件按照以下规范： 组件名/组件名.vue
        if (fs.existsSync(compPath)) {
          const compName = uppercase(comp);

          if (EXCLUDE_COMPONENT_LIST.indexOf(compName) === -1) {
            console.log('正在处理: ', compPath);
            compNames.push(compName);
            return  `import ${compName} from './uni_modules/${dir}/components/${comp}/${comp}.vue'`;
          }
        }
      });
    }
  })
    .flat()
    .concat(compNames.map(name => `Vue.component('${name}',${name})`));

  const content = ['import Vue from \'vue\''].concat(strList).join('\n');

  fs.writeFileSync(SAVE_FILE_PATH, content, {
    encoding: 'utf-8',
  });
}

main();
