
const {
  hyphenate,
  getComponentPath,
} = require('./generate-entry');
const { PATH_MAP, saveJsonToFile } = require('./helper');


function getBuildConfigJson(componentConfig) {
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


function writeBuildConfig(componentConfig) {
  const json = getBuildConfigJson(componentConfig);
  saveJsonToFile(PATH_MAP.BUILD_CONFIG, json);
}

module.exports = {
  writeBuildConfig,
};
