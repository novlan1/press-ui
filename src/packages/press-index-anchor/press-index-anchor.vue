<template>
  <div>
    <div
      class="press-index-anchor-wrapper"
      :style="wrapperStyle"
    >
      <div
        :class="'press-index-anchor '+(active ? 'press-index-anchor--active press-hairline--bottom' : '')"
        :style="anchorStyle"
      >
        <slot v-if="useSlot" />
        <template v-else>
          <span>{{ index }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_INDEX_BAR  as PARENT } from '../common/constant/parent-map';
import { getRect } from '../common/dom/rect';
import { ChildrenMixin } from '../mixins/basic/relation';


export default {
  name: 'PressIndexAnchor',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ChildrenMixin(PARENT, { indexKey: 'tIndex' }),
  ],
  props: {
    useSlot: Boolean,
    index: {
      type: [Number, String],
      default: '',
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      active: false,
      wrapperStyle: '',
      anchorStyle: '',
    };
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((item) => {
        this[item] = data[item];
      });
    },
    scrollIntoView(scrollTop, callback) {
      getRect(this, '.press-index-anchor-wrapper').then((rect) => {
        const newScrollTop = scrollTop + rect.top;// - this[PARENT].stickyOffsetTop;
        // touchMove sidebar 时会调用
        // 让 pressIndexBarWrapper，即 scroll-view 包裹层 滚动到新的位置
        callback?.(newScrollTop);
      });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
