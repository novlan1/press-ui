<template>
  <scroll-view
    :id="SCROLL_VIEW_ID"
    :style="scrollViewStyle"
    :scroll-y="vertical"
    :scroll-x="!vertical"
    :scroll-with-animation="scrollWithAnimation"
    :scroll-anchoring="scrollAnchoring"
    :enhanced="enhanced"
    :enable-flex="enableFlex"
    :enable-passive="enablePassive"
    :lower-threshold="offset"
    :scroll-into-view="scrollToElementById"
    :class="scrollViewClass"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    @scrolltolower="scrollToLower"
    @scroll="scroll"
  >
    <div
      class="press-list__layout"
      :style="layoutStyle"
    >
      <slot />

      <slot
        v-if="innerLoading"
        name="loading"
      >
        <div
          class="press-list__loading"
          :style="loadingStyle"
        >
          <PressLoading
            :vertical="!vertical"
            :size="loadingSize"
          >
            {{ loadingText }}
          </PressLoading>
        </div>
      </slot>

      <slot
        v-if="finishedText && finished"
        name="finished"
      >
        <div
          class="press-list__finished"
          :style="finishedStyle"
        >
          <div>
            {{ finishedText }}
          </div>
        </div>
      </slot>

      <div
        class="press-list__placeholder"
      />
    </div>
  </scroll-view>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getRect } from '../common/dom/rect';
import { getScrollSelector, getScroller } from '../common/dom/scroll';
import { style } from '../common/utils/style';

import { nextTick } from '../common/utils/system';
import { vModelMixin } from '../common/vue3/adapter';

import { BindEventMixin } from '../mixins/basic/bind-event';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';

import PressLoading from '../press-loading/press-loading.vue';

import {  SCROLL_VIEW_ID } from './config';


const scrollSelector = getScrollSelector(SCROLL_VIEW_ID);


export default {
  name: 'PressList',
  options: {
    ...defaultOptions,
  },
  components: {
    PressLoading,
  },
  mixins: [
    vModelMixin,
    // #ifdef H5
    BindEventMixin(function (bind) {
      if (!this.autoCheckScroller) return;
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }

      bind(this.scroller, 'scroll', this.onScroll, true);
      bind(this.scroller, 'touchmove', this.onScroll, true);
      this.onScroll();
    }),
    ScrollViewPureMixin,
    // #endif
  ],
  props: {
    offset: {
      type: [Number, String],
      default: 50,
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
    layoutStyle: {
      type: String,
      default: '',
    },
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
    scrollToElementById: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: true,
    },
    loadingStyle: {
      type: String,
      default: '',
    },
    loadingSize: {
      type: String,
      default: '20px',
    },
    finishedStyle: {
      type: String,
      default: '',
    },
    autoCheckScroller: {
      type: Boolean,
      default: false,
    },
    scrollLeft: {
      type: [Number, String],
      default: 0,
    },
    scrollTop: {
      type: [Number, String],
      default: 0,
    },
    ...defaultProps,
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: [
    'scroll',
    'input',
    'load',
    'update:modelValue',
  ],
  data() {
    return {
      innerLoading: this.realModelValue,
      SCROLL_VIEW_ID,

      scrollerHeight: 0,
    };
  },
  computed: {
    scrollViewClass() {
      return ['press-list', this.vertical ? 'press-list--vertical' : 'press-list--hor', this.customClass].join(' ');
    },
    scrollViewStyle() {
      return style([
        {
          height: '100%',
        },
        this.customStyle,
      ]);
    },
  },
  watch: {
    realModelValue: {
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
      this.emitModelValue(true);
      this.$emit('load');
    },
    check() {
      nextTick(() => {
        this.innerCheck();
      });
    },
    innerCheck() {
      // #ifndef H5
      this.commonCheck();
      // #endif

      // #ifdef H5
      if (!this.autoCheckScroller) {
        this.commonCheck();
        return;
      }
      // #endif
    },
    commonCheck(scrollerRect) {
      const { offset } = this;

      if (this.innerLoading || this.finished) {
        return;
      }

      Promise.all([
        getRect(this, '.press-list__placeholder'),
        getRect(this, scrollSelector),
      ]).then((res) => {
        const { 0: placeholderRect, 1: innerScrollerRect } = res;
        if (scrollerRect === undefined) {
          scrollerRect = innerScrollerRect;
        }
        if (this.innerLoading || this.finished) {
          return;
        }

        const scrollerHeight = scrollerRect.bottom - scrollerRect.top;
        if (!scrollerHeight) {
          return;
        }

        let currentOffset = placeholderRect.bottom - scrollerRect.bottom;
        if (!this.vertical) {
          currentOffset = placeholderRect.right - scrollerRect.right;
        }

        const isReachEdge = currentOffset <= offset;
        // console.log('[currentOffset]', currentOffset);

        if (isReachEdge) {
          this.emitInput();
        }
      })
        .catch(() => {})
        .finally(() => {});
    },
    onScroll() {
      const { scroller, autoCheckScroller } = this;
      if (!autoCheckScroller) return;
      let scrollerRect;

      if (scroller?.getBoundingClientRect) {
        scrollerRect = scroller.getBoundingClientRect();
      }
      this.commonCheck(scrollerRect);
    },
  },
};
</script>

<style scoped lang="scss" src="./css/index.scss">
</style>
