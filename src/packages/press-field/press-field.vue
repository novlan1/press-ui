<template>
  <div
    class="press-field-index"
    :class="customClass"
    :style="wrapperStyle"
  >
    <PressCell
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
      @click="clickWrap"
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

      <div :class="[utils.bem2('field__body', [type])]">
        <div
          :class="[utils.bem2('field__control', [inputAlign, 'custom'])]"
          @click="onClickInput"
        >
          <slot name="input" />
        </div>
        <textarea
          v-if="type === 'textarea'"
          ref="input"
          :class="[
            utils.bem2('field__control', [inputAlign, type, { disabled, error, readonly }]),
            inputClass
          ]"
          :fixed="fixed"
          :focus="focus"
          :cursor="cursor"
          :value="innerValue"
          :auto-focus="autoFocus"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :placeholder-class="'' + utils.bem2('field__placeholder', { error, disabled, readonly})"
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
          :class="[
            utils.bem2('field__control', [inputAlign, { disabled, error, readonly }]),
            inputClass
          ]"
          :type="type"
          :focus="focus"
          :cursor="cursor"
          :value="innerValue"
          :auto-focus="autoFocus"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :placeholder-class="'' + utils.bem2('field__placeholder', { error, disabled, readonly })"
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

        <PressIconPlus
          v-if="showClear"
          :name="clearIcon"
          class="press-field__clear-root press-field__icon-root"
          @click="onClear"
        />
        <div
          class="press-field__icon-container"
          @click="onClickIcon"
        >
          <PressIconPlus
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
        <div :class="[utils.bem2('field__word-num', { full: innerValue.length >= maxlength })]">
          {{ innerValue.length >= maxlength ? maxlength : innerValue.length }}
        </div>/{{ maxlength }}
      </div>

      <div
        v-if="errorMessage"
        :class="[utils.bem2('field__error-message', [errorMessageAlign, { disabled, error }])]"
      >
        {{ errorMessage }}
      </div>
    </PressCell>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getEventDetail, getEventValue } from '../common/dom/event';
import { formValidate } from '../common/utils/parent';

import { getRootScrollTop, setRootScrollTop } from '../common/utils/scroll';
import utils from '../common/utils/utils';
import { isObject } from '../common/utils/validator';

import { nextTick, vModelMixin } from '../common/vue3/adapter';
import PressCell from '../press-cell/press-cell.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

import computed from './computed';
import { commonProps, inputProps, textareaProps } from './props';


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
    customStyle: { type: [String, Object], default: '' },
    wrapperStyle: { type: String, default: '' },
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
    'update:modelValue',
    'click',
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
      formValidate(this, 'blur');

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

        formValidate(this, 'change');
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
    clickWrap() {
      this.$emit('click');
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
<style>
/* ::-webkit-scrollbar {
  display: none;
} */
</style>
