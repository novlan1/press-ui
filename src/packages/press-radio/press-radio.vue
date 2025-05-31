<template>
  <div class="press-radio-index">
    <div
      :class="[
        utils.bem2('radio', [direction]),
        customClass
      ]"
    >
      <div
        v-if="labelPosition === 'left'"
        :class="radioLabelClass"
        @click="onClickLabel"
      >
        <slot />
      </div>
      <div
        class="press-radio__icon-wrap"
        :style="'font-size: '+(utils.addUnit(iconSize))"
        @click="onChange"
      >
        <slot
          v-if="useIconSlot"
          name="icon"
        />
        <PressIconPlus
          v-else
          name="success"
          :class="radioIconClass"
          :custom-class="radioIconCustomClass"
          :custom-style="'' +
            computed.iconCustomStyle({ iconSize, checkedColor, disabled, parentDisabled, value: dataValue, name })"
        />
      </div>
      <div
        v-if="labelPosition === 'right'"
        :class="radioLabelClass"
        @click="onClickLabel"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_RADIO_GROUP as PARENT } from '../common/constant/parent-map';
import { formValidate } from '../common/utils/parent';

import utils from '../common/utils/utils';
import { canIUseModel } from '../common/utils/version';
import { ChildrenMixin } from '../mixins/basic/relation';

import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

import computed from './computed';


export default {
  name: 'PressRadio',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  field: true,
  props: {
    name: { type: [String, Number], default: '' },
    value: { type: [String, Number], default: '' },
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: { type: String, default: '' },
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
      type: null,
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
    ...defaultProps,
  },
  emits: ['input', 'change'],
  data() {
    return {
      direction: '',
      parentDisabled: false,
      dataValue: this.value,

      utils,
      computed,
    };
  },
  computed: {
    radioIconClass() {
      const {
        shape,
        disabled,
        parentDisabled,
        dataValue: value,
        name,
      } = this;
      return `${utils.bem2('radio__icon', [shape, { disabled: disabled || parentDisabled, checked: value === name }])}`;
    },
    radioIconCustomClass() {
      let result = this.iconClass;
      // #ifdef MP-ALIPAY
      result = `${result} ${this.radioIconClass}`;
      // #endif
      return result;
    },
    radioLabelClass() {
      const {
        labelPosition,
        disabled,
        parentDisabled,
        labelClass,
      } = this;
      return `${utils.bem2('radio__label', [labelPosition, { disabled: disabled || parentDisabled }])} ${labelClass}`;
    },
  },
  mounted() {
    this.updateFromParent();
  },
  methods: {
    updateFromParent() {
      if (!this[PARENT]) {
        return;
      }
      const { value, disabled: parentDisabled, direction } = this[PARENT];
      // this.value = value;
      this.dataValue = value;
      this.direction = direction;
      this.parentDisabled = parentDisabled;
    },
    emitChange(value) {
      const instance = this[PARENT] || this;
      instance.$emit('input', value);
      instance.$emit('change', value);

      formValidate(this, 'change');

      if (canIUseModel()) {
        instance.value = value;
        // instance.setData({ value });
      }
    },
    onChange() {
      if (!this.disabled && !this.parentDisabled) {
        this.emitChange(this.name);
      }
    },
    onClickLabel() {
      const { disabled, parentDisabled, labelDisabled, name } = this;
      if (!(disabled || parentDisabled) && !labelDisabled) {
        this.emitChange(name);
      }
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
