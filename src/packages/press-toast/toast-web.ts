import { getH5ComponentHandler, makeExtraMethods } from '../common/component-handler';
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
