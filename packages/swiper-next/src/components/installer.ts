import { Swiper } from './swiper';
import { SwiperItem } from './swiper-item';

import type { App } from 'vue';

export default function (Vue: App) {
  Vue.use(Swiper);
  Vue.use(SwiperItem);
}
