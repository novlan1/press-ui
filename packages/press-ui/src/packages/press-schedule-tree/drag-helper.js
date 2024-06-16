import { SCROLL_SELECTOR } from './touch-helper';

let scrollStartY = 0;
let rAF;

const slideTimeThreshold = 300;
const slideLimitDistance = 200000;
let lastTime = 0;
let lastMove = 0;
let speed = 0;


export function getScrollStartY() {
  scrollStartY = document
    ?.querySelector(SCROLL_SELECTOR)?.scrollTop || 0;
}

export function scrollRelative(moveY, animation: boolean) {
  const ref = document
    ?.querySelector(SCROLL_SELECTOR);
  if (!ref) return;

  if (animation) {
    const distance = -moveY;
    const beginTime = Date.now();
    cancelAnimationFrame(rAF);
    rAF = window.requestAnimationFrame || ((func: Function) => setTimeout(func, 16));
    const frameFunc = () => {
    // 进度，500ms 内将页面滚动到顶部
      const progress = (Date.now() - beginTime) / 300;
      if (progress < 1) {
      // 根据进度修改 scrollTop 的值
        ref.scrollTop = scrollStartY + distance * progress;
        rAF(frameFunc);
      } else {
        ref.scrollTop = scrollStartY - moveY;
      }
    };
    rAF(frameFunc);
    return;
  }

  ref.scrollTop = scrollStartY + moveY ;
}


export function initScrollBounce(scrollInfo) {
  const time = new Date().getTime();
  speed = (scrollInfo.endY - lastMove) / (time - lastTime);
  lastMove = scrollInfo.endY;
  lastTime = time;
}


export function scrollBounce() {
  let slideDistance = 0;
  if (new Date().getTime() - lastTime < slideTimeThreshold) {
    slideDistance = speed * slideTimeThreshold / 2;
    slideDistance = Math.min(slideLimitDistance, slideDistance);
    slideDistance = Math.max(-slideLimitDistance, slideDistance);

    getScrollStartY();
    scrollRelative(slideDistance, true);
  }
}
