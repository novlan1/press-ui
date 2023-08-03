<template>
  <scroll-view
    :id="SCROLL_VIEW_ID"
    style="height: 100%"
    :scroll-y="true"
    :scroll-with-animation="scrollWithAnimation"
    :scroll-anchoring="scrollAnchoring"
    :enhanced="enhanced"
    :enable-flex="enableFlex"
    :enable-passive="enablePassive"
    :lower-threshold="offset"
    :scroll-into-view="scrollToElementById"
    :class="customClass"
    @scrolltolower="scrollToLower"
    @scroll="scroll"
  >
    <div class="press-list-layout">
      <slot />
    </div>

    <div
      v-if="innerLoading || (finishedText && finished)"
      class="press-list-loading"
    >
      <pressLoadingPlus
        v-if="innerLoading"
        size="20px"
      >
        {{ loadingText }}
      </pressLoadingPlus>

      <div v-else-if="finishedText && finished">
        {{ finishedText }}
      </div>
    </div>

    <div
      class="press-list-placeholder"
    />
  </scroll-view>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import pressLoadingPlus from 'src/packages/press-loading-plus/press-loading-plus.vue';
import { getRect } from '../common/dom/rect';
import { getScrollSelector } from '../common/dom/scroll';
import {  SCROLL_VIEW_ID } from './config';

const scrollSelector = getScrollSelector(SCROLL_VIEW_ID);


export default {
  name: 'PressList',
  options: {
    ...defaultOptions,
  },
  components: {
    pressLoadingPlus,
  },
  props: {
    offset: {
      type: [Number, String],
      default: 50,
    },
    value: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: '',
    },
    loadingText: {
      type: String,
      default: '加载中...',
    },
    immediateCheck: {
      type: Boolean,
      default: true,
    },
    // scrollY: {
    //   type: Boolean,
    //   default: true,
    // },
    enableFlex: {
      type: Boolean,
      default: false,
    },
    enhanced: {
      type: Boolean,
      default: false,
    },
    scrollWithAnimation: {
      type: Boolean,
      default: false,
    },
    enablePassive: {
      type: Boolean,
      default: false,
    },
    scrollAnchoring: {
      type: Boolean,
      default: false,
    },
    // lowerThreshold: {
    //   type: Number,
    //   default: () => 100,
    // },
    // scrollOffset: {
    //   type: Number,
    //   default: () => 0,
    // },
    scrollToElementById: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  data() {
    return {
      innerLoading: this.value,
      SCROLL_VIEW_ID,

      scrollerHeight: 0,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.innerLoading = val;
        this.check();
      },
    },
    finished: 'check',
  },
  mounted() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  updated() {
  },
  methods: {
    getScrollerHeight() {
      if (this.scrollerHeight) return;

      getRect(this, scrollSelector).then((scrollerRect) => {
        this.scrollerHeight = scrollerRect.height;
      });
    },
    scroll(e) {
      this.getScrollerHeight();
      this.$emit('scroll', e, this.scrollerHeight);
      this.check();
    },
    scrollToLower() {
      // console.log('[scrollToLower]');
      this.emitInput();
    },
    emitInput() {
      if (this.innerLoading || this.finished) return;
      this.innerLoading = true;
      this.$emit('input', true);
      this.$emit('load');
    },
    check() {
      this.$nextTick(() => {
        this.innerCheck();
      });
    },
    innerCheck() {
      if (this.innerLoading || this.finished) {
        return;
      }

      const { offset }  = this;

      Promise.all([
        getRect(this, '.press-list-placeholder'),
        getRect(this, scrollSelector),
      ]).then((res) => {
        const { 0: placeholderRect, 1: scrollerRect } = res;
        if (this.innerLoading || this.finished) {
          return;
        }

        const scrollerHeight = scrollerRect.bottom - scrollerRect.top;
        if (!scrollerHeight) {
          return;
        }

        const currentOffset = placeholderRect.bottom - scrollerRect.bottom;

        const isReachEdge = currentOffset <= offset;
        // console.log('[currentOffset]', currentOffset);

        if (isReachEdge) {
          this.emitInput();
        }
      })
        .catch(() => {})
        .finally(() => {});
    },
  },
};
</script>

<style scoped>
.press-list-loading {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #969799;
  font-size: 14px;
}
.press-list-placeholder {
  height: 0;
  pointer-events: none;
}
</style>
