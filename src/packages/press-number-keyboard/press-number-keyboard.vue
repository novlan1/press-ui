<template>
  <PressPopup
    :show="show"
    :z-index="zIndex"
    position="bottom"
    :round="roundComputed"
    overlay-style="background-color: transparent;"
    :safe-area-inset-bottom="false"
    @close="onClose"
  >
    <div :class="wrapClass">
      <div
        v-if="toolbar"
        class="press-number-keyboard__toolbar"
      >
        <button
          v-if="cancelButtonText"
          class="press-number-keyboard__cancel"
          hover-class="press-number-keyboard__cancel--hover"
          data-action="cancel"
          @click="onActionClick"
        >
          {{ cancelButtonText }}
        </button>
        <div
          class="press-number-keyboard__title"
        >
          {{ title }}
        </div>
        <button
          v-if="confirmButtonText"
          class="press-number-keyboard__confirm"
          hover-class="press-number-keyboard__confirm--hover"
          data-action="confirm"
          @click="onActionClick"
        >
          {{ confirmButtonText }}
        </button>
      </div>

      <div :class="padClass">
        <button
          v-for="(item, index) of keys"
          :key="item"
          :class="true ? getButtonClass(item, index) : ''"
          hover-class="press-number-keyboard__button--hover"
          @click="onKeyboardClick(item)"
        >
          {{ item }}
        </button>
        <!-- 去掉 .prevent 否则非 uni-app 下无法触发 active 状态，即没有灰色背景 -->
        <button
          :class="true ? getButtonClass('backspace'): ''"
          hover-class="press-number-keyboard__button--hover"
          @touchstart.stop="onBackspaceStart"
          @touchend="onBackspaceEnd"
        >
          <PressIconPlusDelete class="press-number-keyboard__delete-icon" />
        </button>
        <button
          v-if="mode === 'accounting'"
          :class="true ? getButtonClass('confirm') : ''"
          hover-class="press-number-keyboard__button--confirm-hover"
          data-action="confirm"
          @click="onActionClick"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </PressPopup>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import { vModelMixin } from '../common/vue3/adapter';

import { t } from '../locale';

import PressIconPlusDelete from '../press-icon-delete/press-icon-delete.vue';
import PressPopup from '../press-popup/press-popup.vue';


export default {
  name: 'PressNumberKeyboard',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressIconPlusDelete,
  },
  mixins: [vModelMixin],
  props: {
    ...defaultProps,
    mode: {
      type: String,
      default: 'number',
    },
    show: { type: Boolean, default: false },
    toolbar: { type: Boolean, default: false },
    cancelButtonText: {
      type: String,
      default: '',
    },
    confirmButtonText: {
      type: String,
      default: t('confirm'),
    },
    title: { type: String, default: '' },
    decimalMark: { type: String, default: '.' },
    random: { type: Boolean, default: false },
    maxLength: { type: Number, default: -1 },
    zIndex: { type: Number, default: 100 },
    round: { type: Boolean, default: false },
    safeAreaInsetBottom: { type: Boolean, default: true },
  },
  emits: [
    'change',
    'backspace',
    'close',
    'cancel',
    'confirm',
    'update:modelValue',
  ],
  data() {
    return {
      timer: null,
      refreshKeyOrder: 1,
    };
  },
  computed: {
    roundComputed() {
      return this.round || this.toolbar;
    },
    keys() {
      let keys;
      switch (this.mode) {
        case 'number':
          keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
          break;
        case 'accounting':
          keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, this.decimalMark];
          break;
        case 'card':
          keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0];
          break;
        default:
          keys = [];
      }
      this.refreshKeyOrder;
      if (this.random) {
        keys = this.shuffleArray(keys);
      }
      return keys;
    },
    wrapClass() {
      return utils.bem2('number-keyboard', { safe: this.safeAreaInsetBottom });
    },
    padClass() {
      return utils.bem2('number-keyboard__pad', this.mode);
    },
  },
  watch: {
    show(val) {
      if (this.random && val) {
        this.refreshKeyOrder = this.refreshKeyOrder === 1 ? 2 : 1;
      }
    },
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    shuffleArray(array) {
      const result = array;
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    },
    getButtonClass(key, index) {
      const mods = [key];
      switch (this.mode) {
        case 'number':
          if (index === this.keys.length - 1) {
            mods.push('wide');
          }
          break;
        case 'accounting':
          if (['backspace', 'confirm'].includes(key)) {
            mods.push('place-right');
          } else if (index === this.keys.length - 2) {
            mods.push('wide');
          }
          break;
        case 'card':
          break;
      }
      return utils.bem2('number-keyboard__button', mods);
    },
    onKeyboardClick(val) {
      if (this.maxLength >= 0 &&  this.realModelValue.length >= this.maxLength) {
        return;
      }
      // this.$emit('input', val);
      this.emitModelValue(this.realModelValue + val);
      this.$emit('change', val);
    },
    onBackspaceStart() {
      this.onBackspaceEnd();
      this.onBackspaceClick();
      this.timer = setInterval(() => {
        this.onBackspaceClick();
      }, 250);
    },
    onBackspaceEnd() {
      clearInterval(this.timer);
      this.timer = null;
    },
    onBackspaceClick() {
      this.$emit('backspace');
      this.emitModelValue(this.realModelValue.slice(0, this.realModelValue.length - 1));
    },
    onClose() {
      this.$emit('close');
    },
    onActionClick(event) {
      const { action } = event.currentTarget.dataset;
      this.$emit(action);
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
