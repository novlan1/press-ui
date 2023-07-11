<template>
  <uni-shadow-root class="press-slider-index">
    <div
      :class="'custom-class '+(utils.bem2('slider', { disabled, vertical }))"
      :style="wrapperStyle"
      @click="onClick"
    >
      <div
        :class="'' + utils.bem2('slider__bar')"
        :style="(barStyle)+'; '+(style({ backgroundColor: activeColor }))"
      >
        <div
          v-if="range"
          :class="'' + utils.bem2('slider__button-wrapper-left')"
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
            :class="'' + utils.bem2('slider__button')"
          />
        </div>
        <div
          v-if="range"
          :class="'' + utils.bem2('slider__button-wrapper-right')"
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
            :class="'' + utils.bem2('slider__button')"
          />
        </div>

        <div
          v-if="(!range)"
          :class="'' + utils.bem2('slider__button-wrapper')"
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
            :class="'' + utils.bem2('slider__button')"
          />
        </div>
      </div>
    </div>
  </uni-shadow-root>
</template>
<script>
import utils from '../common/utils/utils';
import { style } from '../common/utils/style';

import { touch } from '../mixins/touch';
import { canIUseModel } from '../common/utils/version';
import { getRect } from '../common/dom/rect';
import { addUnit } from '../common/format/unit';
export default {
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
      // observer(val) {
      //   if (val !== this.value) {
      //     this.updateValue(val);
      //   }
      // },
    },
    vertical: Boolean,
    barHeight: { type: [Number, String], default: '' },
  },
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
      if (typeof index === 'number') {
        this.buttonIndex = index;
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
          this.newValue[this.buttonIndex] =                        this.startValue[this.buttonIndex] + diff;
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
        const touch = event.touches[0];
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
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-slider {
  position: relative;
  height: var(--slider-bar-height, $slider-bar-height);
  border-radius: $border-radius-max;
  background-color: var(
    --slider-inactive-background-color,
    $slider-inactive-background-color
  );

  // use pseudo element to expand click area
  &::before {
    position: absolute;
    right: 0;
    left: 0;
    content: "";
    top: calc(-1 * var(--padding-xs, $padding-xs));
    bottom: calc(-1 * var(--padding-xs, $padding-xs));
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(
      --slider-active-background-color,
      $slider-active-background-color
    );
    border-radius: inherit;
    transition: all $animation-duration-fast;
  }

  &__button {
    width: var(--slider-button-width, $slider-button-width);
    height: var(--slider-button-height, $slider-button-height);
    border-radius: var(
      --slider-button-border-radius,
      $slider-button-border-radius
    );
    box-shadow: var(--slider-button-box-shadow, $slider-button-box-shadow);
    background-color: var(
      --slider-button-background-color,
      $slider-button-background-color
    );

    &-wrapper,
    &-wrapper-right {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate3d(50%, -50%, 0);
    }

    &-wrapper-left {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &--disabled {
    opacity: var(--slider-disabled-opacity, $slider-disabled-opacity);
  }

  &--vertical {
    display: inline-block;
    width: var(--slider-bar-height, $slider-bar-height);
    height: 100%;

    .press-slider__button-wrapper,
    .press-slider__button-wrapper-right {
      top: auto;
      right: 50%;
      bottom: 0;
      transform: translate3d(50%, 50%, 0);
    }

    .press-slider__button-wrapper-left {
      top: 0;
      right: 50%;
      left: auto;
      transform: translate3d(50%, -50%, 0);
    }

    // use pseudo element to expand click area
    &::before {
      top: 0;
      right: -$padding-xs;
      bottom: 0;
      left: -$padding-xs;
    }
  }
}
</style>
