const { hyphenate } = require('t-comm');

const COMP_PREFIX = 'press-';

const ACT_DETAIL_COMPONENTS = [
  'act-input-q-q',
  'act-select-award',
  'act-store-item',
  'act-benefit-item',
];
const DEMO_DIR_MAP = {
  PRESS: 'press',
  ACT: 'act',
  ACT_DETAIL: 'act-detail',
};


function getFullCompName(name) {
  name = hyphenate(name);
  if (!name.startsWith(COMP_PREFIX)) {
    return `${COMP_PREFIX}${name}`;
  }
  return name;
}


function getPureCompName(name) {
  name = hyphenate(name);
  return name.replace(new RegExp(`^${COMP_PREFIX}`), '');
}

const isActComponent = component => component.startsWith('press-act-') || component.startsWith('act-');


function getActPageDir(component) {
  if (!isActComponent(component)) {
    return DEMO_DIR_MAP.PRESS;
  }
  component = component.replace(/^press-/, '');

  if (ACT_DETAIL_COMPONENTS.includes(component)) {
    return DEMO_DIR_MAP.ACT_DETAIL;
  }

  return DEMO_DIR_MAP.ACT;
}


module.exports = {
  ACT_DETAIL_COMPONENTS,
  hyphenate,
  getFullCompName,
  getPureCompName,
  isActComponent,
  getActPageDir,
};
