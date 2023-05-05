<template>
  <uni-shadow-root class="press-search-index">
    <div
      :class="'custom-class ' + (utils.bem2('search', { withaction: showAction || useActionSlot }))"
      :style="'background: '+(background)"
    >
      <div :class="'' + utils.bem2('search__content', [shape])">
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

        <press-field
          type="search"
          :left-icon="(!useLeftIconSlot ? leftIcon : '')"
          :right-icon="(!useRightIconSlot ? rightIcon : '')"
          :focus="focus"
          :error="error"
          :border="false"
          confirm-type="search"
          class="press-search__field field-class"
          :value="innerValue"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="clearable"
          :clear-trigger="clearTrigger"
          :clear-icon="clearIcon"
          :maxlength="maxlength"
          :input-align="inputAlign"
          input-class="input-class"
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
          <slot
            v-if="useLeftIconSlot"
            slot="left-icon"
            name="left-icon"
          />
          <slot
            v-if="useRightIconSlot"
            slot="right-icon"
            name="right-icon"
          />
        </press-field>
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
          class="cancel-class"
          @click="onCancel"
        >
          {{ actionText }}
        </div>
      </div>
    </div>
  </uni-shadow-root>
</template>
<script>
import PressField from '../press-field/press-field.vue';
import utils from '../common/utils/utils';
import { t } from '../locale';

export default {
  components: {
    PressField,
  },
  field: true,
  classes: ['field-class', 'input-class', 'cancel-class'],
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
  },
  data() {
    return {
      utils,

      innerValue: this.value,
    };
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
      this.innerValue = value;
      this.$emit('change', value);
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
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--search-padding, $search-padding);

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--padding-sm, $padding-sm);
    border-radius: $border-radius-sm;
    background-color: var(--search-background-color, $search-background-color);

    &--round {
      border-radius: $border-radius-max;
    }
  }

  &__label {
    padding: var(--search-label-padding, $search-label-padding);
    font-size: var(--search-label-font-size, $search-label-font-size);
    line-height: var(--search-input-height, $search-input-height);
    color: var(--search-label-color, $search-label-color);
  }

  &__field {
    flex: 1;

    &__left-icon {
      color: var(--search-left-icon-color, $search-left-icon-color);
    }
  }

  &--withaction {
    padding-right: 0;
  }

  &__action {
    padding: var(--search-action-padding, $search-action-padding);
    font-size: var(--search-action-font-size, $search-action-font-size);
    line-height: var(--search-input-height, $search-input-height);
    color: var(--search-action-text-color, $search-action-text-color);

    &--hover {
      background-color: $active-color;
    }
  }
}
</style>
