import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';
import { getMPComponentHandler } from '../common/component-handler/mp-handler';


const Notify = getMPComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  defaultKey: DEFAULT_KEY,
  name: 'press-notify',
});

export default Notify;
