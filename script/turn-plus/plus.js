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

    list.push([`"${pascalCase(plusKey)}`, tempKey]);
    list2.push([`"${pascalCase(key)}`, `"${pascalCase(plusKey)}`]);
    list3.push([tempKey, `"${pascalCase(key)}`]);
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
    ['/', '.vue'],
    ['\'', '\''], // press-icon-plus (iconPrefix)
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
    ['\\.', ''],
    ['', ';'],
    ['', '__'],
    ['', '--'],
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
    // {
    //   list: [
    //     ['press-icon-plus', 'IIIConPlusTemp'],
    //     ['PressIconPlus', 'IIIPressConPlusTemp'],
    //   ],
    //   dirList: [
    //     'src',
    //   ],
    // },
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
    replaceList: getMetaConfigReplaceList(rawList, ['config/component-config.json']),
    targetProject: config.targetProject,
  });

  execCommand('npm run init', process.cwd(), 'inherit');
}

function main() {
  replaceImport();
  batchRenameSync(config.renameRoot, config.renameConfig);
  batchRenameSync(config.renameRoot, config.renameConfig2);
  batchRenameSync(config.renameRoot, config.renameConfig3);
  replaceMetaConfig();
}

main();
