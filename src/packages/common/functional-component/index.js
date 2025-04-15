import { isNotInUni } from '../utils/utils';
import { setData } from '../component-handler/set-data';

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
    return res;
  }

  return context && context.selectComponent && context.selectComponent(selector);
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
