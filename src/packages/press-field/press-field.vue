<template>
  <div
    class="press-field-index"
    :class="customClass"
  >
    <press-cell
      :size="size"
      :icon="leftIcon"
      :center="center"
      :border="border"
      :is-link="isLink"
      :required="required"
      :clickable="clickable"
      :title-width="titleWidth"
      :title-style="(label || useLabelSlot) ? 'margin-right: 12px;': 'display: none;'"
      :use-title-slot="!!(useLabelSlot || label)"
      :custom-style="customStyle"
      :arrow-direction="arrowDirection"
      custom-class="press-field"
    >
      <template #icon>
        <slot
          name="left-icon"
        />
      </template>

      <template #title>
        <div
          v-if="label"
          :class="labelClass + ' '+(utils.bem2('field__label', { disabled }))"
        >
          {{ label }}
        </div>
        <slot
          v-else-if="useLabelSlot"
          name="label"
        />
      </template>

      <div :class="'' + utils.bem2('field__body', [type])">
        <div
          :class="'' + utils.bem2('field__control', [inputAlign, 'custom'])"
          @click="onClickInput"
        >
          <slot name="input" />
        </div>
        <textarea
          v-if="type === 'textarea'"
          ref="input"
          :class="'' + (utils.bem2('field__control', [inputAlign, type, { disabled, error }]))+' ' + inputClass"
          :fixed="fixed"
          :focus="focus"
          :cursor="cursor"
          :value="innerValue"
          :auto-focus="autoFocus"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :placeholder-class="'' + utils.bem2('field__placeholder', { error, disabled })"
          :auto-height="(!!autosize)"
          :style="'' + computed.inputStyle(autosize)"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjustPosition"
          :show-confirm-bar="showConfirmBar"
          :hold-keyboard="holdKeyboard"
          :selection-end="selectionEnd"
          :selection-start="selectionStart"
          :disable-default-padding="disableDefaultPadding"
          @input="onInput"
          @click="onClickInput"
          @blur="onBlur"
          @focus="onFocus"
          @confirm="onConfirm"
          @linechange="onLineChange"
          @keyboardheightchange="onKeyboardHeightChange"
        />

        <input
          v-else
          ref="input"
          :class="'' + (utils.bem2('field__control', [inputAlign, { disabled, error }]))+' ' + inputClass"
          :type="type"
          :focus="focus"
          :cursor="cursor"
          :value="innerValue"
          :auto-focus="autoFocus"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :placeholder-class="'' + utils.bem2('field__placeholder', { error })"
          :confirm-type="confirmType"
          :confirm-hold="confirmHold"
          :hold-keyboard="holdKeyboard"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjustPosition"
          :selection-end="selectionEnd"
          :selection-start="selectionStart"
          :always-embed="alwaysEmbed"
          :password="password || type === 'password'"
          @input="onInput"
          @click="onClickInput"
          @blur="onBlur"
          @focus="onFocus"
          @confirm="onConfirm"
          @keyboardheightchange="onKeyboardHeightChange"
        >

        <press-icon-plus
          v-if="showClear"
          :name="clearIcon"
          class="press-field__clear-root press-field__icon-root"
          @click.stop.prevent="onClear"
        />
        <div
          class="press-field__icon-container"
          @click="onClickIcon"
        >
          <press-icon-plus
            v-if="rightIcon || icon"
            :name="rightIcon || icon"
            :class="'press-field__icon-root '+(iconClass)"
            :custom-class="rightIconClass"
          />
          <slot name="right-icon" />
          <slot name="icon" />
        </div>
        <div class="press-field__button">
          <slot name="button" />
        </div>
      </div>

      <div
        v-if="showWordLimit && maxlength"
        class="press-field__word-limit"
      >
        <div :class="'' + utils.bem2('field__word-num', { full: innerValue.length >= maxlength })">
          {{ innerValue.length >= maxlength ? maxlength : innerValue.length }}
        </div>/{{ maxlength }}
      </div>

      <div
        v-if="errorMessage"
        :class="'' + utils.bem2('field__error-message', [errorMessageAlign, { disabled, error }])"
      >
        {{ errorMessage }}
      </div>
    </press-cell>
  </div>
