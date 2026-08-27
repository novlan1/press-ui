// #ifdef H5
import { isNotInUni } from '../../common/utils/utils';
import { setCustomElements } from '../../common/vue3/adapter.js';
import ScrollView from '../../scroll-view/scroll-view.vue';
// #endif

let componentConfig = {};
// #ifdef H5
if (isNotInUni()) {
  componentConfig = {
    ScrollView,
  };
  setCustomElements([
    'uni-scroll-view',
  ], app);
}
// #endif

export const ScrollViewPureMixin = {
  components: {
    ...componentConfig,
  },
};
