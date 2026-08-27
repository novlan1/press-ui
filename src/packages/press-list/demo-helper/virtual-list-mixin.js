import { getEventDetail } from '../../common/dom/event';

const ITEM_HEIGHT = 50;
const DEFAULT_VIRTUAL_LIST_THRESHOLD = 500;

export const virtualListMixin = (virtualListThreshold = DEFAULT_VIRTUAL_LIST_THRESHOLD) =>  ({
  data() {
    return {
      currentIndex: 0,
      useVirtualList: true,
    };
  },
  computed: {
    upMissed() {
      const { currentIndex } = this;
      return Math.max(0, currentIndex - virtualListThreshold);
    },
    showingData() {
      const { currentIndex, upMissed, list, useVirtualList } = this;
      if (!useVirtualList) return list;

      return list
        .slice(upMissed, currentIndex + virtualListThreshold)
        .map((item, index) => ({
          ...item,
          uniqueKey: index + upMissed,
        }));
    },
    hiddenUpPartStyle() {
      const { upMissed, useVirtualList } = this;
      if (!useVirtualList) return '';

      const res = `height: ${upMissed * ITEM_HEIGHT}px;`;

      return res;
    },
    wrapStyle() {
      const { list, useVirtualList } = this;
      if (!useVirtualList) return '';

      return `height: ${list.length * ITEM_HEIGHT}px;`;
    },
  },
  methods: {
    updateCurrentIndex(event, scrollerHeight) {
      const { scrollTop, scrollHeight } = getEventDetail(event);
      if (scrollTop < 0) return;
      if (scrollerHeight + scrollTop >  scrollHeight) return;

      const currentIndex = Math.round((scrollTop) / ITEM_HEIGHT);
      // console.log('[currentIndex]', currentIndex);
      this.currentIndex = currentIndex;
    },
  },
});
