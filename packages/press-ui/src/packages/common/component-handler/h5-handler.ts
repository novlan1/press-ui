import { IS_SERVER } from '../utils/validator';
import { parseOptions } from './component-handler';
import { extendComponent } from '../vue3/adapter';


function isInDocument(element: Node | null) {
  return document.body.contains(element);
}


export function getH5ComponentHandler({
  defaultOptions,
  component,
}: {
  defaultOptions: Record<string, any>;
  component: any;
}) {
  let defaultOptionsMap: Record<string, any> = {};

  let queue: Array<any> = [];
  let multiple = false;
  let currentOptions = {
    ...defaultOptions,
  };
  const dialogId = defaultOptions.selector?.slice(1) || 'component-default-id';

  function createInstance({
    multiple,
    component,
    dialogId,
  }: {
    multiple?: boolean;
    component: any;
    dialogId: string;
  }) {
    if (IS_SERVER) {
      return {};
    }
    queue = queue.filter(item => !item.$el.parentNode || isInDocument(item.$el));

    if (!queue.length || multiple) {
      // const dialogId = 'press-toast';
      const oldDialog = document.getElementById(dialogId);
      if (oldDialog?.parentElement) {
        oldDialog.parentElement.removeChild(oldDialog);
      }
      const dialogRootDiv = document.createElement('div');
      dialogRootDiv.id = dialogId;

      document.body.appendChild(dialogRootDiv);

      const dialog = extendComponent(dialogRootDiv, component);

      dialog?.$on?.('input', (value: any) => {
        (dialog as any).value = value;
      });

      queue.push(dialog);
    }

    return queue[queue.length - 1];
  }

  function Dialog(options: {
    type?: string;
    onClose?: Function;
    animationDuration?: number;
    duration: number;
  } = {
    duration: 0,
  }) {
    const dialog = createInstance({
      multiple,
      component,
      dialogId,
    });

    options = parseOptions(options);
    options = {
      ...currentOptions,
      ...defaultOptionsMap[options.type || currentOptions.type],
      ...options,
    };

    (Dialog as any).getOptions = () => options;

    dialog.clear = () => {
      dialog.setData({ show: false });
      if (options.onClose) {
        options.onClose();
      }
      queue = queue.filter(item => item !== dialog);

      setTimeout(() => {
        if (document.body.contains(dialog.$el) && dialog.$el) {
          dialog.$el.parentNode.removeChild(dialog.$el);
          // document.body.removeChild(dialog.$el);
        }
      }, options.animationDuration || 0);
    };

    dialog.set = (...args: any[]) => {
      if (typeof dialog.$set === 'function') {
        dialog.$set(dialog, ...args);
      } else {
        // vue3 已废弃 $set
        dialog[args[0]] = args[1];
      }
    };

    dialog.setData(options);
    // vue3 不支持 Object.assign 的赋值方式
    // Object.assign(dialog, options);

    clearTimeout(dialog.timer);
    dialog.setData({ show: true });

    if (options.duration > 0) {
      dialog.timer = setTimeout(() => {
        dialog.clear();
      }, options.duration);
    }

    return dialog;
  }

  Dialog.clear = (all?: boolean) => {
    if (queue.length) {
      if (all) {
        queue.forEach((dialog) => {
          dialog.clear();
        });
        queue = [];
      } else if (!multiple) {
        queue[0].clear();
      } else {
        queue.shift().clear();
      }
    }
  };

  Dialog.setDefaultOptions = (type: any, options: Record<string, any>) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = options;
    } else {
      Object.assign(currentOptions, type);
    }
  };

  Dialog.resetDefaultOptions = (type: any) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = null;
    } else {
      currentOptions = { ...defaultOptions };
      defaultOptionsMap = {};
    }
  };

  Dialog.allowMultiple = (value = true) => {
    multiple = value;
  };

  Dialog.install = () => {
    // Vue.use(component);
  };

  return Dialog;
}

export function initH5Instance(vueDialog: any, id: string, options = {}) {
  const dialogId = id; // 'press-dialog';
  const oldDialog = document.getElementById(dialogId);
  if (oldDialog?.parentNode) {
    oldDialog.parentNode.removeChild(oldDialog);
  }
  const dialogRootDiv = document.createElement('div');
  dialogRootDiv.id = dialogId;

  document.body.appendChild(dialogRootDiv);

  const instance = extendComponent(dialogRootDiv, vueDialog, options);

  return instance;
}
