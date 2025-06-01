// #ifdef H5
import { initH5Instance } from '../common/component-handler/h5-handler';
// #endif

import { setData } from '../common/component-handler/set-data';
import { selectComponent } from '../common/functional-component';
import { nextTick } from '../common/vue3/adapter';
import { t } from '../locale';

import { addFunctionForDialog } from './handler-helper';

// #ifdef H5
import VueDialog from './press-dialog.vue';
// #endif


let queue = [];

const defaultOptions = {
  selector: '#press-dialog',
  show: false,
  title: '',
  message: '',

  className: '',
  customStyle: '',

  asyncClose: false,
  beforeClose: null,

  theme: 'default',
  messageAlign: '',
  width: null,
  zIndex: 100,

  overlay: true,
  overlayStyle: '',
  transition: 'scale',

  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: t('confirm'),
  cancelButtonText: t('cancel'),

  closeOnClickOverlay: false,
  confirmButtonOpenType: '',
};
let currentOptions = Object.assign({}, defaultOptions);


function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


const Dialog = (options) => {
  options = Object.assign(Object.assign({}, currentOptions), options);
  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    let dialog = selectComponent(context, options.selector);

    delete options.context;
    delete options.selector;

    // #ifdef H5
    if (!dialog) {
      dialog = initH5Instance(VueDialog, 'press-dialog');
    }
    // #endif

    if (dialog) {
      const callback = (action, instance) => {
        action === 'confirm' ? resolve(instance) : reject(instance);
      };
      const newOptions = {
        ...options,
      };

      setData(dialog, newOptions);
      dialog.callback = callback;
      // Vue3 小程序下挂载 callback
      if (dialog.$vm) {
        dialog.$vm.callback = callback;
      }

      nextTick(() => {
        setData(dialog, { show: true });
      });
      queue.push(dialog);
    } else {
      console.warn('The press-dialog node is not found, please confirm whether the selector and context are correct');
    }
  });
};

function updateQueue(arg) {
  queue = arg;
}

function updateCurrentOptions(arg) {
  currentOptions = arg;
}

addFunctionForDialog({
  Dialog,
  queue,
  currentOptions,
  defaultOptions,
  updateQueue,
  updateCurrentOptions,
});
export default Dialog;


export const showDialog = Dialog.alert;
export const showConfirmDialog = Dialog.confirm;
export const closeDialog = Dialog.close;
export const setDialogDefaultOptions = Dialog.setDefaultOptions;
export const resetDialogDefaultOptions = Dialog.resetDefaultOptions;
export const stopDialogLoading = Dialog.stopLoading;
