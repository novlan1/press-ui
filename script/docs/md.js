const fs = require('fs');
const path = require('path');
const { mkDirsSync } = require('t-comm');
const { getPureCompName } = require('../utils/utils');

const LOCAL_DOC_NAME = 'README.md';
const LOCAL_DOC_EN_NAME = 'README.en-US.md';
const LOCAL_DEMO_NAME = 'demo.vue';

const COMPONENT_DIR = './src/packages';

const DOC_PATH = './docs/components/press';
const DOC_EN_PATH = './docs/en/components/press';
const DEMO_PATH = './src/pages/press';

/**
 * 获取组件文件夹
 */
function getComps() {
  const dirs = fs.readdirSync(COMPONENT_DIR);

  const comps = dirs
    .filter((dir) => {
      const vuePath = path.resolve(COMPONENT_DIR, dir, `${dir}.vue`);
      const vueListPath = path.resolve(COMPONENT_DIR, dir, `${dir}-list.vue`);
      return fs.existsSync(vuePath) || fs.existsSync(vueListPath);
    })
    .map(dir => ({
      path: path.resolve(COMPONENT_DIR, dir),
      name: dir,
    }));
  return comps;
}

/**
 * 获取组件附近的文档列表
 */
function getLocalDocOrDemo(comps, postfix) {
  const docs = comps
    .filter((comp) => {
      const { path: dir } = comp;
      const readmePath = path.resolve(dir, postfix);
      return fs.existsSync(readmePath);
    })
    .map((comp) => {
      const { path: dir } = comp;
      return {
        ...comp,
        path: path.resolve(dir, postfix),
      };
    });
  return docs;
}

/**
 * 移动文档
 */
function moveDocs(cb) {
  const comps = getComps();
  const docs = getLocalDocOrDemo(comps, LOCAL_DOC_NAME);
  const docsEn = getLocalDocOrDemo(comps, LOCAL_DOC_EN_NAME);

  console.log(`[AUTO] 共有${docs.length}个组件文档\n`);
  console.log(`[AUTO] 共有${docsEn.length}个英文组件文档\n`);

  for (const doc of docs) {
    const { path: dir, name } = doc;
    const data = fs.readFileSync(dir, {
      encoding: 'utf-8',
    });

    writeCompDoc(data, name, DOC_PATH);
  }
  for (const doc of docsEn) {
    const { path: dir, name } = doc;
    const data = fs.readFileSync(dir, {
      encoding: 'utf-8',
    });

    writeCompDoc(data, name, DOC_EN_PATH);
  }

  if (typeof cb === 'function') {
    cb();
  }
}

/**
 * 监听单个文件变化
 */
// function watchChange(dir) {
//   const prefixDir = path.resolve(COMPONENT_DIR);
//   const compDir = path.resolve(dir);
//   const compName = compDir
//     .replace(prefixDir, '')
//     .replace(/^\/|\/$/, '')
//     .split('/')[0];
//   const data = fs.readFileSync(dir, {
//     encoding: 'utf-8',
//   });

//   writeCompDoc(data, compName);
// }

/**
 * 将文档写入docs目录
 */
function writeCompDoc(data, name, docPath) {
  console.log(`[AUTO] 正在写入 ${name} 文档...`);
  if (!fs.existsSync(docPath)) {
    mkDirsSync(docPath);
  }
  fs.writeFileSync(path.resolve(docPath, `${name}.md`), data, {
    encoding: 'utf-8',
  });
}


/**
 * 将demo写入pages目录
 */
function writeCompDemo(data, name) {
  const pureName = getPureCompName(name);
  console.log(`[AUTO] 正在写入 ${pureName} demo...`);
  if (!fs.existsSync(DEMO_PATH)) {
    mkDirsSync(DEMO_PATH);
  }
  const dir = path.resolve(DEMO_PATH, pureName);

  if (!fs.existsSync(dir)) {
    mkDirsSync(dir);
  }
  fs.writeFileSync(path.resolve(dir, `${pureName}.vue`), data, {
    encoding: 'utf-8',
  });
}


function moveDemo(cb) {
  const comps = getComps();
  const demos = getLocalDocOrDemo(comps, LOCAL_DEMO_NAME);
  console.log(`[AUTO] 共有${demos.length}个组件demo\n`);

  for (const doc of demos) {
    const { path: dir, name } = doc;
    const data = fs.readFileSync(dir, {
      encoding: 'utf-8',
    });

    writeCompDemo(data, name);
  }

  if (typeof cb === 'function') {
    cb();
  }
}


module.exports = {
  moveDocs,
  moveDemo,
};


