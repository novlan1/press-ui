import Vue from 'vue';
import { canIUseGroupSetData } from './version';


let systemInfo;
export function getSystemInfoSync() {
  if (systemInfo == null && typeof uni.getSystemInfoSync === 'function') {
    systemInfo = uni.getSystemInfoSync();
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
