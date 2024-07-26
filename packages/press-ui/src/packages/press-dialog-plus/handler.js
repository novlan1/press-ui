import { t } from '../locale';
import { addFunctionForDialog } from './handler-helper';
import { selectComponent } from '../common/functional-component';
import { nextTick } from '../common/vue3/adapter';
import { setData } from '../common/component-handler/set-data';
import { initH5Instance } from '../common/component-handler/h5-handler';

// #ifdef H5
import VueDialog from './press-dialog-plus.vue';
// #endif


let queue = [];

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
