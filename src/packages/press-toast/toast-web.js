import Vue from 'vue';
import VueToast from './press-toast';
import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';
import { getH5ComponentHandler, makeExtraMethods } from '../common/component-handler';


const Toast = getH5ComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  component: VueToast,
});


makeExtraMethods(Toast, ['loading', 'success', 'fail'], DEFAULT_KEY);

Vue.prototype.$toast = Toast;

export default Toast;
