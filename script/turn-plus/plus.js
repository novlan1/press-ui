/**
 * @description 将组件从 press-ui 转换为 press-plus 格式（重命名 + 内容替换）
 */
const fs = require('fs');

const glob = require('glob');
const { randomString, pascalCase, execCommand } = require('t-comm');

const { CONFIG } = require('./config');
const { batchRenameSync } = require('./rename');

const getPascalReg = value => new RegExp(`(?<=\\W)(${pascalCase(value)})(?=\\W)`, 'g');

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
  const iRawList = [
    ...rawList,
    'datetime-picker-popup'
  ];
  for (const item of iRawList) {
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
    // 会影响 press-icon 等文档的错误
    // ['`', '`'],
  ];
  // const pascalCasePrefixList = [
  //   // ['"', '"'],s
  //   [' ', ' '],
  //   [' ', ','], // components 声明
  //   ['</', '>'],
  //   ['<', '\n'],
  //   ['<', ' '],
  //   ['\'', '\''], // name 声明
  // ];
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

    list.push([getPascalReg(plusKey), pascalCase(tempKey2)]);
    list.push([getPascalReg(key), pascalCase(plusKey)]);
    list.push([getPascalReg(tempKey2), pascalCase(key)]);
    // for (const prefix of pascalCasePrefixList) {
    //   list.push([`${prefix[0]}${pascalCase(plusKey)}${prefix[1]}`, `${prefix[0]}${tempKey2}${prefix[1]}`]);
    //   list2.push([`${prefix[0]}${pascalCase(key)}${prefix[1]}`, `${prefix[0]}${pascalCase(plusKey)}${prefix[1]}`]);
    //   list3.push([`${prefix[0]}${tempKey2}${prefix[1]}`, `${prefix[0]}${pascalCase(key)}${prefix[1]}`]);
    // }
  }

  const classPrefixList = [
    ['.', ' '],
    ['.', ','],
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

const generatedReplaceList = getReplaceList(rawList, [ALL_FILE]);
console.log('generatedReplaceList', generatedReplaceList, JSON.stringify(generatedReplaceList, null, 2));

/**
 * 批量替换文件内容（性能优化版）
 * 将同 dirList 的规则合并，每个文件只读写一次
 */
function replaceContentBatch(replaceList) {
  // 按 dirList 分组，将相同 dirList 的规则合并
  const groupMap = new Map();

  for (const item of replaceList) {
    const { dirList, list } = item;
    if (!list || !list.length) continue;

    const newDir = Array.isArray(dirList) ? dirList : [dirList];
    const dirKey = JSON.stringify(newDir.sort());

    if (!groupMap.has(dirKey)) {
      groupMap.set(dirKey, { dirList: newDir, rules: [] });
    }
    groupMap.get(dirKey).rules.push(...list);
  }

  for (const [, { dirList, rules }] of groupMap) {
    const files = glob.sync(dirList);

    for (const file of files) {
      if (fs.statSync(file).isDirectory()) continue;

      let content = fs.readFileSync(file, 'utf-8');
      let changed = false;

      for (const [from, to] of rules) {
        const newContent = typeof from === 'string'
          ? content.replaceAll(from, to)
          : content.replace(from, to);

        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(file, content);
        console.log(`[Replace Content Batch]: 文件: ${file}`);
      }
    }
  }
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
  replaceContentBatch(config.replaceList);
}

function replaceMetaConfig() {
  replaceContentBatch(getMetaConfigReplaceList(rawList, ['config/component-config.json']));

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

  replaceContentBatch([
    {
      list: rawList.map(item => [`${pascalCase(item)}Plus`, pascalCase(item)]),
      dirList: [
        // 'src/packages/press-dialog*/handler.js',
        'src/packages/**/README.md',
        'src/packages/**/README.en-US.md',
        // 'src/packages/**/css/_var.scss',
        // 'src/packages/**/demo-data/index.ts',
        // 'src/packages/**/demo.vue',
        // 'src/utils/i18n/title-i18n.json',
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
