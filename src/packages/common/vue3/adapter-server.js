import {
  // #ifndef VUE3
  Vue,
  // #endif
} from './vue';


export function getIsServer() {
  let result;

  // #ifndef VUE3
  result = Vue.prototype.$isServer;
  // #endif

  // #ifdef VUE3
  result = typeof window === 'undefined';
  // #endif

  return result;
}
