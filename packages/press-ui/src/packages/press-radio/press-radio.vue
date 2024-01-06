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
        <press-icon-plus
          v-else
          name="success"
          :class="radioIconClass"
          :custom-class="iconClass"
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
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { canIUseModel } from '../common/utils/version';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_RADIO_GROUP as PARENT } from '../common/constant/parent-map';


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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-radio {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  &__icon-wrap {
    flex: none;
  }

  &--horizontal {
    margin-right: var(--padding-sm, $padding-sm);
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
    border: 1px solid var(--radio-border-color, $radio-border-color);
    font-size: var(--radio-size, $radio-size);
    transition-duration: var(
      --radio-transition-duration,
      $radio-transition-duration
    );

    &--round {
      border-radius: 100%;
      .press-icon {
        // 【修改点】
        border-radius: 100%;
      }
    }

    &--checked {
      color: $white;
      background-color: var(
        --radio-checked-icon-color,
        $radio-checked-icon-color
      );
      border-color: var(--radio-checked-icon-color, $radio-checked-icon-color);
    }

    &--disabled {
      background-color: var(
        --radio-disabled-background-color,
        $radio-disabled-background-color
      );
      border-color: var(
        --radio-disabled-icon-color,
        $radio-disabled-icon-color
      );
    }

    &--disabled.press-radio__icon--checked {
      color: var(--radio-disabled-icon-color, $radio-disabled-icon-color);
    }
  }

  &__label {
    word-wrap: break-word;
    padding-left: var(--radio-label-margin, $radio-label-margin);
    color: var(--radio-label-color, $radio-label-color);
    line-height: var(--radio-size, $radio-size);

    &--left {
      float: left;
      margin: 0 var(--radio-label-margin, $radio-label-margin) 0 0;
    }

    &--disabled {
      color: var(--radio-disabled-label-color, $radio-disabled-label-color);
    }

    &:empty {
      margin: 0;
    }
  }
}
</style>
