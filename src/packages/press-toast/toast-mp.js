import { makeExtraMethods } from '../common/component-handler/component-handler';
import { getMPComponentHandler } from '../common/component-handler/mp-handler';

import { initGlobalProps } from '../common/vue3/adapter';

import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';


const Toast = getMPComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  name: 'press-toast',
});

makeExtraMethods(Toast, ['loading', 'success', 'fail'], DEFAULT_KEY);

initGlobalProps({
  name: '$toast',
  prop: Toast,
});

export default Toast;
