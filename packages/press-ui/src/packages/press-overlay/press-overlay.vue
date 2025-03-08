<template>
  <div class="press-overlay-index">
    <PressTransition
      v-if="lockScroll"
      :show="show"
      :overlay="true"
      :custom-class="customClass"
      :custom-style="'z-index: '+(zIndex)+'; '+(customStyle)"
      :duration="duration"
      :after-enter-callback="afterEnterCallback"
      :after-leave-callback="afterLeaveCallback"
      :enter-callback="enterCallback"
      :leave-callback="leaveCallback"
      :before-enter-callback="beforeEnterCallback"
      :before-leave-callback="beforeLeaveCallback"
      @click="onClick"
      @touchmove.stop.prevent="noop"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
    >
      <slot />
    </PressTransition>

    <PressTransition
      v-else
      :show="show"
      :overlay="true"
      :custom-class="customClass"
      :custom-style="'z-index: '+(zIndex)+'; '+(customStyle)"
      :duration="duration"
      :after-enter-callback="afterEnterCallback"
      :after-leave-callback="afterLeaveCallback"
      :enter-callback="enterCallback"
      :leave-callback="leaveCallback"
      :before-enter-callback="beforeEnterCallback"
      :before-leave-callback="beforeLeaveCallback"
      @click="onClick"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
    >
      <slot />
    </PressTransition>
  </div>
</template>

<script>
import PressTransition from '../press-transition/press-transition.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  name: 'PressOverlay',
  components: {
    PressTransition,
  },
  props: {
    show: { type: Boolean, default: false },
    customStyle: { type: String, default: '' },
    duration: {
      type: null,
      default: 300,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    lockScroll: {
      type: Boolean,
      value: true,
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
    'before-enter',
    'enter',
    'after-enter',
    'before-leave',
    'leave',
    'after-leave',
  ],
  options: {
    ...defaultOptions,
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    noop() { },
    afterEnter() {
      this.$emit('after-enter');
    },
    afterLeave() {
      this.$emit('after-leave');
    },
    enter() {
      this.$emit('enter');
    },
    leave() {
      this.$emit('leave');
    },
    beforeEnter() {
      this.$emit('before-enter');
    },
    beforeLeave() {
      this.$emit('before-leave');
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
