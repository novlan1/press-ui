// #ifdef H5

// #ifdef VUE3
import { Swiper as SwiperNext } from 'swiper-next/es/src/components/swiper';
import { SwiperItem as SwiperItemNext } from 'swiper-next/es/src/components/swiper-item';
// #endif

import { isNotInUni } from '../../common/utils/utils';

// #ifdef VUE2
import { setCustomElements } from '../../common/vue3/adapter';
import InnerSwiperItem from '../../swiper-item/swiper-item.vue';
import InnerSwiper from '../../swiper/swiper.vue';
// #endif

// #ifdef VUE3
import 'swiper-next/dist/index.css';
// #endif

// #endif


let componentConfig = {};

// #ifdef H5
if (isNotInUni()) {
  // #ifdef VUE2
  componentConfig = {
    Swiper: InnerSwiper,
    SwiperItem: InnerSwiperItem,
  };
  setCustomElements([
    'uni-swiper',
    'uni-swiper-item',
  ]);
  // #endif

  // #ifdef VUE3
  componentConfig = {
    Swiper: SwiperNext,
    SwiperItem: SwiperItemNext,
  };
  // #endif
}
// #endif


export const SwiperPureMixin = {
  components: {
    ...componentConfig,
  },
};
