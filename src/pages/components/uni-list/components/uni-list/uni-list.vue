<template>
  <!-- #ifndef APP-NVUE -->
  <div class="uni-list uni-border-top-bottom">
    <div
      v-if="border"
      class="uni-list--border-top"
    />
    <slot />
    <div
      v-if="border"
      class="uni-list--border-bottom"
    />
  </div>
  <!-- #endif -->
</template>

<script>

export default {
  name: 'UniList',
  'mp-weixin': {
    options: {
      multipleSlots: false,
    },
  },
  props: {
    enableBackToTop: {
      type: [Boolean, String],
      default: false,
    },
    scrollY: {
      type: [Boolean, String],
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.firstChildAppend = false;
  },
  methods: {
    loadMore() {
      this.$emit('scrolltolower');
    },
  },
};
</script>
<style lang="scss">
$uni-bg-color: #ffffff;
$uni-border-color: #e5e5e5;
.uni-list {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  background-color: $uni-bg-color;
  position: relative;
  flex-direction: column;
}

.uni-list--border {
  position: relative;
  /* #ifdef APP-NVUE */
  border-top-color: $uni-border-color;
  border-top-style: solid;
  border-top-width: 0.5px;
  border-bottom-color: $uni-border-color;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  /* #endif */
  z-index: -1;
}

/* #ifndef APP-NVUE */

.uni-list--border-top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $uni-border-color;
  z-index: 1;
}

.uni-list--border-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $uni-border-color;
}

/* #endif */
</style>
