// #ifdef VUE2
import Vue2Barcode from 'vue-barcode';
// #endif

// #ifdef VUE3
import Vue3Barcode from 'vue3-barcode';
// #endif


let VueBarcode;

// #ifdef VUE2
VueBarcode = Vue2Barcode;
// #endif

// #ifdef VUE3
VueBarcode = Vue3Barcode;
// #endif


export default VueBarcode;
