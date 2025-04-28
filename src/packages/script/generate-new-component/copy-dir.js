const fs = require('fs');
const path = require('path');

const { copyDir, execCommand, getPureCompName, getFullCompName } = require('t-comm');

const { isActComponent, COMP_PREFIX } = require('../utils/utils');

const TEMPLATE_PATH = './script/new/template';
const COMP_TARGET_PATH = './src/packages';
const DEFAULT_COMP_NAME = 'press.vue';
const DEFAULT_README_NAME = 'README.md';
const DEFAULT_README_EN_NAME = 'README.en-US.md';
const DEFAULT_DEMO_NAME = 'demo.vue';


function copyComponentDir(config) {
  const { name, title  } = config;
  if (!name) {
    throw new Error('请输入组件名称');
  }
  console.log(`[NEW] 正在创建 ${name} 组件...`);

  const fullName = getFullCompName(name, COMP_PREFIX);
  const pureName = getPureCompName(name, COMP_PREFIX);
  const targetDir = path.resolve(COMP_TARGET_PATH, fullName);


  if (fs.existsSync(targetDir)) {
    throw new Error(`${name} 已经存在，请移除后重试`);
  }
  copyDir(TEMPLATE_PATH, targetDir, () => {
    console.log(`[NEW] ${fullName} 拷贝成功`);
  });

  if (isActComponent(fullName)) {
    execCommand('rm -rf demo.vue && mv demo-act.vue demo.vue', targetDir, 'inherit');
  } else {
    execCommand('rm -rf demo-act.vue', targetDir, 'inherit');
  }

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
  changeDemo({
    fullName,
    pureName,
    title,
    name,
    newCompName,
  });
  changeComponent({
    fullName,
    pureName,
    title,
    name,
    newCompName,
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


function changeDemo({
  fullName,
  pureName,
  name,
  title,
  newCompName,
}) {
  const filePath = path.resolve(COMP_TARGET_PATH, fullName, newCompName);
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });

  const newData = data
    .replace(/COMP/g, pureName)
    .replace(/SUBTITLE/g, name)
    .replace(/TITLE/g, title);

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });
}


function changeComponent({
  fullName,
  pureName,
  name,
  title,
}) {
  const filePath = path.resolve(COMP_TARGET_PATH, fullName, DEFAULT_DEMO_NAME);
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });

  const newData = data
    .replace(/COMP/g, pureName)
    .replace(/SUBTITLE/g, name)
    .replace(/TITLE/g, title);

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });
}
module.exports = {
  copyComponentDir,
};
