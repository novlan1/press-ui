/* eslint-disable import/first */
let Toast: any;

// #ifndef H5
import ToastMp from './toast-mp';
Toast = ToastMp;
// #endif

// #ifdef H5
import ToastWeb from './toast-web';
Toast = ToastWeb;
// #endif


export default Toast;
