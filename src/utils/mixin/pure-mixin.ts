import Vue from 'vue';
import Toast from '../../packages/press-toast/index';
import DemoBlock from '../../pages/demo-block/demo-block.vue';


/**
 * 普通Vue项目示例的mixin
 */
export function initPureDemoMixin() {
  Vue.component('DemoBlock', DemoBlock);

  Vue.mixin({
    methods: {
      onGTip(title, duration = 1000) {
        Toast.clear();
        Toast({
          message: title,
          duration,
        });
      },
      onGShowLoading(title, options = {}) {
        Toast.loading({
          message: title,
          ...options,
          mask: false,
        });
      },
      onGHideToast() {
        Toast.clear();
      },
    },
  });
}
