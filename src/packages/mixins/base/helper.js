import { camelize } from '../../common/format/string';

export function getTargetDataset(target) {
  let dataset = {};
  const vm = target.__vue__;
  function updateDataset(vm, force) {
    const { $attrs } = vm;
    for (const key in $attrs) {
      if (key.startsWith('data-')) {
        const newKey = camelize(key.substr(5).toLowerCase());
        const value = $attrs[key];
        dataset[newKey] = force ? value : dataset[newKey] || value;
      }
    }
  }
  if (vm) {
    let $child = vm;
    while ($child && $child.$el === target) {
      updateDataset($child);
      $child = $child.$children[0];
    }
    let { $parent } = vm;
    while ($parent && $parent.$el === target) {
      updateDataset($parent, true);
      $parent = $parent.$parent;
    }
  } else {
    dataset = Object.assign({}, target.dataset, target.__uniDataset);
  }
  return normalizeDataset(dataset);
}


export function normalizeDataset(dataset = {}) {
  // ios8.x,9.x Object.assign({},dataset) 始终返回 {}
  // http://ask.dcloud.net.cn/question/70246
  const result = JSON.parse(JSON.stringify(dataset));
  // if (__PLATFORM__ === 'h5') {
  const keys = Object.keys(result);
  const len = keys.length;
  if (len) {
    // remove data-v-
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      const len = key.length;
      if (key.substr(0, 1) === 'v' && (len === 9 || len === 10)) {
        delete result[key];
      }
    }
  }
  // }
  return result;
}
