const path = require('path');
const { mkDirsSync, hyphenate } = require('t-comm');
const { PATH_MAP, saveJsonToFile } = require('./helper');


function writeDocSidebar(componentConfig) {
  const sidebarConfig = getSidebarConfig(false, componentConfig);
  const sidebarEnConfig = getSidebarConfig(true, componentConfig);

  mkDirsSync(path.dirname(PATH_MAP.DOC_SIDE_BAR_CONFIG));
  saveJsonToFile(PATH_MAP.DOC_SIDE_BAR_CONFIG, sidebarConfig);
  saveJsonToFile(PATH_MAP.DOC_SIDE_BAR_EN_CONFIG, sidebarEnConfig);
}


function getSidebarConfig(isEn, componentConfig) {
  const keys = Object.keys(componentConfig);
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


module.exports = {
  writeDocSidebar,
};
