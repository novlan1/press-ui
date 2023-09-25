import { t } from '../locale';
import { addFunctionForDialog } from './handler-helper';
import { selectComponent } from '../common/functional-component';
import { nextTick, extendComponent } from '../common/vue3/adapter';


// #ifdef H5
import VueDialog from './press-dialog-plus.vue';
// #endif


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

function initInstance() {
  const dialogId = 'press-dialog';
  const oldDialog = document.getElementById(dialogId);
  if (oldDialog?.parentNode) {
    oldDialog.parentNode.removeChild(oldDialog);
  }
  const dialogRootDiv = document.createElement('div');
  dialogRootDiv.id = dialogId;

  document.body.appendChild(dialogRootDiv);

  const instance = extendComponent(dialogRootDiv, VueDialog);

  return instance;
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
      dialog = initInstance();
    }
    // #endif

    if (dialog) {
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


      nextTick(() => {
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
