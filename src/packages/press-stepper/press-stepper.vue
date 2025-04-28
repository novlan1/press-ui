<template>
  <div class="press-stepper-index">
    <div
      :class="[
        utils.bem2('stepper', [theme]),
        customClass
      ]"
    >
      <div
        v-if="showMinus"
        data-type="minus"
        :style="'' + computed.buttonStyle({ buttonSize })"
        :class="[
          minusClass,
          utils.bem2('stepper__minus', { disabled: disabled || disableMinus || currentValue <= min })
        ]"
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
        :class="inputClass + ' '+
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
        :class="plusClass + ' '+
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
import { getEventDetail, getEventValue } from '../common/dom/event';
import utils from '../common/utils/utils';
import { isDef } from '../common/utils/validator';

import computed from './computed';


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
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    integer: {
      type: Boolean,
    },
    disabled: Boolean,
    inputWidth: { type: String, default: '' },
    buttonSize: { type: String, default: '' },
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
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
    customClass: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    minusClass: {
      type: String,
      default: '',
    },
    plusClass: {
      type: String,
      default: '',
    },
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
<style scoped lang="scss" src="./css/index.scss">
</style>
