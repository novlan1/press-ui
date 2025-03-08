<template>
  <div class="press-search-index">
    <div
      :class="[
        customClass,
        utils.bem2('search', { withaction: showAction || useActionSlot })
      ]"
      :style="'background: '+(background)"
    >
      <div :class="[utils.bem2('search__content', [shape])]">
        <div
          v-if="label"
          class="press-search__label"
        >
          {{ label }}
        </div>
        <slot
          v-else
          name="label"
        />

        <PressField
          type="search"
          :left-icon="(!useLeftIconSlot ? leftIcon : '')"
          :right-icon="(!useRightIconSlot ? rightIcon : '')"
          :focus="focus"
          :error="error"
          :border="false"
          confirm-type="search"
          :class="fieldBaseClass"
          :custom-class="fieldCustomClass"
          :value="innerValue"
          :model-value="innerValue"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="clearable"
          :clear-trigger="clearTrigger"
          :clear-icon="clearIcon"
          :maxlength="maxlength"
          :input-align="inputAlign"
          :input-class="inputClass"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
          @blur="onBlur"
          @focus="onFocus"
          @change="onChange"
          @confirm="onSearch"
          @clear="onClear"
          @click-input="onClickInput"
        >
          <template #left-icon>
            <slot
              v-if="useLeftIconSlot"
              name="left-icon"
            />
          </template>

          <template #right-icon>
            <slot
              v-if="useRightIconSlot"
              name="right-icon"
            />
          </template>
        </PressField>
      </div>

      <div
        v-if="showAction || useActionSlot"
        class="press-search__action"
        hover-class="press-search__action--hover"
        hover-stay-time="70"
      >
        <slot
          v-if="useActionSlot"
          name="action"
        />
        <div
          v-else
          :class="cancelClass"
          @click="onCancel"
        >
          {{ actionText }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PressField from '../press-field/press-field.vue';
import utils from '../common/utils/utils';
import { t } from '../locale';


export default {
  name: 'PressSearch',
  components: {
    PressField,
  },
  field: true,
  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: { type: String, default: '' },
    showAction: Boolean,
    useActionSlot: Boolean,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      default: 'search',
    },
    rightIcon: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    placeholderStyle: { type: String, default: '' },
    actionText: {
      type: String,
      default: t('cancel'),
    },
    background: {
      type: String,
      default: '#ffffff',
    },
    maxlength: {
      type: Number,
      default: -1,
    },
    shape: {
      type: String,
      default: 'square',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    clearTrigger: {
      type: String,
      default: 'focus',
    },
    clearIcon: {
      type: String,
      default: 'clear',
    },
    customClass: {
      type: String,
      default: '',
    },
    fieldClass: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    cancelClass: {
      type: String,
      default: '',
    },
  },
  emits: [
    'change',
    'cancel',
    'search',
    'focus',
    'blur',
    'clear',
    'click-input',
  ],
  data() {
    return {
      utils,

      innerValue: this.value,
    };
  },
  computed: {
    fieldBaseClass() {
      return `press-search__field ${this.fieldClass}`;
    },
    fieldCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = this.fieldBaseClass;
      // #endif
      return result;
    },
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val;
      },
    },
  },
  methods: {
    onChange(value) {
      // Vue3下，payload 可能为Event对象
      if (typeof value === 'string') {
        this.innerValue = value;
        this.$emit('change', value);
      }
    },
    onCancel() {
      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/vant-ui/vant-weapp/issues/1768
       */
      setTimeout(() => {
        this.$emit('cancel');
        this.$emit('change', '');
      }, 200);
    },
    onSearch(value) {
      this.$emit('search', value);
    },
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
    onClear() {
      this.innerValue = '';
      this.onChange(this.innerValue);
      this.$emit('clear');
    },
    onClickInput() {
      this.$emit('click-input');
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
