import { isNotInUni } from '../utils/utils';
const DEFAULT_SHOW_FUNCTION = 'showDialog';

function getContext() {
  // @ts-ignore
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function traverseChildren(context, key, target) {
  const children = context.$children;
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
}

export function selectComponent(context, selector) {
  let attribute = selector;
  if (attribute.match(/^[^\w]/)) {
    attribute = attribute.slice(1);
  }

  // #ifdef H5
  if (isNotInUni()) {
    const key = selector.startsWith('#') ? 'id' : 'class';
    return traverseChildren(context, key, attribute);
  }
  // #endif

  if (!context.$children && context.$refs?.[attribute]) {
    return context.$refs[attribute];
  }

  return context?.selectComponent?.(selector);
}

export function showFunctionalComponent(options: {
  context?: any;
  selector: string;
  showFunction?: string;
  [k: string]: any;
}) {
  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    // context.selectComponent(options.selector);
    const dialog = selectComponent(context, options.selector);

    const newOptions = {
      callback: (action: string,  args: unknown) => {
        action === 'confirm' ? resolve(args) : reject(args);
      },
      ...options,
    };
    delete newOptions.context;
    const showFunction = options.showFunction || DEFAULT_SHOW_FUNCTION;

    // #ifdef H5
    dialog[showFunction](newOptions);
    // #endif
    // #ifndef H5
    dialog.$vm[showFunction](newOptions);
    // #endif
  });
}
