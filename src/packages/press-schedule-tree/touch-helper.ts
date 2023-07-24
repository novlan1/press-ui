import { getScrollSelector } from '../common/dom/scroll';

export const REF_MAP = {
  TREE_REF: 'scheduleTree',
  TREE_ID: 'scheduleTreeId',
};

export const SCROLL_SELECTOR = getScrollSelector(REF_MAP.TREE_ID);


const TOUCH_THRESHOLD = 60; // 滑动阈值
const SCROLL_DURATION = 500;

function backToTopMp(context) {
  context?.createSelectorQuery?.()
    ?.select?.(SCROLL_SELECTOR)
    ?.node?.()
    ?.exec?.((res) => {
      const scrollView = res[0]?.node;
      if (!scrollView) return;
      scrollView.scrollTo({
        top: 0,
        duration: SCROLL_DURATION,
      });
    });
}

function log(info, needLog = false) {
  if (!needLog) return;
  const list = Array.isArray(info) ? info : [info];
  console.log(list.join(' '));
}

export function endTouch({
  endX,
  context,
  scrollTime = 0,
  column = 1,
  autoBackToTop = true,
  setScrollParams,
  needLog = false,
}) {
  // 通过x轴移动的距离判断是左滑右滑
  if (endX < - TOUCH_THRESHOLD && scrollTime < (column - 1)) {
    // scrollTime < (column - 1) 左滑的边界值
    log('左滑', needLog);
    // 赛程树返回顶部
    if (autoBackToTop) {
      backToTop(context);
    }


    setScrollParams(scrollTime + 1);
    return true;
  }

  if (endX > TOUCH_THRESHOLD && scrollTime != 0) {
    // scrollTime != 0 右滑的边界值
    log('右滑', needLog);
    // 赛程树返回顶部
    if (autoBackToTop) {
      backToTop(context);
    }


    setScrollParams(scrollTime - 1);
    return true;
  }
  log('just to touch', needLog);
}


function backToTop(context) {
  // #ifdef H5
  scrollToH5(0, {
    animation: true,
  });
  // #endif

  // #ifndef H5
  backToTopMp(context);
  // #endif
}


export function scrollToH5(endPosition = 0, {
  animation = true,
}) {
  // 记录开始时间
  const beginTime = Date.now();
  const ref = document
    ?.querySelector(SCROLL_SELECTOR);
  if (!ref) return;

  // 初始位置
  const startPosition = ref.scrollTop;
  if (startPosition === endPosition) return;
  // ref.scrollTo({
  //   top: endPosition,
  //   behavior: 'smooth',
  // });

  if (!animation) {
    ref.scrollTop = endPosition;
    return;
  }

  const distance = endPosition - startPosition;
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
  const frameFunc = () => {
    // 进度，500ms 内将页面滚动到顶部
    const progress = (Date.now() - beginTime) / SCROLL_DURATION;
    if (progress < 1) {
      // 根据进度修改 scrollTop 的值
      ref.scrollTop = startPosition + distance * progress;
      rAF(frameFunc);
    } else {
      ref.scrollTop = endPosition;
    }
  };
  rAF(frameFunc);
}
