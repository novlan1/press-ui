/* eslint-disable import/first */
let Toast;

// #ifndef H5
import ToastMp from './toast-mp';
Toast = ToastMp;
// #endif

// #ifdef H5
import ToastWeb from './toast-web';
Toast = ToastWeb;
// #endif


export default Toast;

export const showToast = Toast;
export const showFailToast = Toast.fail;
export const showSuccessToast = Toast.success;
export const showLoadingToast = Toast.loading;
export const closeToast = Toast.clear;
export const setToastDefaultOptions = Toast.setDefaultOptions;
export const resetToastDefaultOptions = Toast.resetDefaultOptions;
