const ITEM_HEIGHT = 50;
const VIRTUAL_LIST_THRESHOLD = 100;

export const virtualListMixin = {
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    upMissed() {
      const { currentIndex } = this as any;
      return Math.max(0, currentIndex - VIRTUAL_LIST_THRESHOLD);
    },
    showingData() {
      const { currentIndex, upMissed, list } = this as any;
      return list
        .slice(upMissed, currentIndex + VIRTUAL_LIST_THRESHOLD).map((item, index) => ({
          ...item,
          uniqueKey: index + upMissed,
        }));
    },
    hiddenUpPartStyle() {
      const { upMissed } = this as any;
      const res = `height: ${upMissed * ITEM_HEIGHT}px;`;

      return res;
    },
    wrapStyle() {
      const { list } = this as any;
      return `height: ${list.length * ITEM_HEIGHT}px;`;
    },
  },
  methods: {
    updateCurrentIndex(event, scrollerHeight) {
      const { scrollTop, scrollHeight } = event.detail;
      if (scrollTop < 0) return;
      if (scrollerHeight + scrollTop >  scrollHeight) return;

      const currentIndex = Math.round((scrollTop) / ITEM_HEIGHT);
      console.log('[currentIndex]', currentIndex);
      (this as any).currentIndex = currentIndex;
    },
  },
};
