<template>
  <div class="press-stepper-index">
    <div :class="(utils.bem2('stepper', [theme]))+' custom-class'">
      <div
        v-if="showMinus"
        data-type="minus"
        :style="'' + computed.buttonStyle({ buttonSize })"
        :class="'minus-class '+
          (utils.bem2('stepper__minus', { disabled: disabled || disableMinus || currentValue <= min }))"
        hover-class="press-stepper__minus--hover"
        hover-stay-time="70"
        @click="onTap"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <slot name="minus" />
      </div>
      <input
        :always-embed="false"
        :type="integer ? 'number' : 'digit'"
        :class="'input-class '+
          (utils.bem2('stepper__input', { disabled: disabled || disableInput }))"
        :style="'' + computed.inputStyle({ buttonSize, inputWidth })"
        :value="currentValue"
        :focus="focus"
        :disabled="disabled || disableInput"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
      <div
        v-if="showPlus"
        data-type="plus"
        :style="'' + computed.buttonStyle({ buttonSize })"
        :class="'plus-class '+
          (utils.bem2('stepper__plus', { disabled: disabled || disablePlus || currentValue >= max }))"
        hover-class="press-stepper__plus--hover"
        hover-stay-time="70"
        @click="onTap"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <slot name="plus" />
      </div>
    </div>
  </div>
</template>
<script>
import { isDef } from '../common/utils/validator';
import utils from '../common/utils/utils';
import computed from './computed';
import { getEventDetail, getEventValue } from '../common/dom/event';


const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;


// add num and avoid float number
function add(num1, num2) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
function equal(value1, value2) {
  return String(value1) === String(value2);
}


