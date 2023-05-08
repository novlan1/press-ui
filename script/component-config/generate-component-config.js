const fs = require('fs');
const path = require('path');
const { mkDirsSync } = require('t-comm');

const componentConfig = require('./component-config.json');


const DEMO_PAGES_JSON_LAST_INDEX = 0;
const PATH_MAP = {
  DOC_SIDE_BAR_CONFIG: './docs/.vuepress/sidebar/sidebar.json',
  DOC_SIDE_BAR_EN_CONFIG: './docs/.vuepress/sidebar/sidebar-en.json',
  DEMO_INDEX_CONFIG: 'src/pages/index/page-config.json',
  DEMO_PAGES_JSON: './src/pages.json',
  DEMO_I18N: 'src/utils/i18n/title-i18n.json',
};


function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

function getCompUrl(name) {
  const newName = hyphenate(name);
  return `/press/${newName}/${newName}`;
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
  const list = Object.keys(componentConfig)
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

function getPagesJsonConfig() {
  const list = Object.keys(componentConfig)
    .map((key) => {
      const value = componentConfig[key];
      const { list } = value;
      const newList = list.map((item) => {
        const hyphenatedName = hyphenate(item.name);

        return {
          root: `pages/press/${hyphenatedName}`,
          pages: [
            {
              path: hyphenatedName,
              style: {
                navigationBarTitleText: '',
              },
            },
          ],
        };
      });

      return newList;
    })
    .flat();

  return list;
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
  const json = require(configPath);
  json.subPackages = [
    json.subPackages[DEMO_PAGES_JSON_LAST_INDEX],
    ...pagesJsonConfig,
  ];
  saveJsonToFile(configPath, json);
}

function writeDemoTitleI18n() {
  const title = getTitleI18nConfig();

  saveJsonToFile(PATH_MAP.DEMO_I18N, title);
}

function main() {
  writeDocSidebar();
  writeDemoIndexConfig();
  writeDemoPagesJson();
  writeDemoTitleI18n();
}

main();
