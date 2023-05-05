import VueNotify from './press-notify';
import { DEFAULT_OPTIONS  } from './default-options';
import { getH5ComponentHandler } from '../common/component-handler';


const Notify = getH5ComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  component: VueNotify,
});

export default Notify;
