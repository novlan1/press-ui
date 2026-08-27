<template>
  <div
    :class="checkboxClass"
    :style="wrapStyle"
  >
    <div
      v-if="labelPosition === 'left'"
      :class="innerLabelClass"
      @click.stop="onClickLabel"
    >
      <slot />
    </div>
    <div
      class="press-checkbox__icon-wrap"
      @click.stop="toggle"
    >
      <slot
        v-if="useIconSlot"
        name="icon"
      />
      <PressIcon
        v-else
        name="success"
        size="0.8em"
        :style="iconStyle"
        :class="innerIconClass"
        :custom-class="iconCustomClass"
        :custom-style="iconCustomStyle"
      />
    </div>
    <div
      v-if="labelPosition === 'right'"
      :class="innerLabelClass"
      @click.stop="onClickLabel"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_CHECKBOX_GROUP as PARENT } from '../common/constant/parent-map';
import { formValidate } from '../common/utils/parent';
import { style } from '../common/utils/style';

import { nextTick } from '../common/utils/system';
import utils from '../common/utils/utils';
import { ChildrenMixin } from '../mixins/basic/relation';

import PressIcon from '../press-icon/press-icon.vue';

import computed from './index';


function emit(target, value) {
  target.$emit('input', value);
  target.$emit('change', value);
}

export default {
  name: 'PressCheckbox',
  options: {
    ...defaultOptions,
  },
  components: {
    PressIcon,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  field: true,
  props: {
    name: {
      type: String,
      default: '',
    },
    value: Boolean,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      default: 'round',
    },
    iconSize: {
      type: [Number],
      default: 20,
    },
    iconClass: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
    ...defaultProps,
  },
  emits: ['input', 'change'],
  data() {
    return {
      parentDisabled: false,
      direction: 'vertical',
      dataValue: this.value,
    };
  },
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
    innerLabelClass() {
      const { labelClass, labelPosition, disabled, parentDisabled } = this;
      return `${labelClass} ${utils.bem2('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])}`;
    },
    checkboxClass() {
      const { direction, customClass } = this;
      return `${utils.bem2('checkbox', [{ horizontal: direction === 'horizontal' }])} ${customClass}`;
    },
    iconStyle() {
      const { checkedColor, value, disabled, parentDisabled, iconSize } = this;
      return computed.iconStyle(checkedColor, value, disabled, parentDisabled, iconSize);
    },
    innerIconClass() {
      const { shape, disabled, parentDisabled, dataValue } = this;
      return `${utils.bem2('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: dataValue }])}`;
    },
    iconCustomClass() {
      let result = this.iconClass;
      // #ifdef MP-ALIPAY
      result = `${this.innerIconClass} ${result}`;
      // #endif

      return result;
    },
    iconCustomStyle() {
      let result = 'line-height: 1.25em;';

      // #ifdef MP-ALIPAY
      result = `${this.iconStyle};${result}`;
      // #endif

      return result;
    },
  },
  watch: {
    value: {
      handler(val) {
        this.dataValue = !!val;
      },
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      if (this[PARENT]) {
        this[PARENT].updateChildren();
      }
    },
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    emitChange(value) {
      if (this[PARENT]) {
        this.setParentValue(this[PARENT], value);
      } else {
        emit(this, value);
      }

      nextTick(() => {
        formValidate(this, 'change');
      });
    },
    toggle() {
      const { parentDisabled, disabled, dataValue } = this;
      if (!disabled && !parentDisabled) {
        this.emitChange(!dataValue);
      }
    },
    onClickLabel() {
      const { labelDisabled, parentDisabled, disabled, dataValue } = this;
      if (!disabled && !labelDisabled && !parentDisabled) {
        this.emitChange(!dataValue);
      }
    },
    setParentValue(parent, value) {
      const parentValue = parent.value.slice();
      const { name } = this;
      const { max } = parent;
      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }
        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);
        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
