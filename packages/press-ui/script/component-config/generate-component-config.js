const fs = require('fs');
const path = require('path');
const { mkDirsSync } = require('t-comm');
const { DEPLOY_CONFIG } = require('../../config/deploy-config');

const componentConfig = require('../../config/component-config.json');
const { getActPageDir } = require('../utils/utils');
const {
  hyphenate,
  getComponentPath,
  writeSrcIndexJs,
} = require('./generate-entry');


// const DEMO_PAGES_JSON_LAST_INDEX = 0;
const PATH_MAP = {
  DOC_SIDE_BAR_CONFIG: './docs/.vuepress/sidebar/sidebar.json',
  DOC_SIDE_BAR_EN_CONFIG: './docs/.vuepress/sidebar/sidebar-en.json',
  DEMO_INDEX_CONFIG: 'src/pages/index/page-config.json',
  DEMO_PAGES_JSON: './src/pages.json',
  DEMO_I18N: 'src/utils/i18n/title-i18n.json',
  BUILD_CONFIG: 'config/components.json',
  SRC_INDEX: 'src/index.js',
};


function getCompUrl(name) {
  const newName = hyphenate(name);
  const prefix = getActPageDir(newName);
  return `/${prefix}/${newName}/${newName}`;
}

function saveJsonToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {
    encoding: 'utf-8',
  });
}


function getCompDemoPages() {
  const list = Object.keys(componentConfig)
    .map((key) => {
      const value = componentConfig[key];
      const { name, list } = value;
      const newList = list.map(item => ({
        // name: `${item.name} ${item.title}`,
        url: getCompUrl(item.name),
        navigationStyle: item?.style?.navigationStyle || '',
      }));

      return {
        name,
        list: newList,
      };
    })
    .filter(item => item.list.length);


  return { pages: list };
}


function getSidebarConfig(isEn) {
  const BASE_KEYS = [
    'basic',
    'form',
    'action',
    'display',
    'navigation',
    'e-sport',
  ];
  const keys = DEPLOY_CONFIG.ONLY_BASE_COMPONENTS ? BASE_KEYS : Object.keys(componentConfig);
  const list = keys
    .map((key) => {
      const value = componentConfig[key];
      const { title, name, list } = value;
      const newList = list.map(item => (isEn ? {
        title: item.name,
        path: `/en/components/press/press-${hyphenate(item.name)}.md`,
      } : {
        title: item.name,
        subTitle: item.title,
        path: `/components/press/press-${hyphenate(item.name)}.md`,
      }));

      return {
        title: isEn ? name : title,
        collapsable: false,
        children: newList,
      };
    })
    .filter(item => item.children.length);

  return { sidebar: list };
}

function getPagesJsonPages(config, keys) {
  const list = keys
    .map((key) => {
      const value = config[key] || {};
      const { list = [] } = value;
      const newList = list.map((item) => {
        const hyphenatedName = hyphenate(item.name);

        return {
          path: `${hyphenatedName}/${hyphenatedName}`,
          style: {
            ...(item.style || {}),
            navigationBarTitleText: '',
          },
        };
      });

      return newList;
    })
    .flat();

  return list;
}

// const getComponentNameFromPath = item => item.path.split('/')[0];

// function getActDetailPages(pages) {
//   return pages.filter(item => ACT_DETAIL_COMPONENTS.includes(getComponentNameFromPath(item)));
// }

// function getNotActDetailPages(pages) {
//   return pages.filter(item => !ACT_DETAIL_COMPONENTS.includes(getComponentNameFromPath(item)));
// }

function getPagesJsonConfig() {
  const keys = Object.keys(componentConfig);
  const pressSubPackages = getPagesJsonPages(componentConfig, keys.filter(item => item !== 'act'));
  // const actSubPackages = getPagesJsonPages(componentConfig, ['act']);

  const pressPages = [
    {
      root: 'pages/press',
      pages: pressSubPackages,
    },
    // {
    //   root: 'pages/act',
    //   pages: getNotActDetailPages(actSubPackages),
    // },
    // {
    //   root: 'pages/act-detail',
    //   pages: getActDetailPages(actSubPackages),
    // },
  ];
  return pressPages;
}

function getTitleI18nConfig() {
  const res = {
    'zh-CN': {},
    'en-US': {},
  };
  Object.keys(componentConfig)
    .forEach((key) => {
      const value = componentConfig[key];
      const { list, name, title } = value;

      res['zh-CN'][name] = title;
      res['en-US'][name] = name;

      list.forEach((item) => {
        const hyphenatedName = hyphenate(item.name);
        res['zh-CN'][hyphenatedName] = `${item.name} ${item.title}`;
        res['en-US'][hyphenatedName] = `${item.name}`;
      });
    });

  return res;
}

function writeDemoIndexConfig() {
  const pages = getCompDemoPages();
  saveJsonToFile(PATH_MAP.DEMO_INDEX_CONFIG, pages);
}

function writeDocSidebar() {
  const sidebarConfig = getSidebarConfig();
  const sidebarEnConfig = getSidebarConfig(true);

  mkDirsSync(path.dirname(PATH_MAP.DOC_SIDE_BAR_CONFIG));
  saveJsonToFile(PATH_MAP.DOC_SIDE_BAR_CONFIG, sidebarConfig);
  saveJsonToFile(PATH_MAP.DOC_SIDE_BAR_EN_CONFIG, sidebarEnConfig);
}


function writeDemoPagesJson() {
  const pagesJsonConfig = getPagesJsonConfig();
  const configPath = path.resolve(process.cwd(), PATH_MAP.DEMO_PAGES_JSON);
  const data = fs.readFileSync(configPath, {
    encoding: 'utf-8',
  });
  const newData = data.replace(/"subPackages":\s*\[[\s\S]+(?="preloadRule)/m, `"subPackages": ${JSON.stringify(pagesJsonConfig, null, 2)},
  `);


  // const json = require(configPath);
  // json.subPackages = [
  //   // json.subPackages[DEMO_PAGES_JSON_LAST_INDEX],
  //   ...pagesJsonConfig,
  // ];
  // saveJsonToFile(configPath, newData);

  fs.writeFileSync(configPath, newData, {
    encoding: 'utf-8',
  });
}

function writeDemoTitleI18n() {
  const title = getTitleI18nConfig();

  saveJsonToFile(PATH_MAP.DEMO_I18N, title);
}


function getBuildConfigJson() {
  const res = {};
  Object.keys(componentConfig)
    .forEach((key) => {
      const value = componentConfig[key];
      const { list } = value;


      list.forEach((item) => {
        const hyphenatedName = hyphenate(item.name);
        const compPath = getComponentPath(hyphenatedName);
        res[hyphenatedName] = `./src/packages/press-${hyphenatedName}/press-${compPath}.vue`;
      });
    });
  return res;
}


function writeBuildConfig() {
  const json = getBuildConfigJson();
  saveJsonToFile(PATH_MAP.BUILD_CONFIG, json);
}

function main() {
  writeDocSidebar();
  writeDemoIndexConfig();
  writeDemoPagesJson();
  writeDemoTitleI18n();
  writeBuildConfig();
  writeSrcIndexJs(componentConfig, PATH_MAP.SRC_INDEX, true);
}

main();
