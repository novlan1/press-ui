import Vue from 'vue';
import ScrollView from '../../scroll-view/scroll-view.vue';
import Swiper from '../../swiper/swiper.vue';
import SwiperItem from '../../swiper-item/swiper-item.vue';

/**
 * 初始化普通Vue项目的适配器
 */
export function initPureAdapter() {
  Vue.component('ScrollView', ScrollView);
  Vue.component('Swiper', Swiper);
  Vue.component('SwiperItem', SwiperItem);
  Vue.config.ignoredElements = ['uni-scroll-view', 'uni-swiper', 'uni-swiper-item'];
}
