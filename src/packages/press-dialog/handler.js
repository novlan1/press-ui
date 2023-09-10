// 此文件不能改为ts，否则条件编译有问题

import Vue from 'vue';
import { dialogProps } from './computed';
import { addFunctionForDialog } from '../press-dialog-plus/handler-helper';
import { selectComponent } from '../common/functional-component';

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

function initInstance() {
  const dialogId = 'tip-dialog-showCommTipsDialog';
  const oldDialog = document.getElementById(dialogId);
  if (oldDialog?.parentNode) {
    oldDialog.parentNode.removeChild(oldDialog);
  }
  const dialogRootDiv = document.createElement('div');
  dialogRootDiv.id = dialogId;

  document.body.appendChild(dialogRootDiv);

  const instance = new (Vue.extend(VueDialog))({
    el: dialogRootDiv,
  });
  return instance;
}

const Dialog = (options) => {
  options = Object.assign(Object.assign({}, currentOptions), options);
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
    const newOptions = {
      ...options,
    };

    let promise;

    // #ifdef H5
    dialog.setData(newOptions);
    promise = dialog.showDialog(options);
    // #endif

    // #ifndef H5
    dialog.$vm.setData(newOptions);
    promise = dialog.$vm.showDialog(options);
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
