import { canIUseGroupSetData } from './version';
import { isNotInUni } from './utils';
export { nextTick } from '../vue3/adapter';

let systemInfo = {};

export function getSystemInfoSync() {
  try {
    if (!Object.keys(systemInfo).length
      && typeof uni !== 'undefined'
      && typeof uni?.getSystemInfoSync === 'function'
    ) {
      systemInfo = uni.getSystemInfoSync();
    }
  } catch (err) {
    console.log('[getSystemInfoSync] err', err);
  }

  return systemInfo;
}


export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}


export function groupSetData(context, cb) {
  if (canIUseGroupSetData() && context.groupSetData) {
    context.groupSetData(cb);
  } else {
    cb();
  }
}

export function intersectionObserverPloyFill({
  selector,
  callback,
  options,
}) {
  // #ifdef H5
  if (isNotInUni()) {
    const io = new IntersectionObserver(callback, options);
    const target = document.querySelectorAll(selector);
    target.forEach((element) => {
      io.observe(element);
    });
    return true;
  }
  // #endif
  return false;
}