export default {
  name: 'PressStepper',
  field: true,
  classes: ['input-class', 'plus-class', 'minus-class'],
  props: {
    value: {
      type: [Number, String],
      default: 0,
      // observer: 'observeValue',
    },
    integer: {
      type: Boolean,
      // observer: 'check',
    },
    disabled: Boolean,
    inputWidth: { type: String, default: '' },
    buttonSize: { type: String, default: '' },
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      default: 0,
      // observer: 'check',
    },
    min: {
      type: Number,
      default: 1,
      // observer: 'check',
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
      // observer: 'check',
    },
    step: {
      type: Number,
      default: 1,
    },
    showPlus: {
      type: Boolean,
      default: true,
    },
    showMinus: {
      type: Boolean,
      default: true,
    },
    disablePlus: Boolean,
    disableMinus: Boolean,
    longPress: {
      type: Boolean,
      default: true,
    },
    theme: { type: String, default: '' },
    alwaysEmbed: Boolean,
  },
  emits: ['focus', 'blur', 'change', 'overlimit', 'minus', 'plus'],
  data() {
    return {
      currentValue: '',
      focus: false,

      utils,
      computed,
    };
  },
  watch: {
    value: {
      handler() {
        this.observeValue();
      },
    },
    integer: {
      handler() {
        this.check();
      },
    },
    decimalLength: {
      handler() {
        this.check();
      },
    },
    min: {
      handler() {
        this.check();
      },
    },
    max: {
      handler() {
        this.check();
      },
    },
  },
  created() {
    this.currentValue = this.format(this.value);
    // this.setData({
    //   currentValue: this.format(this.value),
    // });
  },
  methods: {
    observeValue() {
      const { value, currentValue } = this;
      if (!equal(value, currentValue)) {
        this.currentValue = this.format(value);
      }
    },
    check() {
      const val = this.format(this.currentValue);
      if (!equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },
    isDisabled(type) {
      const { disabled, disablePlus, disableMinus, currentValue, max, min } = this;
      if (type === 'plus') {
        return disabled || disablePlus || currentValue >= max;
      }
      return disabled || disableMinus || currentValue <= min;
    },
    onFocus(event) {
      this.$emit('focus', getEventDetail(event));
    },
    onBlur(event) {
      const value = this.format(getEventValue(event));
      this.emitChange(value);
      this.$emit('blur', Object.assign(Object.assign({}, getEventDetail(event)), { value }));
    },
    // filter illegal characters
    filter(value) {
      value = String(value).replace(/[^0-9.-]/g, '');
      if (this.integer && value.indexOf('.') !== -1) {
        value = value.split('.')[0];
      }
      return value;
    },
    // limit value range
    format(value) {
      value = this.filter(value);
      // format range
      value = value === '' ? 0 : +value;
      value = Math.max(Math.min(this.max, value), this.min);
      // format decimal
      if (isDef(this.decimalLength)) {
        value = value.toFixed(this.decimalLength);
      }
      return value;
    },
    onInput(event) {
      const value = getEventValue(event);

      // allow input to be empty
      if (value === '') {
        return;
      }
      let formatted = this.filter(value);
      // limit max decimal length
      if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
        const pair = formatted.split('.');
        formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      }
      this.emitChange(formatted);
    },
    emitChange(value) {
      if (!this.asyncChange) {
        this.currentValue = value;
      }
      this.$emit('change', value);
    },
    onChange() {
      const { type } = this;
      if (this.isDisabled(type)) {
        this.$emit('overlimit', type);
        return;
      }
      const diff = type === 'minus' ? -this.step : +this.step;
      const value = this.format(add(+this.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },
    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },
    onTap(event) {
      const { type } = event.currentTarget.dataset;
      this.type = type;
      this.onChange();
    },
    onTouchStart(event) {
      if (!this.longPress) {
        return;
      }
      clearTimeout(this.longPressTimer);
      const { type } = event.currentTarget.dataset;
      this.type = type;
      this.isLongPress = false;
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd() {
      if (!this.longPress) {
        return;
      }
      clearTimeout(this.longPressTimer);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-stepper {
  font-size: 0;

  &__minus,
  &__plus {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin: 1px;
    vertical-align: middle;
    border: 0;
    background-color: var(
      --stepper-background-color,
      $stepper-background-color
    );
    color: var(--stepper-button-icon-color, $stepper-button-icon-color);
    width: var(--stepper-input-height, $stepper-input-height);
    height: var(--stepper-input-height, $stepper-input-height);
    padding: var(--padding-base, $padding-base);

    &::before {
      width: 9px;
      height: 1px;
    }

    &::after {
      width: 1px;
      height: 9px;
    }

    &:empty.press-stepper__minus::before,
    &:empty.press-stepper__plus::before,
    &:empty.press-stepper__minus::after,
    &:empty.press-stepper__plus::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: currentColor;
      content: "";
    }

    &--hover {
      background-color: var(--stepper-active-color, $stepper-active-color);
    }

    &--disabled {
      color: var(
        --stepper-button-disabled-icon-color,
        $stepper-button-disabled-icon-color
      );
      background-color: var(
        --stepper-button-disabled-color,
        $stepper-button-disabled-color
      );
    }

    &--disabled.press-stepper__minus--hover,
    &--disabled.press-stepper__plus--hover {
      background-color: var(
        --stepper-button-disabled-color,
        $stepper-button-disabled-color
      );
    }
  }

  &__minus {
    border-radius: var(
        --stepper-border-radius,
        var(--stepper-border-radius, $stepper-border-radius)
      )
      0 0
      var(
        --stepper-border-radius,
        var(--stepper-border-radius, $stepper-border-radius)
      );

    &::after {
      display: none;
    }
  }

  &__plus {
    border-radius: 0
      var(
        --stepper-border-radius,
        var(--stepper-border-radius, $stepper-border-radius)
      )
      var(
        --stepper-border-radius,
        var(--stepper-border-radius, $stepper-border-radius)
      )
      0;
  }

  &--round {
    .press-stepper__input {
      background-color: transparent !important;
    }

    .press-stepper__plus,
    .press-stepper__minus {
      border-radius: 100%;

      &:active {
        opacity: $active-opacity;
      }

      &--disabled {
        &,
        &:active {
          opacity: 0.3;
        }
      }
    }

    .press-stepper__plus {
      color: $white;
      background-color: $stepper-button-round-theme-color;
    }

    .press-stepper__minus {
      color: $stepper-button-round-theme-color;
      background-color: $white;
      border: 1px solid $stepper-button-round-theme-color;
    }
  }

  &__input {
    display: inline-block;
    box-sizing: border-box;
    // 覆盖 common style 中 input 的 min-height: 1.4rem;
    // 避免 button-size 对 input 设置的 height 不生效
    min-height: 0;
    margin: 1px;
    padding: 1px;
    text-align: center;
    vertical-align: middle;
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-appearance: none;
    font-size: var(--stepper-input-font-size, $stepper-input-font-size);
    color: var(--stepper-input-text-color, $stepper-input-text-color);
    background-color: var(
      --stepper-background-color,
      $stepper-background-color
    );
    width: var(--stepper-input-width, $stepper-input-width);
    height: var(--stepper-input-height, $stepper-input-height);
    user-select: auto;

    &--disabled {
      color: var(
        --stepper-input-disabled-text-color,
        $stepper-input-disabled-text-color
      );
      background-color: var(
        --stepper-input-disabled-background-color,
        $stepper-input-disabled-background-color
      );
    }
  }
}
</style>
