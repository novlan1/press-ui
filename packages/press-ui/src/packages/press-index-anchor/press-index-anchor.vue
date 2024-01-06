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

import { getRect } from '../common/dom/rect';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_INDEX_BAR  as PARENT } from '../common/constant/parent-map';


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
        const newScrollTop = scrollTop + rect.top - this[PARENT].stickyOffsetTop;


        callback?.(newScrollTop);
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-index-anchor {
  padding: var(--index-anchor-padding, $index-anchor-padding);
  color: var(--index-anchor-text-color, $index-anchor-text-color);
  font-weight: var(--index-anchor-font-weight, $index-anchor-font-weight);
  font-size: var(--index-anchor-font-size, $index-anchor-font-size);
  line-height: var(--index-anchor-line-height, $index-anchor-line-height);
  background-color: var(
    --index-anchor-background-color,
    $index-anchor-background-color
  );

  &--active {
    right: 0;
    left: 0;
    color: var(
      --index-anchor-active-text-color,
      $index-anchor-active-text-color
    );
    background-color: var(
      --index-anchor-active-background-color,
      $index-anchor-active-background-color
    );
  }
}
</style>
