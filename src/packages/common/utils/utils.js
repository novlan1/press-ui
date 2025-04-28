import { addUnit } from './add-unit';
import { bem, bem2, bem3 } from './bem';
import { memoize } from './memoize';


const memoizeBem = memoize(bem);

export const isNotInUni = () => {
  if (typeof uni === 'undefined') {
    return true;
  }

  let result = false;
  try {
    // 一些项目 mock 了 uni，用额外的变量判断
    result = process.env.VUE_APP_NOT_UNI;
  } catch (err) {
    result = false;
  }
  return result;
};

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
