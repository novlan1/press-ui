import { parseOptions } from './component-handler';

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export function getMPComponentHandler({
  defaultOptions,
  name = 'press-toast',
  defaultKey = 'message',
}) {
  let queue = [];
  let currentOptions = { ...defaultOptions };
  let defaultOptionsMap = {};

  function CompHandler(toastOptions) {
    let options = parseOptions(toastOptions, defaultKey);

    options = {
      ...currentOptions,
      ...defaultOptionsMap[options.type || currentOptions.type],
      ...options,
    };

    CompHandler.getOptions = () => options;

    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);

    if (!dialog) {
      console.warn(`未找到 ${name} 节点，请确认 selector 及 context 是否正确`);
      return;
    }

    delete options.context;
    delete options.selector;

    // 设置clear
    dialog.clear = () => {
      dialog.$vm.setData({ show: false });
      if (options.onClose) {
        options.onClose();
      }
    };

    // 为了让h5和小程序的函数调用一样
    dialog.set = (...args) => {
      dialog.$vm.$set(dialog.$vm, ...args);
    };

    queue.push(dialog);
    // 开始展示
    dialog.$vm.setData(options);

    clearTimeout(dialog.timer);

    if (options.duration != null && options.duration > 0) {
      dialog.timer = setTimeout(() => {
        dialog.clear();
        queue = queue.filter(item => item !== dialog);
      }, options.duration);
    }
    return dialog;
  }


  CompHandler.clear = () => {
    queue.forEach((dialog) => {
      dialog.clear();
    });
    queue = [];
  };
  CompHandler.setDefaultOptions = (type, options) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = options;
    } else {
      Object.assign(currentOptions, type);
    }
  };
  CompHandler.resetDefaultOptions = (type) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = null;
    } else {
      currentOptions = { ...defaultOptions };
      defaultOptionsMap = {};
    }
  };

  CompHandler.install = () => {
    // Vue.use(CompHandler);
  };

  return CompHandler;
}
