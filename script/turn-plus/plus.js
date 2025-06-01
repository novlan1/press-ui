const { replaceContent, randomString, pascalCase, execCommand } = require('t-comm');

const { batchRenameSync } = require('./rename');

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
  // const prefixList = ['/', '\'', '"'];
  // const postfixList = ['/', '\'', '"'];
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
    // for (const postfix of postfixList) {
    //   list.push([`${plusKey}${postfix}`, `${tempKey}${postfix}`]);
    //   list2.push([`${key}${postfix}`, `${plusKey}${postfix}`]);
    //   list3.push([`${tempKey}${postfix}`, `${key}${postfix}`]);
    // }
    list.push([pascalCase(plusKey), tempKey2]);
    list2.push([pascalCase(key), pascalCase(plusKey)]);
    list3.push([tempKey2, pascalCase(key)]);
  }

  const classPrefixList = [
    ['\\.', ' '],
    ['\\.', ','],
    ['\\.', '-'], // press-icon-plus-* 一堆图标的类名

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
  targetProject: process.cwd(),
  renameRoot: 'src/packages',
  ...getRenameConfig(rawList),

  replaceList: [
    ...getReplaceList(rawList, ['src']),
    {
      list: [
        ['press-icon-plus-music', 'press-icon-music'],
      ],
      dirList: [
        'src/packages/press-icon-music/css/index.scss',
      ],
    },
    {
      list: [
        ['press-picker-plus-popup-plus', 'abcdPickerAPopupD'],
        ['press-picker-popup', 'press-picker-plus-popup-plus'],
        ['abcdPickerAPopupD', 'press-picker-popup'],
        ['PressPickerPlusPopupPlus', 'PressPickerPopup'],
      ],
      dirList: [
        'src',
      ],
    },
    // {
    //   list: [
    //     ['press-icon', 'press-icon-plus'],
    //     ['PressIcon', 'PressIconPlus'],
    //   ],
    //   dirList: [
    //     'src',
    //   ],
    // },
    // {
    //   list: [
    //     ['IIIConPlusTemp', 'press-icon'],
    //     ['IIIPressConPlusTemp', 'PressIcon'],
    //   ],
    //   dirList: [
    //     'src',
    //   ],
    // },
  ],
};

function replaceImport() {
  replaceContent({
    replaceList: config.replaceList,
    targetProject: config.targetProject,
  });
}

function replaceMetaConfig() {
  replaceContent({
    replaceList: getMetaConfigReplaceList(rawList, ['config/component-config.json', 'src/']),
    targetProject: config.targetProject,
  });

  execCommand('npm run init', process.cwd(), 'inherit');
}

function main() {
  execCommand('git clean -df', process.cwd(), 'inherit');
  batchRenameSync(config.renameRoot, config.renameConfig);
  batchRenameSync(config.renameRoot, config.renameConfig2);
  batchRenameSync(config.renameRoot, config.renameConfig3);
  batchRenameSync(config.renameRoot, {
    'press-picker-plus-popup-plus': 'press-picker-popup',
  });
  replaceImport();
  replaceMetaConfig();
}

main();
