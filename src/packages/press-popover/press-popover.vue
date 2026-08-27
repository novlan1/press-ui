<template>
  <div
    ref="wrapper"
    :class="[utils.bem2('popover__wrapper')]"
    :style="wrapperStyle"
    @click.stop="onClickWrapper"
  >
    <PressPopup
      ref="popover"
      :show="realModelValue"
      :class="[popupClass]"
      :wrap-class="popupCustomClass"
      :overlay="overlay"
      position="null"
      transition="popover-zoom"
      :lock-scroll="false"
      :duration="duration"
      :get-container="getContainer"
      :custom-style="popoverStyle"
      @before-leave="onClose"
      @after-leave="onClosed"
      @before-enter="onOpen"
      @after-enter="onOpened"
    >
      <div :class="[utils.bem2('popover__arrow')]" />
      <div
        :class="[utils.bem2('popover__content')]"
        role="menu"
      >
        <slot>
          <div
            v-for="(action, index) of actions"
            :key="index"
            :class="[
              utils.bem2('popover__action', {
                disabled: action.disabled,
                'with-icon': action.icon
              }),
              action.className
            ]"
            @click.stop="onClickAction(action, index)"
          >
            <PressIcon
              v-if="action.icon"
              :name="action.icon"
              custom-class="press-popover-action-icon"
            />
            <div
              :class="[
                utils.bem2('popover__action-text'),
                'press-hairline--bottom'
              ]"
            >
              {{ action.text }}
            </div>
          </div>
        </slot>
      </div>
    </PressPopup>
    <slot name="reference" />
  </div>
</template>
<script>
import { style } from '../common/utils/style';
import utils from '../common/utils/utils';
import { vModelMixin } from '../common/vue3/adapter';

// #ifdef H5
import { clickOutsideMixin } from '../mixins/basic/click-outside';
// #endif

import { transition } from '../mixins/basic/transition';

// #ifdef H5
import { popoverMixin } from '../mixins/popover/index';
// #endif


import PressIcon from '../press-icon/press-icon.vue';
import PressPopup from '../press-popup/press-popup.vue';


export default {
  name: 'PressPopover',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressIcon,
  },
  mixins: [
    vModelMixin,

    transition(false),
    // #ifdef H5
    clickOutsideMixin({
      event: 'touchstart',
      method: 'onClickOutside',
    }),
    popoverMixin,
    // #endif
  ],
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: String,
      default: '',
    },
    offset: {
      type: Array,
      default: () => [0, 8],
    },
    theme: {
      type: String,
      default: 'light',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    getContainer: {
      type: [String, Function],
      default: '',
    },
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
    duration: {
      type: Number,
      default: 200,
    },
  },
  emits: [
    'close',
    'closed',
    'input',
    'open',
    'opened',
    'select',
    'touchstart',
    'update:modelValue',
  ],
  data() {
    return {
      utils,
    };
  },
  computed: {
    popoverStyle() {
      const { zIndex } = this;
      return `z-index: ${zIndex}`;
    },
    wrapperStyle() {
      const { customStyle } = this;
      return style(customStyle);
    },
    popupClass() {
      const { theme, placement, getContainer } = this;
      return utils.bem2('popover', [theme, placement, { 'custom-container': !!getContainer }]);
    },
    popupCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.popupClass}`;
      // #endif
      return result;
    },
  },
  mounted() {
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    onClickWrapper() {
      if (this.trigger === 'click') {
        this.emitModelValue(!this.realModelValue);
      }
    },

    onTouchstart(event) {
      event.stopPropagation();
      this.$emit('touchstart', event);
    },

    onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      this.$emit('select', action, index);

      if (this.closeOnClickAction) {
        this.$emit('input', false);
        this.$emit('update:modelValue', false);
      }
    },

    onClickOutside() {
      this.$emit('input', false);
      this.$emit('update:modelValue', false);
    },

    onOpen() {
      this.$emit('open');
    },

    /* istanbul ignore next */
    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    onClosed() {
      this.$emit('closed');
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss"></style>
<style scoped lang="scss" src="./css/mp-alipay.scss"></style>
