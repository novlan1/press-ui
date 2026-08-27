// @ts-check
/**
 * @typedef {import("tim-js-sdk").default} TIM_TYPE
 */


// #ifdef H5
// @ts-ignore
import TIM_WEB from 'tim-js-sdk';
// #endif
// #ifndef H5
// @ts-ignore
import TIM_MP from 'tim-wx-sdk';
// #endif
/**
 * @type {TIM_TYPE}
 */
let TIM;

// #ifdef H5
TIM = TIM_WEB;
// #endif

// #ifndef H5
TIM = TIM_MP;
// #endif


export {
  TIM,
};
