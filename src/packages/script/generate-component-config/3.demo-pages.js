const fs = require('fs');
const path = require('path');

const {
  DEMO_DIR_MAP,
} = require('../utils/utils');

const {
  hyphenate,
} = require('./generate-entry');
const { PATH_MAP } = require('./helper');


function writeDemoPagesJson(componentConfig, needAct = false) {
  const pagesJsonConfig = getPagesJsonConfig(componentConfig, needAct);
  const configPath = path.resolve(process.cwd(), PATH_MAP.DEMO_PAGES_JSON);
  const data = fs.readFileSync(configPath, {
    encoding: 'utf-8',
  });
  const condition = getPagesJsonCondition(componentConfig);
  const newData = data
    .replace(/"subPackages":\s*\[[\s\S]+(?="preloadRule)/m, `"subPackages": ${JSON.stringify(pagesJsonConfig, null, 2)},
  `)
    .replace(/"condition":\s*\{[\s\S]+\]\s*\}/, `"condition": ${JSON.stringify(condition, null, 4)}`);


  fs.writeFileSync(configPath, newData, {
    encoding: 'utf-8',
  });
}


function getPagesJsonConfig(componentConfig) {
  let list = [];
  list = Object.values(DEMO_DIR_MAP).map(type => ({
    root: `pages/${type}`,
    pages: getPagesJsonPages(componentConfig, type),
  }));

  list = list.filter(item => item.pages.length);


  return list;
}


function getPagesJsonCondition(componentConfig) {
  const allList = Object.values(componentConfig).reduce((acc, item) => [
    ...acc,
    ...(item.list || []),
  ], [])
    .filter(item => !item.demoRedirect)
    .map(item => ({
      name: item.name,
      path: [
        'pages',
        item.subPackage || 'press',
        hyphenate(item.name),
        hyphenate(item.name),
      ].join('/'),
    }));
  return {
    current: 0,
    list: allList,
  };
}


function getPagesJsonPages(config, subPackage) {
  const list = Object.values(config)
    .map((item) => {
      const { list = [] } = item;
      const newList = list
        .filter(item => !item.demoRedirect)
        .filter(item => (item.subPackage || DEMO_DIR_MAP.PRESS) === subPackage)
        .map((item) => {
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


module.exports = {
  writeDemoPagesJson,
};
