import { getH5ComponentHandler } from '../common/component-handler/h5-handler';
import { makeExtraMethods } from '../common/component-handler/component-handler';

import { initGlobalProps } from '../common/vue3/adapter';
import VueToast from './press-toast.vue';
import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';


const Toast = getH5ComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  component: VueToast,
});


makeExtraMethods(Toast, ['loading', 'success', 'fail'], DEFAULT_KEY);

initGlobalProps({
  name: '$toast',
  prop: Toast,
});

export default Toast;
