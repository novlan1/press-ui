// 此文件不能改为ts，否则条件编译有问题

import { initFunctionalDialog } from '../common/component-handler/init-functional-dialog';
import { addFunctionForDialog } from '../press-dialog-plus/handler-helper';

import { dialogProps } from './computed';


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

const Dialog = options => initFunctionalDialog({
  options,
  currentOptions,
  id: 'tip-dialog-showCommTipsDialog',
  // #ifdef H5
  dialogComponent: VueDialog,
  // #endif
});


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

export const showDialog = Dialog.show;
export const setDialogDefaultOptions = Dialog.setDefaultOptions;
export const resetDialogDefaultOptions = Dialog.resetDefaultOptions;
