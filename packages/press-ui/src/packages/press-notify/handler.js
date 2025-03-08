/* eslint-disable import/first */
let Notify;

// #ifndef H5
import NotifyMp from './handler-mp';
Notify = NotifyMp;
// #endif

// #ifdef H5
import NotifyWeb from './handler-web';
Notify = NotifyWeb;
// #endif


export default Notify;
export const showNotify = Notify;
export const closeNotify = Notify.clear;
export const setNotifyDefaultOptions = Notify.setDefaultOptions;
export const resetNotifyDefaultOptions = Notify.resetDefaultOptions;
