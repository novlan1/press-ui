// #ifndef VUE3
// @ts-ignore
import innerVue from 'vue';
// #endif

// #ifdef VUE3
// @ts-ignore
// 换行需要额外的 ts-ignore
import { nextTick, createApp, provide, inject, getCurrentInstance } from 'vue';
// #endif


// #ifndef VUE3
export const Vue = innerVue;
// #endif


export {
  // #ifdef VUE3
  nextTick,
  createApp,
  provide,
  inject,
  getCurrentInstance,
  // #endif
};


export const isVue3 = () => {
  let result = false;
  // #ifdef VUE3
  result = true;
  // #endif
  return result;
};

