import { parseOptions } from './component-handler';
import { setData, vmSet } from './set-data';

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


export function getMPComponentHandler({
  defaultOptions,
  name = 'press-toast',
  defaultKey = 'message',
}: any) {
  let queue: Array<any> = [];
  let currentOptions = { ...defaultOptions };
  let defaultOptionsMap: Record<string, any> = {};

  function CompHandler(toastOptions: any) {
    let options = parseOptions(toastOptions, defaultKey);

    options = {
      ...currentOptions,
      ...defaultOptionsMap[options.type || currentOptions.type],
      ...options,
    };

    (CompHandler as any).getOptions = () => options;

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
      setData(dialog, { show: false });
      if (options.onClose) {
        options.onClose();
      }
    };

    // 为了让h5和小程序的函数调用一样
    dialog.set = (...args: Array<any>) => {
      vmSet(dialog, ...args);
    };

    queue.push(dialog);
    // 开始展示
    setData(dialog, options);

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
  CompHandler.setDefaultOptions = (type: any, options: any) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = options;
    } else {
      Object.assign(currentOptions, type);
    }
  };
  CompHandler.resetDefaultOptions = (type: any) => {
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
