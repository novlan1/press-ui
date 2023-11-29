// 适配示例项目的mixin
// 包括 uni-app 下的 Vue3、非 uni-ap p的 Vue2 项目

import Toast from '../../packages/press-toast/index';
import PressCell from '../../packages/press-cell/press-cell.vue';
import DemoBlock from '../../pages/demo-block/demo-block.vue';
import ToggleHeader from '../../pages/components/toggle-header/toggle-header.vue';

import { initGlobalComponent, initGlobalMixin } from '../../packages/common/vue3/adapter';


/**
 * 普通Vue项目示例的mixin
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
}
