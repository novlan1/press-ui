function isWindow(val) {
  return val === window;
} // get nearest scroll element
// https://github.com/vant-ui/vant/issues/3823


const overflowScrollReg = /scroll|auto|overlay/i;
export function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }

  let node = el;

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
export function getScrollTop(el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset; // iOS scroll bounce cause minus scrollTop

  return Math.max(top, 0);
}
export function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top or scroller top
export function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
export function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }

  return el.getBoundingClientRect().height;
}
export function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }

  return el.getBoundingClientRect().top;
}


export function getScrollSelector(scrollViewId) {
  let scrollSelector = scrollViewId;

  if (!scrollViewId.startsWith('#')) {
    scrollSelector = `#${scrollViewId}`;
  }

  // #ifdef H5
  scrollSelector = `${scrollSelector} > .uni-scroll-view > .uni-scroll-view`;
  // #endif

  return scrollSelector;
}
