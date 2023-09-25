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
import computed from './computed';
import { transition } from '../mixins/transition';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

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
    onTouchmove() {
      this.$emit('touchmove');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common/style/index.scss";

.press-transition {
  transition-timing-function: ease;
}
.press-fade-enter-active,
.press-fade-leave-active {
  transition-property: opacity;
}
.press-fade-enter,
.press-fade-leave-to {
  opacity: 0;
}
.press-fade-down-enter-active,
.press-fade-down-leave-active,
.press-fade-left-enter-active,
.press-fade-left-leave-active,
.press-fade-right-enter-active,
.press-fade-right-leave-active,
.press-fade-up-enter-active,
.press-fade-up-leave-active {
  transition-property: opacity, transform;
}
.press-fade-up-enter,
.press-fade-up-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.press-fade-down-enter,
.press-fade-down-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.press-fade-left-enter,
.press-fade-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.press-fade-right-enter,
.press-fade-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.press-slide-down-enter-active,
.press-slide-down-leave-active,
.press-slide-left-enter-active,
.press-slide-left-leave-active,
.press-slide-right-enter-active,
.press-slide-right-leave-active,
.press-slide-up-enter-active,
.press-slide-up-leave-active {
  transition-property: transform;
}

.press-slide-up-enter,
.press-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}

.press-slide-down-enter,
.press-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}

.press-slide-left-enter,
.press-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.press-slide-right-enter,
.press-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

.press-overlay {
  background-color: var(--overlay-background-color, rgba(0, 0, 0, 0.7));
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
