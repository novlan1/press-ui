/* eslint-disable import/first */
let Notify: any;

// #ifndef H5
import NotifyMp from './handler-mp';
Notify = NotifyMp;
// #endif

// #ifdef H5
import NotifyWeb from './handler-web';
Notify = NotifyWeb;
// #endif


export default Notify;
