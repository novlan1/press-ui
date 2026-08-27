/**
 * @description 将组件从 press-ui 转换为 press-plus 格式（重命名 + 内容替换）
 */
const {
  pascalCase,
  execCommand,
  getThreeStageRenameConfig,
  getMetaConfigPascalReplaceRules,
  getComponentContentReplaceRules,
  batchReplaceFileContent,
  batchRenameDirEntries,
} = require('t-comm');

const { CONFIG } = require('./config');

const ALL_FILE = 'src/**/*.{js,ts,vue,md,scss}';
const rawList = [
  'dialog',
  'icon',
  'loading',
  'picker',
  'popover',
  'popup',
];
const needClassReplaceList = [
  'icon',
];

const config = {
  targetProject: CONFIG.targetProject,
  renameRoot: 'src/packages',
  ...getThreeStageRenameConfig(rawList, ['datetime-picker-popup']),

  replaceList: [
    ...getComponentContentReplaceRules(rawList, [ALL_FILE], { needClassReplaceList }),
    {
      list: [
        ['press-icon-plus-music', 'press-icon-music'],
      ],
      dirList: ['src/packages/press-icon-music/css/index.scss'],
    },
    {
      list: [
        // 注意先替换长的，再替换短的
        ['press-picker-plus-popup-plus', 'V6AvnbHe6DPhb8'],
        ['press-picker-popup', 'press-picker-plus-popup-plus'],
        ['V6AvnbHe6DPhb8', 'press-picker-popup'],

        ['PressPickerPlusPopupPlus', 'PressPickerPopup'],

        ['press-datetime-picker-popup-plus', 'GQAe02CG1ZVeA'],
        ['press-datetime-picker-popup', 'press-datetime-picker-popup-plus'],
        ['GQAe02CG1ZVeA', 'press-datetime-picker-popup'],

        ['PressDatetimePickerPopupPlus', 'jffUY8OEUpwwh9qF'],
        ['PressDatetimePickerPopup', 'PressDatetimePickerPopupPlus'],
        ['jffUY8OEUpwwh9qF', 'PressDatetimePickerPopup'],

        ['`press-popup-plus`', '`cSrpXXJT4jxv6E`'],
        ['`press-popup`', '`press-popup-plus`'],
        ['`cSrpXXJT4jxv6E`', '`press-popup`'],
      ],
      dirList: [ALL_FILE],
    },
  ],
};

function replaceImport() {
  batchReplaceFileContent(config.replaceList);
}

function replaceMetaConfig() {
  batchReplaceFileContent(getMetaConfigPascalReplaceRules(rawList, ['config/component-config.json']));

  execCommand('npm run init', process.cwd(), 'inherit');
}

function main() {
  execCommand('rm -rf src/packages/press-icon/press-icon-music.vue', process.cwd(), 'inherit');
  batchRenameDirEntries(config.renameRoot, config.renameConfig);
  batchRenameDirEntries(config.renameRoot, config.renameConfig2);
  batchRenameDirEntries(config.renameRoot, config.renameConfig3);
  batchRenameDirEntries(config.renameRoot, {
    'press-picker-plus-popup-plus': 'press-picker-popup',
  });
  replaceImport();
  replaceMetaConfig();

  batchReplaceFileContent([
    {
      list: rawList.map(item => [`${pascalCase(item)}Plus`, pascalCase(item)]),
      dirList: [
        'src/packages/**/README.md',
        'src/packages/**/README.en-US.md',
      ],
    },
    {
      list: [['pickerPlus', 'picker']],
      dirList: ['src/packages/common/constant/parent-map.js'],
    },
    {
      // 顶层类名
      list: [['press-popup-plus', 'press-popup__wrap']],
      dirList: ['src/packages/press-popup/press-popup.vue'],
    },
    {
      list: [['press-icon-plus-plus', 'press-icon']],
      dirList: ['src/packages/press-icon/css/index.scss'],
    },
  ]);
}

main();
