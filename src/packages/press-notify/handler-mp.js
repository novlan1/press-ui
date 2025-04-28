import { getMPComponentHandler } from '../common/component-handler/mp-handler';

import { DEFAULT_OPTIONS, DEFAULT_KEY } from './default-options';


const Notify = getMPComponentHandler({
  defaultOptions: DEFAULT_OPTIONS,
  defaultKey: DEFAULT_KEY,
  name: 'press-notify',
});

export default Notify;
