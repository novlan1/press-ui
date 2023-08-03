<template>
  <div
    :class="checkboxClass"
    :style="customStyle"
  >
    <div
      v-if="labelPosition === 'left'"
      :class="labelClass"
      @click="onClickLabel"
    >
      <slot />
    </div>
    <div
      class="press-checkbox__icon-wrap"
      @click="toggle"
    >
      <slot
        v-if="useIconSlot"
        name="icon"
      />
      <press-icon-plus
        v-else
        name="success"
        size="0.8em"
        :class="cIconClass"
        :style="iconStyle"
        :custom-class="iconClass"
        custom-style="line-height: 1.25em;"
      />
    </div>
    <div
      v-if="labelPosition === 'right'"
      :class="cLabelClass"
      @click="onClickLabel"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import utils from '../common/utils/utils';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import computed from './index';
import { PARENT_CHECKBOX_GROUP as PARENT } from '../common/constant/parent-map';

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
    PressIconPlus,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  field: true,
  classes: ['icon-class', 'label-class'],
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
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  data() {
    return {
      parentDisabled: false,
      direction: 'vertical',
      dataValue: this.value,
    };
  },
  computed: {
    cLabelClass() {
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
    cIconClass() {
      const { shape, disabled, parentDisabled, dataValue } = this;
      return `${utils.bem2('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: dataValue }])}`;
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
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-checkbox {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  &--horizontal {
    margin-right: $padding-sm;
  }

  &__icon-wrap,
  &__label {
    line-height: var(--checkbox-size, $checkbox-size);
  }

  &__icon-wrap {
    flex: none;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    color: transparent;
    text-align: center;
    transition-property: color, border-color, background-color;
    font-size: var(--checkbox-size, $checkbox-size);
    border: 1px solid var(--checkbox-border-color, $checkbox-border-color);
    transition-duration: var(
      --checkbox-transition-duration,
      $checkbox-transition-duration
    );

    &--round {
      border-radius: 100%;
    }

    &--checked {
      color: $white;
      background-color: var(
        --checkbox-checked-icon-color,
        $checkbox-checked-icon-color
      );
      border-color: var(
        --checkbox-checked-icon-color,
        $checkbox-checked-icon-color
      );
    }

    &--disabled {
      background-color: var(
        --checkbox-disabled-background-color,
        $checkbox-disabled-background-color
      );
      border-color: var(
        --checkbox-disabled-icon-color,
        $checkbox-disabled-icon-color
      );

      &.press-checkbox__icon--checked {
        color: var(
          --checkbox-disabled-icon-color,
          $checkbox-disabled-icon-color
        );
      }
    }
  }

  &__label {
    word-wrap: break-word;
    padding-left: var(--checkbox-label-margin, $checkbox-label-margin);
    color: var(--checkbox-label-color, $checkbox-label-color);

    &--left {
      float: left;
      margin: 0 var(--checkbox-label-margin, $checkbox-label-margin) 0 0;
    }

    &--disabled {
      color: var(
        --checkbox-disabled-label-color,
        $checkbox-disabled-label-color
      );
    }

    &:empty {
      margin: 0;
    }
  }
}
</style>
