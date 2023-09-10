import Vue from 'vue';
import { canIUseGroupSetData } from './version';
import { isNotInUni } from './utils';

let systemInfo: Record<string, any> = {};

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

export function nextTick(cb) {
  Vue.nextTick(cb);
  return;
}


export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);

  // const systemInfo = getSystemInfoSync();
  // if (systemInfo.platform === 'devtools') {
  //   return setTimeout(() => {
  //     cb();
  //   }, 1000 / 30);
  // }
  // return wx
  //   .createSelectorQuery()
  //   .selectViewport()
  //   .boundingClientRect()
  //   .exec(() => {
  //     cb();
  //   });
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
  if (isNotInUni()) {
    const io = new IntersectionObserver(callback, options);
    const target = document.querySelectorAll(selector);
    target.forEach((element) => {
      io.observe(element);
    });
    return true;
  }
  return false;
}
