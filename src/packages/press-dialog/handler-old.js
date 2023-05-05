/* eslint-disable import/first */
let Dialog;

// #ifndef H5
import DialogMp from './dialog-mp';
Dialog = DialogMp;
// #endif

// #ifdef H5
import DialogWeb from './dialog-web';
Dialog = DialogWeb;
// #endif


export default Dialog;
