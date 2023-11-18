// 此文件不能改为ts，否则条件编译有问题

import { dialogProps } from './computed';
import { addFunctionForDialog } from '../press-dialog-plus/handler-helper';
import { selectComponent } from '../common/functional-component';
import { setData } from '../common/component-handler/set-data';
import { initH5Instance } from '../common/component-handler/h5-handler';

// #ifdef H5
import VueDialog from './press-dialog.vue';
// #endif

let queue = [];
const defaultOptions = Object.keys(dialogProps).reduce((acc, item) => {
  acc[item] = dialogProps[item].default;
  return acc;
}, {
  selector: '#tip-match-comm-tips-dialog',
});


let currentOptions = Object.assign({}, defaultOptions);
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


const Dialog = (options) => {
  options = Object.assign(Object.assign({}, currentOptions), options);
  const context = options.context || getContext();
  let dialog = selectComponent(context, options.selector);

  delete options.context;
  delete options.selector;


  // #ifdef H5
  if (!dialog) {
    dialog = initH5Instance(VueDialog, 'tip-dialog-showCommTipsDialog');
  }
  // #endif

  if (dialog) {
    const newOptions = {
      ...options,
    };

    // let promise;

    setData(dialog, newOptions);
    const promise = setData(dialog, newOptions, 'showDialog');

    // #ifdef H5
    // dialog.setData(newOptions);
    // promise = dialog.showDialog(options);
    // #endif

    // #ifndef H5
    // dialog.$vm.setData(newOptions);
    // promise = dialog.$vm.showDialog(options);
    // #endif

    return promise.then(val => Promise.resolve(val))
      .catch(err => Promise.reject(err));
  }
  console.warn('The press-dialog node is not found, please confirm whether the selector and context are correct');
};

function updateQueue(arg) {
  queue = arg;
}

function updateCurrentOptions(arg) {
  currentOptions = arg;
}

Dialog.show = options => Dialog(options);
addFunctionForDialog({
  Dialog,
  queue,
  currentOptions,
  defaultOptions,
  updateQueue,
  updateCurrentOptions,
});

export default Dialog;
