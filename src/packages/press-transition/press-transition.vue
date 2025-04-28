<template>
  <div
    v-if="inited"
    :class="transitionClass"
    :style="rootStyle"
    @transitionend="onTransitionEnd"
    @click="onClick"
    @touchmove="onTouchmove"
  >
    <slot />
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { transition } from '../mixins/transition';

import computed from './computed';

export default {
  name: 'PressTransition',
  mixins: [transition(true)],
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
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
    afterEnterCallback: {
      type: Function,
      default: () => (() => {}),
    },
    afterLeaveCallback: {
      type: Function,
      default: () => (() => {}),
    },
    enterCallback: {
      type: Function,
      default: () => (() => {}),
    },
    leaveCallback: {
      type: Function,
      default: () => (() => {}),
    },
    beforeEnterCallback: {
      type: Function,
      default: () => (() => {}),
    },
    beforeLeaveCallback: {
      type: Function,
      default: () => (() => {}),
    },
    ...defaultProps,
  },
  emits: [
    'click',
    'touchmove',
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
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  computed: {
    rootStyle() {
      const { currentDuration, display, customStyle } = this;
      const res = computed.rootStyle({ currentDuration, display, customStyle });
      return res;
    },
    transitionClass() {
      const {
        customClass,
        overlay,
        classes,
      } = this;
      return `press-transition ${classes} ${customClass} ${overlay ? 'press-overlay' : ''}`;
    },
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    onClick() {
      this.$emit('click');
    },
    onTouchmove(e) {
      this.$emit('touchmove', e);
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
