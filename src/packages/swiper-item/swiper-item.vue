<template>
  <uni-swiper-item v-on="$listeners">
    <slot />
  </uni-swiper-item>
</template>
<script>
import { SWIPER_ITEM_PROPS } from './utils';


export default {
  name: 'SwiperItem',
  props: {
    ...SWIPER_ITEM_PROPS,
  },
  mounted() {
    const { $el } = this;
    $el.style.position = 'absolute';
    $el.style.width = '100%';
    $el.style.height = '100%';
    const callbacks = this.$vnode._callbacks;
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback();
      });
    }
  },
};
</script>
<style lang="scss" src="./css/index.scss" scoped>
</style>
