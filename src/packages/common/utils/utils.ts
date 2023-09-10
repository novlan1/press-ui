import { bem, bem2, bem3 } from './bem';
import { memoize } from './memoize';
import { addUnit } from './add-unit';


const memoizeBem = memoize(bem);

export const isNotInUni = () => typeof uni === 'undefined';

export default {
  bem: memoizeBem,
  memoize,
  addUnit,
  bem2,
  bem3,
};
