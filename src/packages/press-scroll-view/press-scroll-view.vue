<template>
  <PlatScrollView
    style="height: 100%"
    :scroll-view-id="scrollViewId"
    :scroll-y="scrollY"
    :scroll-with-animation="scrollWithAnimation"
    :scroll-anchoring="scrollAnchoring"
    :enhanced="enhanced"
    :enable-flex="enableFlex"
    :enable-passive="enablePassive"
    :scroll-offset="scrollOffset"
    :scroll-to-element-by-id="scrollToElementById"
    @scrolltolower="scrolltolower"
    @scroll="scroll"
  >
    <slot />
    <p
      v-if="finished==true&&!hideNoMoreText"
      class="loading-bottom"
    >
      {{ finishedText }}
    </p>
    <p
      v-if="loading && !hideLoading"
      class="loading-bottom"
    >
      加载中...
    </p>
  </PlatScrollView>
</template>

<script>
// #ifndef H5
import ScrollViewMp from './scroll-view-mp.vue';
// #endif

// #ifdef H5
import ScrollViewWeb from './scroll-view-web.vue';
// #endif


export default {
  name: 'PressScrollView',
  components: {
    // #ifndef H5
    PlatScrollView: ScrollViewMp,
    // #endif

    // #ifdef H5
    // eslint-disable-next-line no-dupe-keys
    PlatScrollView: ScrollViewWeb,
    // #endif
  },
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
    scrollOffset: {
      type: Number,
      default: () => 0,
    },
    finished: {
      type: Boolean,
      default: () => false,
    },
    hideLoading: {  // 是否隐藏loading动画
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    scrollToElementById: { type: String, default: '' },
    hideNoMoreText: {
      type: Boolean,
      default: () => true,
    },
    finishedText: {
      type: String,
      default: () => '没有更多了',
    },
    scrollViewId: {
      type: String,
      default: '',
    },
  },
  emits: ['scrolltolower', 'loadmore', 'scroll'],
  data() {
    return {};
  },
  mounted() {

  },
  methods: {
    scrolltolower() {
      if (this.finished) {
        return;
      }
      this.$emit('scrolltolower');
      this.$emit('loadmore'); // 监听这个也可以，比较好记
    },
    scroll(...args) {
      this.$emit('scroll', ...args);
    },
  },
};
</script>

<style scoped src="./css/index.scss">
</style>
