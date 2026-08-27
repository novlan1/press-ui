// #ifndef H5
import { globalVarVue3 as globalVarVue3Mp } from './mp';
// #endif

// #ifdef H5
import { globalVarVue3 as globalVarVue3Web } from './web';
// #endif


let globalVarVue3;

// #ifndef H5
globalVarVue3 = globalVarVue3Mp;
// #endif

// #ifdef H5
globalVarVue3 = globalVarVue3Web;
// #endif

export {
  globalVarVue3,
};
