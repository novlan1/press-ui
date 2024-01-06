<template>
  <scroll-view
    :id="scrollViewId"
    style="height: 100%"
    :scroll-y="scrollY"
    :scroll-with-animation="scrollWithAnimation"
    :scroll-anchoring="scrollAnchoring"
    :enhanced="enhanced"
    :enable-flex="enableFlex"
    :enable-passive="enablePassive"
    :lower-threshold="lowerThreshold"
    :scroll-top="scrollTop"
    :scroll-into-view="scrollToElementById"
    :class="customClass"
    @scrolltolower="scrolltolower"
    @scroll="scroll"
  >
    <slot />
  </scroll-view>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  options: {
    ...defaultOptions,
  },
  name: 'ScrollViewMp',
  components: {},
  props: {
    scrollY: {
      type: Boolean,
      default: false,
    },
    enableFlex: {
      type: Boolean,
      default: false,
    },
    enhanced: {
      type: Boolean,
      default: false,
    },
    scrollWithAnimation: {
      type: Boolean,
      default: false,
    },
    enablePassive: {
      type: Boolean,
      default: false,
    },
    scrollAnchoring: {
      type: Boolean,
      default: false,
    },

    lowerThreshold: {
      type: Number,
      default: () => 100,
    },
    scrollOffset: {
      type: Number,
      default: () => 0,
    },
    scrollToElementById: {
      type: String,
      default: '',
    },
    scrollViewId: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: ['scroll', 'scrolltolower'],
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
    };
  },
  watch: {
    scrollOffset: {
      handler(newVal) {
        this.scrollTop = this.old.scrollTop;
        this.$nextTick(function () {
          this.scrollTop = newVal;
        });
      },
      immediate: true,
    },
  },
  mounted() {

  },
  methods: {
    scroll(e) {
      this.old.scrollTop = e.detail.scrollTop;
      this.$emit('scroll', e);
    },
    scrolltolower() {
      this.$emit('scrolltolower');
    },
  },
};
</script>

<style scoped>
</style>
