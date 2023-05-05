import Vue from 'vue';
import { isServer } from '../utils/validator';
import { parseOptions } from './component-handler';


function isInDocument(element) {
  return document.body.contains(element);
}


export function getH5ComponentHandler({
  defaultOptions,
  component,
}) {
  let defaultOptionsMap = {};

  let queue = [];
  let multiple = false;
  let currentOptions = {
    ...defaultOptions,
  };
  const dialogId = defaultOptions.selector?.slice(1) || 'component-default-id';

  function createInstance({
    multiple,
    component,
    dialogId,
  }) {
    if (isServer) {
      return {};
    }
    queue = queue.filter(item => !item.$el.parentNode || isInDocument(item.$el));

    if (!queue.length || multiple) {
      // const dialogId = 'press-toast';
      const oldDialog = document.getElementById(dialogId);
      if (oldDialog) {
        document.body.removeChild(oldDialog);
      }
      const dialogRootDiv = document.createElement('div');
      dialogRootDiv.id = dialogId;

      document.body.appendChild(dialogRootDiv);

      const dialog = new (Vue.extend(component))({
        el: dialogRootDiv,
      });

      dialog.$on('input', (value) => {
        dialog.value = value;
      });

      queue.push(dialog);
    }

    return queue[queue.length - 1];
  }

  function Dialog(options = {}) {
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

    Dialog.getOptions = () => options;

    dialog.clear = () => {
      dialog.setData({ show: false });
      if (options.onClose) {
        options.onClose();
      }
      queue = queue.filter(item => item !== dialog);

      setTimeout(() => {
        if (document.body.contains(dialog.$el)) {
          document.body.removeChild(dialog.$el);
        }
      }, options.animationDuration || 0);
    };

    dialog.set = (...args) => {
      dialog.$set(dialog, ...args);
    };

    Object.assign(dialog, options);
    clearTimeout(dialog.timer);
    dialog.setData({ show: true });

    if (options.duration > 0) {
      dialog.timer = setTimeout(() => {
        dialog.clear();
      }, options.duration);
    }

    return dialog;
  }

  Dialog.clear = (all) => {
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

  Dialog.setDefaultOptions = (type, options) => {
    if (typeof type === 'string') {
      defaultOptionsMap[type] = options;
    } else {
      Object.assign(currentOptions, type);
    }
  };

  Dialog.resetDefaultOptions = (type) => {
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
