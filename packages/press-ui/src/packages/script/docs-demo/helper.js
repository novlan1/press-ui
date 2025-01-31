const fs = require('fs');
const path = require('path');
const { mkDirsSync, getPureCompName } = require('t-comm');
const { getActPageDir, COMP_PREFIX, IS_INNER_DOCS } = require('../utils/utils');

let gComponentConfig;

const PATH_MAP = {
  DOC_PATH: `./${IS_INNER_DOCS ? 'docs/' : ''}docs/components/press`,
  DOC_EN_PATH: `./${IS_INNER_DOCS ? 'docs/' : ''}docs/en/components/press`,
  DEMO_PATH: './src/pages/',
  COMPONENT_DIR: './src/packages',
};

const FILENAME_MAP = {
  LOCAL_DOC_NAME: 'README.md',
  LOCAL_DOC_EN_NAME: 'README.en-US.md',
  LOCAL_DEMO_NAME: 'demo.vue',
};


/**
 * 获取组件文件夹
 */
function getComps() {
  const dirs = fs.readdirSync(PATH_MAP.COMPONENT_DIR);

  const comps = dirs
    .filter((dir) => {
      const vuePath = path.resolve(PATH_MAP.COMPONENT_DIR, dir, `${dir}.vue`);
      const vueListPath = path.resolve(PATH_MAP.COMPONENT_DIR, dir, `${dir}-list.vue`);
      return fs.existsSync(vuePath) || fs.existsSync(vueListPath);
    })
    .map(dir => ({
      path: path.resolve(PATH_MAP.COMPONENT_DIR, dir),
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
  const docs = getLocalDocOrDemo(comps, FILENAME_MAP.LOCAL_DOC_NAME);
  const docsEn = getLocalDocOrDemo(comps, FILENAME_MAP.LOCAL_DOC_EN_NAME);

  console.log(`>> 共有${docs.length}个组件文档\n`);
  console.log(`>> 共有${docsEn.length}个英文组件文档\n`);

  for (const doc of docs) {
    const { path: dir, name } = doc;
    const data = fs.readFileSync(dir, {
      encoding: 'utf-8',
    });

    writeCompDoc(data, name, PATH_MAP.DOC_PATH);
  }
  for (const doc of docsEn) {
    const { path: dir, name } = doc;
    const data = fs.readFileSync(dir, {
      encoding: 'utf-8',
    });

    writeCompDoc(data, name, PATH_MAP.DOC_EN_PATH);
  }

  if (typeof cb === 'function') {
    cb();
  }
}


/**
 * 将文档写入docs目录
 */
function writeCompDoc(data, name, docPath) {
  console.log(`>> 正在写入 ${name} 文档...`);
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
  const pureName = getPureCompName(name, COMP_PREFIX);
  const demoPath = `${PATH_MAP.DEMO_PATH}${getActPageDir(pureName, gComponentConfig)}`;

  console.log(`>> 正在写入 ${pureName} demo...`);
  if (!fs.existsSync(demoPath)) {
    mkDirsSync(demoPath);
  }
  const dir = path.resolve(
    demoPath,
    pureName,
  );

  if (!fs.existsSync(dir)) {
    mkDirsSync(dir);
  }
  fs.writeFileSync(path.resolve(dir, `${pureName}.vue`), data, {
    encoding: 'utf-8',
  });
}


function moveDemo(cb, config) {
  const comps = getComps();
  const demos = getLocalDocOrDemo(comps, FILENAME_MAP.LOCAL_DEMO_NAME);
  console.log(`>> 共有${demos.length}个组件demo\n`);
  if (config) {
    gComponentConfig = config;
  }

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


