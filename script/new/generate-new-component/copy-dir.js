const fs = require('fs');
const path = require('path');
const { copyDir } = require('t-comm');
const { getFullCompName, getPureCompName } = require('../../utils/utils');

const TEMPLATE_PATH = './script/new/template';
const COMP_TARGET_PATH = './src/packages';
const DEFAULT_COMP_NAME = 'press.vue';
const DEFAULT_README_NAME = 'README.md';
const DEFAULT_README_EN_NAME = 'README.en-US.md';

function copyComponentDir(config) {
  const { name, title  } = config;
  if (!name) {
    throw new Error('请输入组件名称');
  }
  console.log(`[NEW] 正在创建 ${name} 组件...`);

  const fullName = getFullCompName(name);
  const pureName = getPureCompName(name);
  const targetDir = path.resolve(COMP_TARGET_PATH, fullName);


  if (fs.existsSync(targetDir)) {
    throw new Error(`${name} 已经存在，请移除后重试`);
  }
  copyDir(TEMPLATE_PATH, targetDir, () => {
    console.log(`[NEW] ${fullName} 拷贝成功`);
  });

  const compVue = path.resolve(COMP_TARGET_PATH, fullName, DEFAULT_COMP_NAME);
  const newCompName = path.resolve(COMP_TARGET_PATH, fullName, `${fullName}.vue`);

  fs.renameSync(compVue, newCompName);
  console.log(`[NEW] ${fullName}.vue 重命名成功`);

  changeReadme({
    fullName,
    pureName,
    title,
    name,
  });
  changeReadme({
    fullName,
    pureName,
    title,
    name,
    isEn: true,
  });
  console.log(`[NEW] ${fullName} 文档变量替换成功`);
}


function changeReadme({
  fullName,
  pureName,
  title,
  name,
  isEn,
}) {
  const docPath = path.resolve(COMP_TARGET_PATH, fullName, isEn ? DEFAULT_README_EN_NAME : DEFAULT_README_NAME);
  const data = fs.readFileSync(docPath, {
    encoding: 'utf-8',
  });

  const newData = data
    .replace(/COMP/g, pureName)
    .replace(/SUBTITLE/g, name)
    .replace(/TITLE/g, title);

  fs.writeFileSync(docPath, newData, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(docPath, newData, {
    encoding: 'utf-8',
  });
}


module.exports = {
  copyComponentDir,
};
