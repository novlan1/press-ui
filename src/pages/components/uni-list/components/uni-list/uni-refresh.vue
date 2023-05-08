<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <!-- #ifdef APP-NVUE -->
  <refresh
    :display="display"
    @refresh="onrefresh"
    @pullingdown="onpullingdown"
  >
    <slot />
  </refresh>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <view
    v-show="isShow"
    ref="uni-refresh"
    class="uni-refresh"
  >
    <slot />
  </view>
  <!-- #endif -->
</template>

<script>
export default {
  name: 'UniRefresh',
  props: {
    display: {
      type: [String],
      default: 'hide',
    },
  },
  data() {
    return {
      pulling: false,
    };
  },
  computed: {
    isShow() {
      if (this.display === 'show' || this.pulling === true) {
        return true;
      }
      return false;
    },
  },
  created() {},
  methods: {
    onchange(value) {
      this.pulling = value;
    },
    onrefresh(e) {
      this.$emit('refresh', e);
    },
    onpullingdown(e) {
      // #ifdef APP-NVUE
      this.$emit('pullingdown', e);
      // #endif
      // #ifndef APP-NVUE
      const detail = {
        viewHeight: 90,
        pullingDistance: e.height,
      };
      this.$emit('pullingdown', detail);
      // #endif
    },
  },
};
</script>

<style>
.uni-refresh {
  height: 0;
  overflow: hidden;
}
</style>
