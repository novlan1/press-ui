<template>
  <PressScrollView
    scroll-view-id="scrollViewId"
    :scroll-offset="scrollOffset"
    :scroll-y="true"
    :scroll-with-animation="true"
    :scroll-anchoring="true"
    :enhanced="true"
    :enable-flex="true"
    :enable-passive="true"
    style="height: 100%"
  >
    <slot />
  </PressScrollView>
</template>
<script>
import PressScrollView from '../press-scroll-view/press-scroll-view.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressMessageBoardList',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressScrollView,
  },
  props: {
    ...defaultProps,
  },
  data() {
    return {
      scrollOffset: 0,
    };
  },
  mounted() {

  },
  methods: {
    replyClick(...args) {
      this.$emit('replyClick', ...args);
    },
  },
};
</script>
<style lang="scss" scoped></style>
