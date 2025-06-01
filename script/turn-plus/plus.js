const { replaceContentSimple } = require('@tencent/t-comm');
const { randomString, pascalCase, execCommand } = require('t-comm');

const { CONFIG } = require('./config');
const { batchRenameSync } = require('./rename');

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

function getRenameConfig(rawList) {
  const renameConfig = {};
  const renameConfig2 = {};
  const renameConfig3 = {};
  for (const item of rawList) {
    const plusKey = `press-${item}-plus`;
    const key = `press-${item}`;
    const tempKey = randomString(6);
    renameConfig[plusKey] = tempKey;
    renameConfig2[key] = plusKey;
    renameConfig3[tempKey] = key;
  }
  return {
    renameConfig,
    renameConfig2,
    renameConfig3,
  };
}


function getMetaConfigReplaceList(rawList, dirList) {
  const list = [];
  const list2 = [];
  const list3 = [];
  for (const item of rawList) {
    const plusKey = `${item}-plus`;
    const key = `${item}`;
    const tempKey = randomString(6);
    const preAndPostfixList = [
      ['"', '"'],
      [' ', ' '],
    ];
    for (const prefix of preAndPostfixList) {
      list.push([`${prefix[0]}${pascalCase(plusKey)}${prefix[1]}`, `${prefix[0]}${tempKey}${prefix[1]}`]);
      list2.push([`${prefix[0]}${pascalCase(key)}${prefix[1]}`, `${prefix[0]}${pascalCase(plusKey)}${prefix[1]}`]);
      list3.push([`${prefix[0]}${tempKey}${prefix[1]}`, `${prefix[0]}${pascalCase(key)}${prefix[1]}`]);
    }
  }
  return [
    { list, dirList },
    { list: list2, dirList },
    { list: list3, dirList },
  ];
}

function getReplaceList(rawList, dirList) {
  const list = [];
  const list2 = [];
  const list3 = [];
  const preAndPostfixList = [
    ['/', '/'],
    ['/', '\''],
    ['/', '"'],
    ['/', '.vue'], // 文件引入
    ['<', ''],
    ['</', '>'],
  ];
  for (const item of rawList) {
    const plusKey = `press-${item}-plus`;
    const key = `press-${item}`;
    const tempKey = randomString(6);
    const tempKey2 = randomString(6);

    for (const prefix of preAndPostfixList) {
      list.push([`${prefix[0]}${plusKey}${prefix[1]}`, `${prefix[0]}${tempKey}${prefix[1]}`]);
      list2.push([`${prefix[0]}${key}${prefix[1]}`, `${prefix[0]}${plusKey}${prefix[1]}`]);
      list3.push([`${prefix[0]}${tempKey}${prefix[1]}`, `${prefix[0]}${key}${prefix[1]}`]);
    }
    list.push([pascalCase(plusKey), tempKey2]);
    list2.push([pascalCase(key), pascalCase(plusKey)]);
    list3.push([tempKey2, pascalCase(key)]);
  }

  const classPrefixList = [
    [`.`, ' '],
    [`.`, ','],
    ['.', '-'], // press-icon-plus-* 一堆图标的类名

    ['', ';'], // press-icon font-family

    ['', '__'], // press-icon_info
    ['', '--'],

    ['\'', '\''], // press-icon-plus (iconPrefix)
  ];
  // press-icon-plus 类名

  for (const item of needClassReplaceList) {
    const plusKey = `press-${item}-plus`;
    const key = `press-${item}`;
    const tempKey = randomString(6);

    for (const prefix of classPrefixList) {
      list.push([`${prefix[0]}${plusKey}${prefix[1]}`, `${prefix[0]}${tempKey}${prefix[1]}`]);
      list2.push([`${prefix[0]}${key}${prefix[1]}`, `${prefix[0]}${plusKey}${prefix[1]}`]);
      list3.push([`${prefix[0]}${tempKey}${prefix[1]}`, `${prefix[0]}${key}${prefix[1]}`]);
    }
  }

  return [
    { list, dirList },
    { list: list2, dirList },
    { list: list3, dirList },
  ];
}

const config = {
  targetProject: CONFIG.targetProject,
  renameRoot: 'src/packages',
  ...getRenameConfig(rawList),

  replaceList: [
    ...getReplaceList(rawList, [ALL_FILE]),
    {
      list: [
        ['press-icon-plus-music', 'press-icon-music'],
      ],
      dirList: ['src/packages/press-icon-music/css/index.scss'],
    },
    {
      list: [
        ['press-picker-plus-popup-plus', 'abcdPickerAPopupD'],
        ['press-picker-popup', 'press-picker-plus-popup-plus'],
        ['abcdPickerAPopupD', 'press-picker-popup'],
        ['PressPickerPlusPopupPlus', 'PressPickerPopup'],
      ],
      dirList: [ALL_FILE],

    },

  ],
};

function replaceImport() {
  replaceContentSimple({
    replaceList: config.replaceList,
  });
}

function replaceMetaConfig() {
  replaceContentSimple({
    replaceList: getMetaConfigReplaceList(rawList, ['config/component-config.json', ALL_FILE]),
  });

  execCommand('npm run init', process.cwd(), 'inherit');
}

function main() {
  execCommand('rm -rf src/packages/press-icon/press-icon-music.vue', process.cwd(), 'inherit');
  batchRenameSync(config.renameRoot, config.renameConfig);
  batchRenameSync(config.renameRoot, config.renameConfig2);
  batchRenameSync(config.renameRoot, config.renameConfig3);
  batchRenameSync(config.renameRoot, {
    'press-picker-plus-popup-plus': 'press-picker-popup',
  });
  replaceImport();
  replaceMetaConfig();

  replaceContentSimple({
    replaceList: [
      {
        list: [
          ['DialogPlus', 'Dialog'],
        ],
        dirList: 'src/packages/press-dialog*/handler.js',
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
    ],
  });
}

main();
