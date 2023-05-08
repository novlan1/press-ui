// #ifdef H5
import TIM_WEB from 'tim-js-sdk';
// #endif
// #ifndef H5
import TIM_MP from 'tim-wx-sdk';
// #endif

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