</template>
<script>
import PressCell from '../press-cell/press-cell.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { commonProps, inputProps, textareaProps } from './props';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getRootScrollTop, setRootScrollTop } from '../common/utils/scroll';
import { isObject } from '../common/utils/validator';
import { getEventDetail, getEventValue } from '../common/dom/event';
import { nextTick, vModelMixin } from '../common/vue3/adapter';

export default {
  name: 'PressField',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  field: true,
  components: {
    PressCell,
    PressIconPlus,
  },
  mixins: [vModelMixin],
  props: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    size: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    error: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: { type: String, default: '' },
    rightIcon: { type: String, default: '' },
    autosize: { type: [Boolean, Object], default: false },
    required: Boolean,
    iconClass: { type: String, default: '' },
    clickable: Boolean,
    inputAlign: { type: String, default: '' },
    customStyle: { type: String, default: '' },
    errorMessage: { type: String, default: '' },
    arrowDirection: { type: String, default: '' },
    showWordLimit: Boolean,
    errorMessageAlign: { type: String, default: '' },
    useLabelSlot: Boolean, // 【修改点】解决小程序下cell中传递title问题
    readonly: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearable: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearTrigger: {
      type: String,
      default: 'focus',
    },
    border: {
      type: Boolean,
      default: true,
    },
    titleWidth: {
      type: String,
      default: '6.2em',
    },
    clearIcon: {
      type: String,
      default: 'clear',
    },
    inputClass: {
      type: String,
      default: '',
    },
    rightIconClass: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: [
    'focus',
    'blur',
    'click-icon',
    'click-input',
    'clear',
    'confirm',
    'linechange',
    'keyboardheightchange',
    'input',
    'change',
  ],
  data() {
    return {
      focused: false,
      innerValue: '',
      showClear: false,

      utils,
      computed,
    };
  },
  watch: {
    realModelValue: {
      handler(val) {
        this.innerValue = val;
        nextTick(this.adjustSize);
      },
    },
  },
  created() {
    this.innerValue = this.realModelValue;
  },
  mounted() {
    nextTick(this.adjustSize);
  },
  methods: {
    onInput(event) {
      const value = getEventValue(event);
      this.innerValue = value;
      this.setShowClear();
      this.emitChange();
      nextTick(this.adjustSize);
    },
    onFocus(event) {
      this.focused = true;
      this.setShowClear();
      this.$emit('focus', getEventDetail(event));
      nextTick(this.adjustSize);
    },
    onBlur(event) {
      this.focused = false;
      this.$emit('blur', getEventDetail(event));
      nextTick(this.adjustSize);

      setTimeout(() => {
        this.setShowClear();
      }, 200);
    },
    onClickIcon() {
      this.$emit('click-icon');
    },
    onClickInput(event) {
      this.$emit('click-input', getEventDetail(event));
    },
    onClear() {
      this.innerValue = '';
      // if (this.$refs.input) {
      //   this.$refs.input.value = '';
      // }
      this.setShowClear();
      nextTick(() => {
        this.emitChange();
        this.$emit('clear', '');
      });
    },
    onConfirm(event) {
      const value = getEventValue(event);
      this.innerValue = value;
      this.setShowClear();
      this.$emit('confirm', value);
    },
    setValue(value) {
      this.innerValue = value;
      this.setShowClear();
      if (value === '') {
        this.innerValue = '';
      }
      this.emitChange();
    },
    onLineChange(event) {
      this.$emit('linechange', getEventDetail(event));
    },
    onKeyboardHeightChange(event) {
      this.$emit('keyboardheightchange', getEventDetail(event));
    },
    emitChange() {
      nextTick(() => {
        // this.$emit('input', this.innerValue);
        this.emitModelValue(this.innerValue);
        this.$emit('change', this.innerValue);
      });
    },
    setShowClear() {
      const { clearable, readonly, clearTrigger } = this;
      const { focused, innerValue } = this;
      let showClear = false;
      if (clearable && !readonly) {
        const hasValue = !!innerValue;
        const trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);
        showClear = hasValue && trigger;
      }
      this.showClear = showClear;
    },
    adjustSize() {
      let { input } = this.$refs;
      if (!(this.type === 'textarea' && this.autosize)
        || !input
      ) {
        return;
      }

      if (!input.style) {
        input = input.$el;
      }
      if (!input || !input.style) return;

      const scrollTop = getRootScrollTop();
      input.style.height = 'auto';

      let height = input.scrollHeight;
      if (isObject(this.autosize)) {
        const { maxHeight, minHeight } = this.autosize;
        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }
        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = `${height}px`;
        // https://github.com/vant-ui/vant/issues/9178
        setRootScrollTop(scrollTop);
      }
    },
    noop() { },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-field {
  --cell-icon-size: var(--field-icon-size, $field-icon-size);

  &__label {
    color: var(--field-label-color, $field-label-color);

    &--disabled {
      color: var(--field-disabled-text-color, $field-disabled-text-color);
    }
  }

  &__body {
    display: flex;
    align-items: center;

    &--textarea {
      box-sizing: border-box;
      padding: 3.6px 0;
      line-height: 1.2em;
      min-height: var(--cell-line-height, $cell-line-height);
    }
  }

  &__control:empty + &__control {
    display: block;
  }

  &__control {
    position: relative;
    display: none;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 0;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    color: var(--field-input-text-color, $field-input-text-color);
    height: var(--cell-line-height, $cell-line-height);
    min-height: var(--cell-line-height, $cell-line-height);
    user-select: auto;
    outline: none;
    font: inherit;
    font-size: var(--field-font-size, $field-font-size);

    &:empty {
      display: none;
    }

    &--textarea {
      height: var(--field-text-area-min-height, $field-text-area-min-height);
      min-height: var(
        --field-text-area-min-height,
        $field-text-area-min-height
      );
    }

    &--error {
      color: var(--field-input-error-text-color, $field-input-error-text-color);
    }

    &--disabled {
      background-color: transparent;
      opacity: 1;
      color: var(
        --field-input-disabled-text-color,
        $field-input-disabled-text-color
      );
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--custom {
      display: flex;
      align-items: center;
      min-height: var(--cell-line-height, $cell-line-height);
    }
  }

  &__placeholder {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    color: var(--field-placeholder-text-color, $field-placeholder-text-color);

    &--error {
      color: var(--field-error-message-color, $field-error-message-color);
    }
  }

  &__icon-root {
    display: flex;
    align-items: center;
    min-height: var(--cell-line-height, $cell-line-height);
  }

  &__clear-root,
  &__icon-container {
    line-height: inherit;
    vertical-align: middle;
    padding: 0 var(--padding-xs, $padding-xs);
    margin-right: calc(-1 * var(--padding-xs, $padding-xs));
  }

  &__clear-root,
  &__icon-container,
  &__button {
    flex-shrink: 0;
  }

  &__clear-root {
    font-size: var(--field-clear-icon-size, $field-clear-icon-size);
    color: var(--field-clear-icon-color, $field-clear-icon-color);
  }

  &__icon-container {
    font-size: var(--field-icon-size, $field-icon-size);
    color: var(--field-icon-container-color, $field-icon-container-color);

    &:empty {
      display: none;
    }
  }

  &__button {
    padding-left: var(--padding-xs, $padding-xs);

    &:empty {
      display: none;
    }
  }

  &__error-message {
    text-align: left;
    font-size: var(
      --field-error-message-text-font-size,
      $field-error-message-text-font-size
    );
    color: var(--field-error-message-color, $field-error-message-color);

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__word-limit {
    text-align: right;
    margin-top: var(--padding-base, $padding-base);
    color: var(--field-word-limit-color, $field-word-limit-color);
    font-size: var(--field-word-limit-font-size, $field-word-limit-font-size);
    line-height: var(
      --field-word-limit-line-height,
      $field-word-limit-line-height
    );
  }

  &__word-num {
    display: inline;

    &--full {
      color: var(--field-word-num-full-color, $field-word-num-full-color);
    }
  }
}
</style>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
