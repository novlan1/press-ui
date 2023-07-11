import Vue from 'vue';
import { t } from '../locale';

let queue: Array<any> = [];
const defaultOptions = {
  show: false,
  title: '',
  width: null,
  theme: 'default',
  message: '',
  zIndex: 100,
  overlay: true,
  selector: '#press-dialog',
  className: '',
  asyncClose: false,
  beforeClose: null,
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: t('confirm'),
  cancelButtonText: t('cancel'),
  showConfirmButton: true,
  showCancelButton: false,
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
    const dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (dialog) {
      console.log('dialog', dialog);
      // dialog.callback = (action, instance) => {
      //   action === 'confirm' ? resolve(instance) : reject(instance);
      // };
      const newOptions = {
        callback: (action, instance) => {
          action === 'confirm' ? resolve(instance) : reject(instance);
        },
        ...options,
      };

      // #ifdef H5
      dialog.setData(newOptions);
      // #endif
      // #ifndef H5
      dialog.$vm.setData(newOptions);
      // #endif
      // dialog.setData(newOptions);


      Vue.nextTick(() => {
        // #ifdef H5
        dialog.setData({ show: true });
        // #endif
        // #ifndef H5
        dialog.$vm.setData({ show: true });
        // #endif
        // dialog.innerShow = true;
        // dialog.setData({ show: true });
      });
      queue.push(dialog);
    } else {
      console.warn('The press-dialog node is not found, please confirm whether the selector and context are correct');
    }
  });
};
Dialog.alert = options => Dialog(options);
Dialog.confirm = options => Dialog(Object.assign({ showCancelButton: true }, options));
Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};
Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};
Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;
Dialog.setDefaultOptions = (options) => {
  currentOptions = Object.assign(Object.assign({}, currentOptions), options);
  Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions = () => {
  currentOptions = Object.assign({}, defaultOptions);
  Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions();
export default Dialog;
