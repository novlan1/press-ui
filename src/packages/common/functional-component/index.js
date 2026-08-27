import { setData } from '../component-handler/set-data';
import { isNotInUni } from '../utils/utils';

const DEFAULT_SHOW_FUNCTION = 'showDialog';

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


function traverseChildren(context, key, target) {
  // #ifdef H5
  const children = context.$children;
  if (!children) {
    return;
  }

  for (const child of children) {
    if (child.$attrs[key] === target) {
      return child;
    }
  }

  for (const child of children) {
    const result = traverseChildren(child, key, target);
    if (result) {
      return result;
    }
  }
  // #endif
}


/**
 * 按 id / class 属性在组件树里查找子组件实例（不依赖平台 API）。
 *
 * 用途：APP 端既没有小程序的 selectComponent，也没有 $selectComponent，
 * 一旦调用方只写了 id 而漏写同名 ref，selectComponent 就会返回 undefined，
 * 表现为「未找到 press-notify 节点」且弹窗类组件完全不出现。
 * 这里做兜底遍历，让 id 单独存在时也能工作。
 *
 * 与上方 traverseChildren 的区别：该函数被 #ifdef H5 包裹只在 H5 生效，
 * 且依赖 $attrs；此处额外兼容 props 与 vue3 的 $el.id。
 */
function traverseByAttr(context, key, target, depth = 0) {
  if (!context || depth > 20) return null;

  const children = context.$children || [];
  for (const child of children) {
    const attrs = child.$attrs || {};
    const props = child.$props || {};
    if (attrs[key] === target || props[key] === target) {
      return child;
    }
    // vue3 下 id 可能已落到真实元素上
    if (key === 'id' && child.$el && child.$el.id === target) {
      return child;
    }
  }

  for (const child of children) {
    const found = traverseByAttr(child, key, target, depth + 1);
    if (found) return found;
  }

  return null;
}


export function selectComponent(context, selector) {
  if (!selector || !context) return;

  if (typeof selector === 'function') {
    return selector(context);
  }

  let attribute = selector;
  if (attribute.match(/^[^\w]/)) {
    attribute = attribute.slice(1);
  }

  if (
    context.$refs && context.$refs[attribute]) {
    return context.$refs[attribute];
  }

  // #ifdef H5
  if (isNotInUni()) {
    const key = selector.startsWith('#') ? 'id' : 'class';
    const res = traverseChildren(context, key, attribute);
    if (res) {
      return res;
    }
  }
  // #endif

  if (context && typeof context.$selectComponent === 'function') {
    const res =  context.$selectComponent(selector);
    if (res) return res;
  }

  if (context && context.selectComponent) {
    const res = context.selectComponent(selector);
    if (res) return res;
  }

  // 兜底：APP 端无 selectComponent / $selectComponent，
  // 且调用方可能只写了 id 没写 ref，此时遍历组件树查找。
  const key = selector.startsWith('.') ? 'class' : 'id';
  return traverseByAttr(context, key, attribute);
}


export function showFunctionalComponent(options) {
  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    let { dialog } = options;
    if (!dialog) {
      dialog = selectComponent(context, options.selector);
    }

    const newOptions = {
      callback: (action,  args) => {
        action === 'confirm' ? resolve(args) : reject(args);
      },
      ...options,
    };
    delete newOptions.dialog;
    delete newOptions.context;
    const showFunction = options.showFunction || DEFAULT_SHOW_FUNCTION;

    setData(dialog, newOptions, showFunction);
  });
}
