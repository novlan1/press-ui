import Vue from 'vue';
import App from './App.vue';
import { reportAegis } from 'src/utils/report/report';
import { demoI18n } from 'src/utils/i18n/i18n';
import { initMixin } from 'src/utils/mixin/mixin';
import { checkAndShowVConsole } from './utils/v-console/v-console';

import DemoBlock from 'src/pages/demo-block/demo-block.vue';
import DemoBlockPlus from 'src/pages/demo-block/demo-block-plus.vue';
import DemoSection from 'src/pages/demo-block/demo-section.vue';
import Toast from 'src/packages/press-toast/index';

import PressLoading from 'src/packages/press-loading/press-loading.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressCellGroup from 'src/packages/press-cell-group/press-cell-group.vue';
import PressTag from 'src/packages/press-tag/press-tag.vue';
import PressDivider from 'src/packages/press-divider/press-divider.vue';
import PressNoticeBar from 'src/packages/press-notice-bar/press-notice-bar.vue';
import PressNavBar from 'src/packages/press-nav-bar/press-nav-bar.vue';

import PressButton from 'src/packages/press-button/press-button.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import PressDialog from 'src/packages/press-dialog/press-dialog.vue';
import PressEmpty from 'src/packages/press-empty/press-empty.vue';
import PressIcon from 'src/packages/press-icon/press-icon.vue';
import PressIconPlus from 'src/packages/press-icon-plus/press-icon-plus.vue';
import PressPopup from 'src/packages/press-popup/press-popup.vue';
import PressPopupPlus from 'src/packages/press-popup-plus/press-popup-plus.vue';
import PressInfo from 'src/packages/press-info/press-info.vue';
import PressSticky from 'src/packages/press-sticky/press-sticky.vue';
import PressTab from 'src/packages/press-tab/press-tab.vue';
import PressTabs from 'src/packages/press-tabs/press-tabs.vue';
import PressLoadingPlus from 'src/packages/press-loading-plus/press-loading-plus.vue';
import PressPickerPlus from 'src/packages/press-picker-plus/press-picker-plus.vue';
import PressDatetimePicker from 'src/packages/press-datetime-picker/press-datetime-picker.vue';
import PressSwipeCell from 'src/packages/press-swipe-cell/press-swipe-cell.vue';
import PressCheckbox from 'src/packages/press-checkbox/press-checkbox.vue';
import PressCheckboxGroup from 'src/packages/press-checkbox-group/press-checkbox-group.vue';
import PressTransition from 'src/packages/press-transition/press-transition.vue';
import PressOverlay from 'src/packages/press-overlay/press-overlay.vue';
import PressToast from 'src/packages/press-toast/press-toast.vue';


Vue.component('DemoBlock', DemoBlock);
Vue.component('DemoBlockPlus', DemoBlockPlus);
Vue.component('DemoSection', DemoSection);

Vue.component('PressButton', PressButton);
Vue.component('PressLoading', PressLoading);
Vue.component('PressCell', PressCell);
Vue.component('PressCellGroup', PressCellGroup);
Vue.component('PressPicker', PressPicker);
Vue.component('PressDialog', PressDialog);
Vue.component('PressEmpty', PressEmpty);
Vue.component('PressDivider', PressDivider);
Vue.component('PressNoticeBar', PressNoticeBar);

Vue.component('PressIcon', PressIcon);
Vue.component('PressIconPlus', PressIconPlus);
Vue.component('PressPopup', PressPopup);
Vue.component('PressInfo', PressInfo);
Vue.component('PressSticky', PressSticky);
Vue.component('PressTab', PressTab);
Vue.component('PressTabs', PressTabs);
Vue.component('PressLoadingPlus', PressLoadingPlus);
Vue.component('PressPickerPlus', PressPickerPlus);
Vue.component('PressDatetimePicker', PressDatetimePicker);
Vue.component('PressSwipeCell', PressSwipeCell);
Vue.component('PressCheckbox', PressCheckbox);
Vue.component('PressCheckboxGroup', PressCheckboxGroup);
Vue.component('PressTransition', PressTransition);
Vue.component('PressOverlay', PressOverlay);
Vue.component('PressToast', PressToast);
Vue.component('PressTag', PressTag);
Vue.component('PressNavBar', PressNavBar);
Vue.component('PressPopupPlus', PressPopupPlus);


Vue.config.productionTip = false;
App.mpType = 'app';
Vue.use(Toast);
reportAegis();
demoI18n();

const app = new Vue({
  ...App,
});
app.$mount();
initMixin();
checkAndShowVConsole();

