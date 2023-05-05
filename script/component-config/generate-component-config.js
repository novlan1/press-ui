const fs = require('fs');
const path = require('path');
const { mkDirsSync } = require('t-comm');

const COMP_TYPE_MAP = require('./component-config.json');
const DOC_SIDE_BAR_CONFIG_PATH = './docs/.vuepress/sidebar/sidebar.json';
const DOC_SIDE_BAR_EN_CONFIG_PATH = './docs/.vuepress/sidebar/sidebar-en.json';
const DEMO_INDEX_CONFIG_PATH = 'src/pages/index/page-config.json';
const DEMO_PAGES_JSON_PATH = './src/pages.json';
const DEMO_I18N_PATH = 'src/utils/i18n/title-i18n.json';
const DEMO_PAGES_JSON_LAST_INDEX = 0;


function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

function getCompUrl(name) {
  const newName = hyphenate(name);
  return `/press/${newName}/${newName}`;
}


function getCompDemoPages() {
  const list = Object.keys(COMP_TYPE_MAP)
    .map((key) => {
      const value = COMP_TYPE_MAP[key];
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
  const list = Object.keys(COMP_TYPE_MAP)
    .map((key) => {
      const value = COMP_TYPE_MAP[key];
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
  const list = Object.keys(COMP_TYPE_MAP)
    .map((key) => {
      const value = COMP_TYPE_MAP[key];
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
  // const list =
  Object.keys(COMP_TYPE_MAP)
    .forEach((key) => {
      const value = COMP_TYPE_MAP[key];
      const { list, name, title } = value;

      res['zh-CN'][name] = title;
      res['en-US'][name] = name;

      const newList = list.forEach((item) => {
        const hyphenatedName = hyphenate(item.name);
        res['zh-CN'][hyphenatedName] = `${item.name} ${item.title}`;
        res['en-US'][hyphenatedName] = `${item.name}`;
      });

      return newList;
    });
  // .flat();

  return res;
}

function writeDemoIndexConfig() {
  const pages = getCompDemoPages();
  fs.writeFileSync(DEMO_INDEX_CONFIG_PATH, JSON.stringify(pages, null, 2), {
    encoding: 'utf-8',
  });
}

function writeDocSidebar() {
  const sidebarConfig = getSidebarConfig();
  const sidebarEnConfig = getSidebarConfig(true);

  mkDirsSync(path.dirname(DOC_SIDE_BAR_CONFIG_PATH));

  fs.writeFileSync(DOC_SIDE_BAR_CONFIG_PATH, JSON.stringify(sidebarConfig, null, 2), {
    encoding: 'utf-8',
  });
  fs.writeFileSync(DOC_SIDE_BAR_EN_CONFIG_PATH, JSON.stringify(sidebarEnConfig, null, 2), {
    encoding: 'utf-8',
  });
}


function writeDemoPagesJson() {
  const pagesJsonConfig = getPagesJsonConfig();
  const configPath = path.resolve(process.cwd(), DEMO_PAGES_JSON_PATH);
  const json = require(configPath);
  json.subPackages = [
    json.subPackages[DEMO_PAGES_JSON_LAST_INDEX],
    ...pagesJsonConfig,
  ];
  fs.writeFileSync(configPath, JSON.stringify(json, null, 2), {
    encoding: 'utf-8',
  });
}

function writeDemoTitleI18n() {
  const title = getTitleI18nConfig();

  fs.writeFileSync(DEMO_I18N_PATH, JSON.stringify(title, null, 2), {
    encoding: 'utf-8',
  });
}

function main() {
  writeDemoIndexConfig();
  writeDocSidebar();
  writeDemoPagesJson();
  writeDemoTitleI18n();
}

main();
