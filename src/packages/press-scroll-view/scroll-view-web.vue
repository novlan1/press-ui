<template>
  <div
    :id="scrollViewId"
    style="height: 100%;overflow-y: auto"
    :class="customClass"
    @scroll="onScroll"
  >
    <slot />
  </div>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  options: {
    ...defaultOptions,
  },
  name: 'ScrollViewWeb',
  components: {},
  props: {
    scrollOffset: {
      type: Number,
      default: () => 0,
    },
    scrollToElementById: { type: String, default: '' },
    lowerThreshold: {
      type: Number,
      default: () => 50,
    },
    scrollViewId: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: ['scroll', 'scrolltolower'],
  data() {
    const randomId = `__scrollView_${new Date().getDate()}${Math.random()}`;
    return {
      randomId,
      identifier: randomId,
    };
  },
  watch: {
    scrollOffset: {
      handler(newVal) {
        // console.info('newVal', newVal, this.id);
        const target = document.getElementById(this.identifier);
        if (target) {
          // target.offsetTop = `${newVal}px`;
          target.scrollTo({
            top: newVal,
          });
        }
      },
      immediate: true,
    },
    scrollToElementById: {
      handler(newVal) {
        const target = document.getElementById(newVal);
        if (newVal?.length > 0 && target) {
          document.getElementById(this.identifier).scrollTo({
            top: target.offsetTop,
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.$el.id) this.identifier = this.$el.id;
    // this.$nextTick(() => {
    // document.getElementById(this.identifier)?.addEventListener('scroll', this.onScroll);
    // });
  },
  destroyed() {
    // document.getElementById(this.identifier)?.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll(e) {
      this.$emit('scroll', e);
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - this.lowerThreshold) {
        this.$emit('scrolltolower', e);
      }
    },
  },
};
</script>

<style scoped>
</style>
