import Vue from 'vue';

import { checkAndShowVConsole } from 't-comm/lib/v-console/toggle';

import App from './App.vue';
import { initDemoI18n } from './packages/locale/demo-lang';


import PressCell from './packages/press-cell/press-cell.vue';
import DemoBlock from './packages/press-demo-block/press-demo-block.vue';
import PressPickerPlus from './packages/press-picker-plus/press-picker-plus.vue';
import PressPopupPlusCell from './packages/press-popup-cell/press-popup-cell.vue';

import Toast from './packages/press-toast/index';
import ToggleHeader from './packages/press-toggle-header/press-toggle-header.vue';
import { initMixin } from './utils/mixin/mixin';
import { reportAegis } from './utils/report/report';
import './packages/common/touch-emulator';


Vue.component('DemoBlock', DemoBlock);
Vue.component('ToggleHeader', ToggleHeader);

Vue.component('PressCell', PressCell);
Vue.component('PressPickerPlus', PressPickerPlus);
Vue.component('PressPopupPlusCell', PressPopupPlusCell);


Vue.config.productionTip = false;
App.mpType = 'app';
Vue.use(Toast);
reportAegis();
initDemoI18n();

const app = new Vue({
  ...App,
});
app.$mount();
initMixin();

// #ifdef H5
checkAndShowVConsole();
// #endif

