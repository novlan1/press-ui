import { getCurrentPage } from '../../common/utils/page';
import { isDef } from '../../common/utils/validator';

function onPageScroll(event) {
  const page = getCurrentPage();
  if (!page) return;
  const list = page.pressPageScroller || [];
  list.forEach((scroller) => {
    if (typeof scroller === 'function') {
      try {
        scroller(event);
      } catch (err) {
        console.warn('[press-page-scroll] scroller 调用失败', err);
      }
    }
  });
}


export const pageScrollMixin = scroller => ({
  created() {
    const page = getCurrentPage();
    if (!isDef(page)) {
      return;
    }

    // 注册本组件的滚动回调
    if (Array.isArray(page.pressPageScroller)) {
      page.pressPageScroller.push(scroller.bind(this));
    } else {
      const original = typeof page.onPageScroll === 'function'
        ? page.onPageScroll.bind(page)
        : null;
      page.pressPageScroller = original ? [original, scroller.bind(this)] : [scroller.bind(this)];
    }

    // 同时挂一个「统一派发函数」到页面 —— 这一步是支持 APP / 小程序的关键。
    //
    // 之前只写 `page.onPageScroll = onPageScroll` 在 APP-vue 上无效，
    // 因为 uni APP-vue 的 onPageScroll 是在编译期从页面 options 里读出来的，
    // 运行时赋给 vm 实例属性的方式根本不会被框架调用。
    //
    // 正确做法是同时改 page.$options.onPageScroll（让下次渲染/调度能感知到）
    // 并保留 vm 实例属性兜底（兼容一些读实例属性的运行时分支）。
    const dispatch = onPageScroll;
    page.onPageScroll = dispatch;
    if (page.$options) {
      // 已经存在则包一层，让原有钩子也跑
      const existing = page.$options.onPageScroll;
      page.$options.onPageScroll = existing
        ? function (e) {
          existing.call(this, e); dispatch(e);
        }
        : dispatch;
    }
  },
  destroy() {
    const page = getCurrentPage();
    if (isDef(page)) {
      page.pressPageScroller = page.pressPageScroller?.filter(item => item !== scroller) || [];
    }
  },
});
