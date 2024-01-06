// #ifdef H5
// @ts-ignore
import TIM_WEB from 'tim-js-sdk';
// #endif
// #ifndef H5
// @ts-ignore
import TIM_MP from 'tim-wx-sdk';
// #endif

let TIM: any;

// #ifdef H5
TIM = TIM_WEB;
// #endif

// #ifndef H5
TIM = TIM_MP;
// #endif


export {
  TIM,
};
