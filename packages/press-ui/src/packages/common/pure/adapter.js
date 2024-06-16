// 普通Vue2项目适配器

import { initGlobalComponent, setCustomElements } from '../vue3/adapter.js';
import ScrollView from '../../scroll-view/scroll-view.vue';
import Swiper from '../../swiper/swiper.vue';
import SwiperItem from '../../swiper-item/swiper-item.vue';


/**
 * 初始化普通Vue项目的适配器
 */
export function initPureAdapter(app) {
  initGlobalComponent([
    {
      name: 'ScrollView',
      component: ScrollView,
    },
    {
      name: 'Swiper',
      component: Swiper,
    },
    {
      name: 'SwiperItem',
      component: SwiperItem,
    },
  ], app);

  setCustomElements([
    'uni-scroll-view',
    'uni-swiper',
    'uni-swiper-item',
    'uni-image',
  ], app);
}
