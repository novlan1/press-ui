import Vue from 'vue';
import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';
import { getMPComponentHandler, makeExtraMethods } from '../common/component-handler';


const Toast = getMPComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  name: 'press-toast',
});

makeExtraMethods(Toast, ['loading', 'success', 'fail'], DEFAULT_KEY);

Vue.prototype.$toast = Toast;

export default Toast;
