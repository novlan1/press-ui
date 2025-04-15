// #ifdef VUE3
import Vue3Barcode from 'vue3-barcode';
// #endif
// #ifdef VUE2
import Vue2Barcode from 'vue-barcode';
// #endif

let VueBarcode;

// #ifdef VUE3
VueBarcode = Vue3Barcode;
// #endif
// #ifdef VUE2
VueBarcode = Vue2Barcode;
// #endif


export default VueBarcode;
