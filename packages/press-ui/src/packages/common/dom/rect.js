import { getScrollSelector } from './scroll';
import { isNotInUni } from '../utils/utils';
import { getSystemInfoSync } from '../utils/system';
// #ifdef H5
import getWindowOffset from '../utils/get-window-offset';
// #endif


// 非 uni-app H5下， pageY、clientY 去除 window-top
export function getRealPageYOrClientY(value) {
  // #ifdef H5
  const {
    top = 0,
  } = getWindowOffset();

  if (isNotInUni()) {
    return value - top;
  }
  // #endif
  return value;
}


export function getWindowWidth() {
  // #ifdef H5
  if (isNotInUni()) {
    const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screen.width);
    let windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight, screen.height);

    const {
      top: windowTop,
      bottom: windowBottom,
    } = getWindowOffset();

    windowHeight -= windowTop;
    windowHeight -= windowBottom;

    return {
      windowWidth,
      windowHeight,
      windowTop,
      windowBottom,
    };
  }
  // #endif

  const { windowWidth, windowHeight, windowTop, windowBottom } = uni.getSystemInfoSync();

  return {
    windowWidth,
    windowHeight,
    windowTop,
    windowBottom,
  };
}


export function getStatusBarHeight() {
  // #ifdef H5
  if (isNotInUni()) {
    return 0;
  }
  // #endif

  const { statusBarHeight } = getSystemInfoSync();
  return statusBarHeight;
}


export function getScrollHeight(context, id) {
  return new Promise((resolve) => {
    const selector = getScrollSelector(id);

    // #ifdef H5
    const el = context.$el;
    if (el) {
      const child =  el.querySelector(selector);
      if (!child) {
        resolve({});
      }
      resolve({
        scrollHeight: child.scrollHeight,
        scrollTop: child.scrollTop,
      });
      return;
    }
    // #endif

    uni.createSelectorQuery()
      .in(context)
      .select(selector)
      .fields({
        scrollOffset: true,
      }, (box) => {
        resolve(box);
      })
      .exec();
  });
}

export function getRect(context, selector, searchBody = false) {
  return new Promise((resolve) => {
    // #ifdef H5
    const el = context?.$el;
    let child = el?.querySelector(selector);

    if (!child && searchBody) {
      child = document.querySelector(selector);
    }

    if (child) {
      const rect = child.getBoundingClientRect() || {};

      const {
        top,
      } = getWindowOffset();

      let result = {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,

        x: rect.x,
        y: rect.y,

        top: rect.top,
        bottom: rect.bottom,
      };

      // if (isNotInUni()) {
      result = {
        ...result,
        // 参考 uni-app 中 src/core/view/bridge/subscribe/api/request-component-info.js
        // 减去 windowTop
        top: rect.top - top,
        bottom: rect.bottom - top,
      };
      // }

      resolve(result);
    } else {
      resolve({});
    }
    // #endif

    // #ifndef H5
    if (context) {
      uni.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]));
    } else {
      uni.createSelectorQuery()
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]));
    }
    // #endif
  });
}

export function getAllRect(context, selector) {
  return new Promise((resolve) => {
  // #ifdef H5
    const el = context.$el;
    if (el) {
      const children =  el.querySelectorAll(selector);
      const rect = [...children].map(item => item.getBoundingClientRect());
      resolve(rect);
      return;
    }
    // #endif

    uni.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => {
        resolve(rect[0]);
      });
  });
}

