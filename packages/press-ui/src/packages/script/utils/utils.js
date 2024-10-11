const fs = require('fs');
const { hyphenate } = require('t-comm');

const COMP_PREFIX = 'press-';

const ACT_GOODS_LIST_COMPONENTS = [
  'act-input-q-q',
  'act-select-award',
  'act-store-item',
  'act-benefit-item',
  'act-goods-list',
  'act-goods-item',
  'act-goods-tab',
  'act-merchant-item',
];
const DEMO_DIR_MAP = {
  PRESS: 'press',
  ACT: 'act',
  ACT_DETAIL: 'act-detail',
  ACT_LIST: 'act-list',
};

const ACT_TYPES = [
  'act',
  'exchange',
  'goods',
  'goods-list',
];

// function getFullCompName(name) {
//   name = hyphenate(name);
//   if (!name.startsWith(COMP_PREFIX)) {
//     return `${COMP_PREFIX}${name}`;
//   }
//   return name;
// }


// function getPureCompName(name) {
//   name = hyphenate(name);
//   return name.replace(new RegExp(`^${COMP_PREFIX}`), '');
// }

const isActComponent = component => component.startsWith('press-act-') || component.startsWith('act-');


function getActPageDir(component) {
  if (!isActComponent(component)) {
    return DEMO_DIR_MAP.PRESS;
  }

  if (isActDetailComponent(component)) {
    return DEMO_DIR_MAP.ACT_DETAIL;
  }

  if (isActGoodsListComponent(component)) {
    return DEMO_DIR_MAP.ACT_LIST;
  }

  return DEMO_DIR_MAP.ACT;
}

/**
 * goods detail 组件是根据前缀判断的
 */
function isActDetailComponent(component) {
  component = component.replace(/^press-/, '');

  if (component.startsWith('act-goods-detail')
  ) {
    return true;
  }
  return false;
}

/**
 * goods list 组件是枚举的
 */
function isActGoodsListComponent(component) {
  component = component.replace(/^press-/, '');

  if (ACT_GOODS_LIST_COMPONENTS.includes(component)) {
    return true;
  }
  return false;
}


const IS_INNER_DOCS = fs.existsSync('./docs/docs/.vuepress/config.js');


module.exports = {
  hyphenate,
  // getFullCompName,
  // getPureCompName,
  isActComponent,
  isActDetailComponent,
  isActGoodsListComponent,
  getActPageDir,
  COMP_PREFIX,
  ACT_TYPES,
  DEMO_DIR_MAP,
  IS_INNER_DOCS,
};
