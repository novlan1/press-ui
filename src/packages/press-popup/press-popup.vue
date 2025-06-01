<template>
  <div
    :class="innerWrapClass"
  >
    <PressOverlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      :lock-scroll="lockScroll"
      @click="onClickOverlay"
    />
    <div
      v-if="inited"
      :class="popupClass"
      :style="popupStyle"
      @transitionend="onTransitionEnd"
    >
      <slot />
      <PressIcon
        v-if="closeable"
        :name="closeIcon"
        :class="innerCloseIconClass"
        :custom-class="innerCloseIconCustomClass"
        @click="onClickCloseIcon"
      />
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import { transition } from '../mixins/basic/transition';

// #ifdef H5
import { PortalMixin } from '../mixins/portal/index';
// #endif

import PressIcon from '../press-icon/press-icon.vue';
import PressOverlay from '../press-overlay/press-overlay.vue';

import computed from './computed';


export default {
  name: 'PressPopup',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
    PressOverlay,
  },
  mixins: [
    transition(false),

    // #ifdef H5
    PortalMixin({
      afterPortal() {

      },
    }),
    // #endif
  ],
  props: {
    enterClass: {
      type: String,
      default: '',
    },
    enterActiveClass: {
      type: String,
      default: '',
    },
    enterToClass: {
      type: String,
      default: '',
    },
    leaveClass: {
      type: String,
      default: '',
    },
    leaveActiveClass: {
      type: String,
      default: '',
    },
    leaveToClass: {
      type: String,
      default: '',
    },
    closeIconClass: {
      type: String,
      default: '',
    },

    round: Boolean,
    closeable: Boolean,
    customStyle: { type: [String, Object], default: '' },
    overlayStyle: { type: String, default: '' },
    transition: {
      type: String,
      default: '',
      // observer: 'observeClass',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: String,
      default: 'cross',
    },
    closeIconPosition: {
      type: String,
      default: 'top-right',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'center',
      // observer: 'observeClass',
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
    wrapClass: {
      type: String,
      default: '',
    },
  },
  emits: [
    'close',
    'click-overlay',
    'before-enter',
    'enter',
    'after-enter',
    'before-leave',
    'leave',
    'after-leave',
  ],
  data() {
    return {
      classes: '',
    };
  },
  computed: {
    innerWrapClass() {
      return `press-popup-plus ${this.wrapClass}`;
    },
    popupClass() {
      const {
        position,
        round,
        safeAreaInsetBottom,
        safeAreaInsetTop,
        customClass,

        classes,
      } = this;
      return `${
        utils.bem2('popup', [
          position,
          {
            round,
            safe: safeAreaInsetBottom,
            safeTop: safeAreaInsetTop,
          },
        ])
      } ${classes} ${customClass}`;
    },
    popupStyle() {
      const { zIndex, currentDuration, display, customStyle } = this;
      return computed.popupStyle({ zIndex, currentDuration, display, customStyle });
    },
    innerCloseIconClass() {
      const { closeIconClass, closeIconPosition } = this;
      return `press-popup__close-icon press-popup__close-icon--${closeIconPosition} ${closeIconClass} `;
    },
    innerCloseIconCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.innerCloseIconClass}`;
      // #endif
      return result;
    },
  },
  watch: {
    transition: {
      handler() {
        this.observeClass();
      },
    },
    position: {
      handler() {
        this.observeClass();
      },
    },
  },
  created() {
    this.observeClass();
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    onClickCloseIcon() {
      this.$emit('close');
    },
    onClickOverlay() {
      this.$emit('click-overlay');
      if (this.closeOnClickOverlay) {
        this.$emit('close');
      }
    },
    observeClass() {
      const { transition, position, duration } = this;
      const updateData = {
        dataName: transition || position,
      };
      if (transition === 'none') {
        updateData.duration = 0;
        this.originDuration = duration;
      } else if (this.originDuration != null) {
        updateData.duration = this.originDuration;
      }
      this.setData(updateData);
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
