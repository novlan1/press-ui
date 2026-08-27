/* eslint-disable import/no-unresolved */
// #ifdef VUE3
import QRCodeVue3 from 'qrcode.vue';
// #endif
// #ifdef VUE2
import QRCodeVue2 from 'vue-qrcode';
// #endif

let PressQRCodeWeb;


// #ifdef VUE2
PressQRCodeWeb = QRCodeVue2;
// #endif

// #ifdef VUE3
PressQRCodeWeb = QRCodeVue3;
// #endif


export default PressQRCodeWeb;
