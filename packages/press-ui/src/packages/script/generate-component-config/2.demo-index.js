const {
  DEMO_DIR_MAP,
} = require('../utils/utils');
const {
  hyphenate,
} = require('./generate-entry');
const { PATH_MAP, saveJsonToFile } = require('./helper');


function writeDemoIndexConfig(componentConfig) {
  const pages = getCompDemoPages(componentConfig);
  saveJsonToFile(PATH_MAP.DEMO_INDEX_CONFIG, pages);
}


function getCompDemoPages(componentConfig) {
  const list = Object.keys(componentConfig)
    .map((key) => {
      const value = componentConfig[key];
      const { name, list } = value;
      const newList = list.map(item => ({
        // name: `${item.name} ${item.title}`,
        url: getCompUrl(item),
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


function getCompUrl(comp) {
  const { name, demoRedirect, subPackage = DEMO_DIR_MAP.PRESS } = comp;

  const demoName = demoRedirect || name;
  const newName = hyphenate(demoName);
  const prefix = subPackage;
  const corePage = `/${prefix}/${newName}/${newName}`;
  if (demoRedirect) {
    return `${corePage}?comp=${hyphenate(name)}`;
  }
  return corePage;
}

module.exports = {
  writeDemoIndexConfig,
};
