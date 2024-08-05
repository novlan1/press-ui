import { bem, bem2, bem3 } from './bem';
import { memoize } from './memoize';
import { addUnit } from './add-unit';


const memoizeBem = memoize(bem);

export const isNotInUni = () => typeof uni === 'undefined' || process.env.VUE_APP_NOT_UNI;

export default {
  bem: memoizeBem,
  memoize,
  addUnit,
  bem2,
  bem3,
};


export function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

export function updateElementStyle(
  element,
  styles,
) {
  Object.keys(styles).forEach((attrName) => {
    element.style[attrName] = styles[attrName];
  });
}
