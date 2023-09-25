<template>
  <!-- @touchmove.stop.prevent="catchMove?noop:noop" -->
  <div
    class="press-swipe-cell"
    :class="customClass"
    data-key="cell"
    @click.stop.prevent="onClick"
    @touchstart="startDrag"
    @touchmove.capture="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <div :style="wrapperStyle">
      <div
        v-if="leftWidth"
        class="press-swipe-cell__left"
        data-key="left"
        @click.stop.prevent="onClick"
      >
        <slot name="left" />
      </div>

      <slot />

      <div
        v-if="rightWidth"
        class="press-swipe-cell__right"
        data-key="right"
        @click.stop.prevent="onClick"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

import { touch } from '../mixins/touch';
import { range } from '../common/format/number';

const THRESHOLD = 0.3;

let ARRAY = [];

export default {
  name: 'PressSwipeCell',
  options: { ...defaultOptions },
  mixins: [touch],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    leftWidth: {
      type: Number,
      default: 0,
    },
    rightWidth: {
      type: Number,
      default: 0,
    },
    asyncClose: {
      type: Boolean,
      default: false,
    },
    name: {
      type: [String, null],
      default: '',
    },
    ...defaultProps,
  },
  emits: ['click', 'open', 'close'],
  data() {
    return {
      catchMove: false,
      wrapperStyle: '',
    };
  },
  watch: {
    leftWidth: {
      handler(leftWidth = 0) {
        if (this.offset > 0) {
          this.swipeMove(leftWidth);
        }
      },
    },
    rightWidth: {
      handler(rightWidth = 0) {
        if (this.offset < 0) {
          this.swipeMove(-rightWidth);
        }
      },
    },
  },
  created() {
    this.offset = 0;
    ARRAY.push(this);
  },
  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    open(position) {
      const { leftWidth, rightWidth } = this;
      const offset = position === 'left' ? leftWidth : -rightWidth;
      this.swipeMove(offset);
      this.$emit('open', {
        position,
        name: this.name,
      });
    },
    close() {
      this.swipeMove(0);
    },
    swipeMove(offset = 0) {
      this.offset = range(offset, -this.rightWidth, this.leftWidth);
      const transform = `translate3d(${this.offset}px, 0, 0)`;
      const transition = this.dragging
        ? 'none'
        : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      this.setData({
        wrapperStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `,
      });
    },
    swipeLeaveTransition() {
      const { leftWidth, rightWidth } = this;
      const { offset } = this;
      if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
        this.open('right');
      } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
        this.open('left');
      } else {
        this.swipeMove(0);
      }
      this.setData({ catchMove: false });
    },
    startDrag(event) {
      if (this.disabled) {
        return;
      }
      this.startOffset = this.offset;
      this.touchStart(event);
    },
    noop() { },
    onDrag(event) {
      // if (this.catchMove) {
      //   event.stopPropagation();
      //   event.preventDefault();
      //   return;
      // }
      if (this.disabled) {
        return;
      }
      this.touchMove(event);
      if (this.direction !== 'horizontal') {
        return;
      }
      this.dragging = true;
      ARRAY.filter(item => item !== this && item.offset !== 0).forEach(item => item.close());
      this.setData({ catchMove: true });
      this.swipeMove(this.startOffset + this.deltaX);
    },
    endDrag() {
      if (this.disabled) {
        return;
      }
      this.dragging = false;
      this.swipeLeaveTransition();
    },
    onClick(event) {
      const { key: position = 'outside' } = event.currentTarget.dataset;
      this.$emit('click', position);
      if (!this.offset) {
        return;
      }
      if (this.asyncClose) {
        this.$emit('close', {
          position,
          instance: this,
          name: this.name,
        });
      } else {
        this.swipeMove(0);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/index.scss";

.press-swipe-cell {
  position: relative;
  overflow: hidden;

  &__left,
  &__right {
    position: absolute;
    top: 0;
    height: 100%;

    // 【修改点】增加一些h5的样式
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 65px;
    font-size: 15px;
    color: #fff;
  }

  &__left {
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  &__right {
    right: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
