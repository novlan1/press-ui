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
        <div :style="wrapperStyle">
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
            {{ computed.optionText(option, valueKey) }}
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
import computed from './index';
import { range } from '../common/format/number';
import { isObj } from '../common/utils/validator';

import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_PICKER as PARENT } from '../common/constant/parent-map';
import { toInject, nextTick, forceUpdate } from '../common/vue3/adapter';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';


const DEFAULT_DURATION = 200;

export default {
  name: 'PressPickerColumn',
  options: {
    ...defaultOptions,
  },
  mixins: [ScrollViewPureMixin],
  ...toInject(PARENT),

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
    this[PARENT].children.push(this);
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
      });
    },
    onTouchMove(event) {
      if (!event.touches[0]) return;
      const deltaY = event.touches[0].clientY - this.startY;
      this.setData({
        offset: range(this.startOffset + deltaY, -(this.getCount() * this.itemHeight), this.itemHeight),
      });
    },
    onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.setData({ duration: DEFAULT_DURATION });
        const index = range(Math.round(-this.offset / this.itemHeight), 0, this.getCount() - 1);
        this.setIndex(index, true);
      }
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
