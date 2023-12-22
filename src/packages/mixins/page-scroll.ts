import { getCurrentPage } from '../common/utils/page';
import { isDef } from '../common/utils/validator';

function onPageScroll(event: any) {
  const { pressPageScroller = [] } = getCurrentPage() as any;
  pressPageScroller.forEach((scroller: any) => {
    if (typeof scroller === 'function') {
      scroller(event);
    }
  });
}


export const pageScrollMixin = (scroller: any) => ({
  created() {
    const page = getCurrentPage() as any;
    if (!isDef(page)) {
      return;
    }
    if (Array.isArray(page.pressPageScroller)) {
      page.pressPageScroller.push(scroller.bind(this));
    } else {
      page.pressPageScroller =  typeof page.onPageScroll === 'function'
        ? [page.onPageScroll.bind(page), scroller.bind(this)]
        : [scroller.bind(this)];
    }
    page.onPageScroll = onPageScroll;
  },
  destroy() {
    const page = getCurrentPage() as any;
    if (isDef(page)) {
      page.pressPageScroller = page.pressPageScroller?.filter((item: any) => item !== scroller) || [];
    }
  },
});
