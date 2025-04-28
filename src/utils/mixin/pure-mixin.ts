// 适配示例项目的mixin
// 包括 uni-app 下的 Vue3、非 uni-app 的 Vue2 项目

import { initGlobalComponent, initGlobalMixin, initGlobalProps } from '../../packages/common/vue3/adapter';
import PressCell from '../../packages/press-cell/press-cell.vue';
import DemoBlock from '../../packages/press-demo-block/press-demo-block.vue';
import Toast from '../../packages/press-toast/index';
import ToggleHeader from '../../packages/press-toggle-header/press-toggle-header.vue';


/**
 * 普通 Vue 项目示例的 mixin
 */
export function initPureDemoMixin(app?: any) {
  initGlobalComponent({
    name: 'DemoBlock',
    component: DemoBlock,
  }, app);

  initGlobalComponent({
    name: 'ToggleHeader',
    component: ToggleHeader,
  }, app);

  initGlobalComponent({
    name: 'PressCell',
    component: PressCell,
  }, app);

  const mixin = {
    methods: {
      onGTip(title: string, duration = 1000) {
        Toast.clear();
        Toast({
          message: title,
          duration,
        });
      },
      onGShowLoading(title: string, options = {}) {
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
  };

  initGlobalMixin(mixin, app);

  // 注册 $toast
  initGlobalProps({
    name: '$toast',
    prop: Toast,
  }, app);
}
