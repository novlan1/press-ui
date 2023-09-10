import Vue from 'vue';
import App from './App.vue';
import { reportAegis } from './utils/report/report';
import { initDemoI18n } from './utils/i18n/i18n';
import { initMixin } from './utils/mixin/mixin';
import { checkAndShowVConsole } from './utils/v-console/v-console';

import DemoBlock from './pages/demo-block/demo-block.vue';
import Toast from './packages/press-toast/index';


Vue.component('DemoBlock', DemoBlock);


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
checkAndShowVConsole();

