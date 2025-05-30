<template>
  <div
    class="press-picker-column-index"
  >
    <!-- #ifdef MP-ALIPAY -->
    <scroll-view
      scroll-y
      class="press-picker-column"
      :class="customClass"
      :style="columnStyle"
      @touchstart="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <!-- #endif -->

      <!-- #ifndef MP-ALIPAY -->
      <div
        class="press-picker-column"
        :class="customClass"
        :style="columnStyle"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <!-- #endif -->
        <div
          :style="wrapperStyle"
          class="press-picker-column__wrapper"
        >
          <div
            v-for="(option,index) in (options)"
            :key="option.index"
            :data-index="index"
            :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}"
            :class="[
              'press-ellipsis',
              'press-picker-column__item',
              {
                'press-picker-column__item--disabled':option && option.disabled,
                'press-picker-column__item--selected':index === currentIndex,
                activeClass: index === currentIndex
              }
            ]"
            @click="onClickItem"
          >
            <div
              v-if="computed.optionTextHtml(option)"
              class="press-picker-column__item-html"
              v-html="computed.optionTextHtml(option)"
            />
            <template v-else>
              {{ computed.optionText(option, valueKey) }}
            </template>
          </div>
        </div>
      <!-- #ifndef MP-ALIPAY -->
      </div>
      <!-- #endif -->

      <!-- #ifdef MP-ALIPAY -->
    </scroll-view>
    <!-- #endif -->
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_PICKER as PARENT } from '../common/constant/parent-map';
import { range } from '../common/format/number';
import { isObj } from '../common/utils/validator';

import { nextTick, forceUpdate } from '../common/vue3/adapter';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';
import { ChildrenMixin } from '../mixins/relation';

import computed from './index';


const DEFAULT_DURATION = 200;

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_TIME` 且 move
// 距离大于 `MOMENTUM_DISTANCE` 时，执行惯性滑动
const MOMENTUM_TIME = 300;
const MOMENTUM_DISTANCE = 15;


export default {
  name: 'PressPickerColumn',
  options: {
    ...defaultOptions,
  },
  mixins: [ScrollViewPureMixin, ChildrenMixin(PARENT)],

  props: {
    ...defaultProps,
    activeClass: { type: String, default: '' },
    valueKey: { type: String, default: '' },
    className: { type: String, default: '' },
    itemHeight: { type: Number, default: 44 },
    visibleItemCount: { type: Number, default: 6 },
    initialOptions: {
      type: Array,
      default: () => ([]),
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    useMomentum: {
      type: Boolean,
      default: false,
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000,
    },
  },
  emits: ['change'],
  data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: [],
      currentIndex: 0,

      computed,

      touchStartTime: 0,
      momentumOffset: 0,
    };
  },
  computed: {
    columnStyle() {
      const { itemHeight, visibleItemCount } = this;
      return computed.rootStyle({ itemHeight, visibleItemCount });
    },
    wrapperStyle() {
      const { offset, itemHeight, visibleItemCount, duration } = this;
      return computed.wrapperStyle({ offset, itemHeight, visibleItemCount, duration });
    },
  },
  watch: {
    defaultIndex: {
      handler(value) {
        this.setIndex(value);
      },
      immediate: true,
    },
    initialOptions: {
      handler(val) {
        this.options = val;
        this.setIndex(this.defaultIndex);
      },
      deep: true,
    },
  },
  created() {
    const { defaultIndex, initialOptions } = this;
    this.set({
      currentIndex: defaultIndex,
      options: initialOptions,
    }).then(() => {
      this.setIndex(defaultIndex);
    });
    // this[PARENT].children.push(this);
  },
  mounted() {
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    getCount() {
      return this.options.length;
    },
    set(data) {
      this.setData(data);

      forceUpdate(this);

      // eslint-disable-next-line vue/valid-next-tick
      return new Promise(resolve => nextTick(resolve));
    },
    onTouchStart(event) {
      this.setData({
        startY: event.touches[0].clientY,
        startOffset: this.offset,
        duration: 0,

        touchStartTime: Date.now(),
        momentumOffset: this.offset,
      });
    },
    onTouchMove(event) {
      if (!event.touches[0]) return;
      const deltaY = event.touches[0].clientY - this.startY;
      const newOffset = range(this.startOffset + deltaY, -(this.getCount() * this.itemHeight), this.itemHeight);
      this.setData({
        offset: newOffset,
      });

      const now = Date.now();
      if (now - this.touchStartTime > MOMENTUM_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = newOffset;
      }
    },
    getIndexByOffset(offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.getCount() - 1);
    },
    momentum(distance, duration) {
      const speed = Math.abs(distance / duration);
      const newDistance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);
      const index = this.getIndexByOffset(newDistance);

      this.setData({ duration: +this.swipeDuration });
      this.setIndex(index, true);
    },
    onTouchEnd() {
      if (this.offset === this.startOffset) return;

      const distance = this.offset - this.momentumOffset;
      const duration = Date.now() - this.touchStartTime;
      const startMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;

      if (startMomentum && this.useMomentum) {
        this.momentum(distance, duration);
        return;
      }

      this.setData({ duration: DEFAULT_DURATION });
      const index = this.getIndexByOffset(this.offset);
      this.setIndex(index, true);
    },
    onClickItem(event) {
      const { index } = event.currentTarget.dataset;
      this.setIndex(index, true);
    },
    adjustIndex(index) {
      const count = this.getCount();
      index = range(index, 0, count);
      for (let i = index; i < count; i++) {
        if (!this.isDisabled(this.options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.options[i])) return i;
      }
    },
    isDisabled(option) {
      return isObj(option) && option.disabled;
    },
    getOptionText(option) {
      return isObj(option) && this.valueKey in option
        ? option[this.valueKey]
        : option;
    },
    setIndex(index, userAction) {
      index = this.adjustIndex(index) || 0;
      const offset = -index * this.itemHeight;
      if (index !== this.currentIndex) {
        return this.set({ offset, currentIndex: index }).then(() => {
          userAction && this.$emit('change', index);
        });
      }
      return this.set({ offset });
    },
    setValue(value) {
      const { options } = this;
      for (let i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
      return Promise.resolve();
    },
    getValue() {
      return this.options[this.currentIndex];
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
