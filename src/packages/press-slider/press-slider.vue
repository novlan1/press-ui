<template>
  <div
    class="press-slider-index"
    :style="customStyle"
  >
    <div
      :class="customClass + ' '+(utils.bem2('slider', { disabled, vertical }))"
      :style="wrapperStyle"
      @click="onClick"
    >
      <div
        :class="[utils.bem2('slider__bar')]"
        :style="(barStyle)+'; '+(style({ backgroundColor: activeColor }))"
      >
        <div
          v-if="range"
          :class="[utils.bem2('slider__button-wrapper-left')]"
          :data-index="0"
          @touchstart="onTouchStart"
          @touchmove.stop.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <slot
            v-if="useButtonSlot"
            name="left-button"
          />
          <div
            v-else
            :class="[utils.bem2('slider__button')]"
          />
        </div>
        <div
          v-if="range"
          :class="[utils.bem2('slider__button-wrapper-right')]"
          :data-index="1"
          @touchstart="onTouchStart"
          @touchmove.stop.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <slot
            v-if="useButtonSlot"
            name="right-button"
          />
          <div
            v-else
            :class="[utils.bem2('slider__button')]"
          />
        </div>

        <div
          v-if="(!range)"
          :class="[utils.bem2('slider__button-wrapper')]"
          @touchstart="onTouchStart"
          @touchmove.stop.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
        >
          <slot
            v-if="useButtonSlot"
            name="button"
          />
          <div
            v-else
            :class="[utils.bem2('slider__button')]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRect } from '../common/dom/rect';
import { addUnit } from '../common/format/unit';
import { style } from '../common/utils/style';
import utils from '../common/utils/utils';

import { canIUseModel } from '../common/utils/version';
import { touch } from '../mixins/touch';


export default {
  name: 'PressSlider',
  mixins: [touch],
  props: {
    range: Boolean,
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: { type: String, default: '' },
    inactiveColor: { type: String, default: '' },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: null,
      default: 0,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    barHeight: {
      type: [Number, String],
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    customStyle: {
      type: String,
      default: '',
    },
  },
  emits: ['drag-start', 'drag-end', 'drag', 'change'],
  data() {
    return {
      utils,
      style,
      barStyle: '',
      dataValue: this.value,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.dataValue) {
          this.updateValue(val);
        }
      },
    },
  },
  created() {
    this.updateValue(this.value);
  },
  methods: {
    onTouchStart(event) {
      if (this.disabled) return;
      const { index } = event.currentTarget.dataset;
      if (typeof index === 'number' || typeof index === 'string') {
        this.buttonIndex = +index;
      }
      this.touchStart(event);
      this.startValue = this.format(this.dataValue);
      this.newValue = this.dataValue;
      if (this.isRange(this.newValue)) {
        this.startValue = this.newValue.map(val => this.format(val));
      } else {
        this.startValue = this.format(this.newValue);
      }
      this.dragStatus = 'start';
    },
    onTouchMove(event) {
      if (this.disabled) return;
      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }
      this.touchMove(event);
      this.dragStatus = 'draging';
      getRect(this, '.press-slider').then((rect) => {
        const { vertical } = this;
        const delta = vertical ? this.deltaY : this.deltaX;
        const total = vertical ? rect.height : rect.width;
        const diff = (delta / total) * this.getRange();

        if (this.isRange(this.startValue)) {
          this.newValue[this.buttonIndex] = this.startValue[this.buttonIndex] + diff;
        } else {
          this.newValue = this.startValue + diff;
        }
        this.updateValue(this.newValue, false, true);
      });
    },
    onTouchEnd() {
      if (this.disabled) return;
      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }
    },
    onClick(event) {
      if (this.disabled) return;
      const { min } = this;
      getRect(this, '.press-slider').then((rect) => {
        const { vertical } = this;
        const touch = event.touches ? event.touches[0] : event;
        const delta = vertical
          ? touch.clientY - rect.top
          : touch.clientX - rect.left;
        const total = vertical ? rect.height : rect.width;
        const value = Number(min) + (delta / total) * this.getRange();
        if (this.isRange(this.dataValue)) {
          const [left, right] = this.dataValue;
          const middle = (left + right) / 2;
          if (value <= middle) {
            this.updateValue([value, right], true);
          } else {
            this.updateValue([left, value], true);
          }
        } else {
          this.updateValue(value, true);
        }
      });
    },
    isRange(val) {
      const { range } = this;
      return range && Array.isArray(val);
    },
    handleOverlap(value) {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }
      return value;
    },
    updateValue(value, end, drag) {
      if (this.isRange(value)) {
        value = this.handleOverlap(value).map(val => this.format(val));
      } else {
        value = this.format(value);
      }
      this.dataValue = value;
      const { vertical } = this;
      const mainAxis = vertical ? 'height' : 'width';
      this.wrapperStyle = `
          background: ${this.inactiveColor || ''};
          ${vertical ? 'width' : 'height'}: ${addUnit(this.barHeight) || ''};
        `;
      this.barStyle = `
          ${mainAxis}: ${this.calcMainAxis()};
          left: ${vertical ? 0 : this.calcOffset()};
          top: ${vertical ? this.calcOffset() : 0};
          ${drag ? 'transition: none;' : ''}
        `;
      if (drag) {
        this.$emit('drag', value);
      }
      if (end) {
        this.$emit('change', value);
      }
      if ((drag || end) && canIUseModel()) {
        // this.setData({ value });
        // this.value = value;
      }
    },
    getScope() {
      return Number(this.max) - Number(this.min);
    },
    getRange() {
      const { max, min } = this;
      return max - min;
    },
    // 计算选中条的长度百分比
    calcMainAxis() {
      const { dataValue: value } = this;
      const { min } = this;
      const scope = this.getScope();
      if (this.isRange(value)) {
        return `${((value[1] - value[0]) * 100) / scope}%`;
      }
      return `${((value - Number(min)) * 100) / scope}%`;
    },
    // 计算选中条的开始位置的偏移量
    calcOffset() {
      const { dataValue: value } = this;
      const { min } = this;
      const scope = this.getScope();
      if (this.isRange(value)) {
        return `${((value[0] - Number(min)) * 100) / scope}%`;
      }
      return '0%';
    },
    format(value) {
      const { max, min, step } = this;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
