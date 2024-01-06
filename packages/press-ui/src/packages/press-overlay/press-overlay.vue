<template>
  <div class="press-overlay-index">
    <!-- @touchmove.stop.prevent="noop" -->
    <press-transition
      v-if="lockScroll"
      :show="show"
      :overlay="true"
      :custom-class="customClass"
      :custom-style="'z-index: '+(zIndex)+'; '+(customStyle)"
      :duration="duration"
      @click="onClick"
    >
      <slot />
    </press-transition>

    <press-transition
      v-else
      :show="show"
      :overlay="true"
      :custom-class="customClass"
      :custom-style="'z-index: '+(zIndex)+'; '+(customStyle)"
      :duration="duration"
      @click="onClick"
    >
      <slot />
    </press-transition>
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
    ...defaultProps,
  },
  options: {
    // virtualHost: true,
    ...defaultOptions,
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    // for prevent touchmove
    noop() { },
  },
};
</script>
<style lang="scss">
@import "../common/style/press/index.scss";
</style>
