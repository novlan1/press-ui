
const {
  hyphenate,
} = require('./generate-entry');
const { PATH_MAP, saveJsonToFile } = require('./helper');


function getTitleI18nConfig(componentConfig) {
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


function writeDemoTitleI18n(componentConfig) {
  const title = getTitleI18nConfig(componentConfig);

  saveJsonToFile(PATH_MAP.DEMO_I18N, title);
}


module.exports = {
  writeDemoTitleI18n,
};
