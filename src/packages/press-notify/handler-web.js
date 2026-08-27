import { getH5ComponentHandler } from '../common/component-handler/h5-handler';

import { DEFAULT_OPTIONS  } from './default-options';
import VueNotify from './press-notify.vue';


const Notify = getH5ComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  component: VueNotify,
});

export default Notify;
