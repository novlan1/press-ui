<template>
  <swiper
    :indicator-dots="indicatorDots"
    :vertical="vertical"
    :autoplay="autoplay"
    :circular="circular"
    :interval="interval"
    :duration="duration"
    :current="current"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    :previous-margin="previousMargin"
    :next-margin="nextMargin"
    :current-item-id="currentItemId"
    :skip-hidden-item-layout="skipHiddenItemLayout"
    :display-multiple-items="displayMultipleItems"
    :disable-touch="disableTouch"
    :navigation="navigation"
    :navigation-color="navigationColor"
    :navigation-active-color="navigationActiveColor"
    @update:current="updateCurrent"
    @update:currentItemId="updateCurrentItemId"
    @change="change"
    @animationfinish="animationfinish"
    @transition="transition"
  >
    <template #default>
      <slot />
    </template>
  </swiper>
</template>
<script>
// #ifdef H5
import InnerSwiper from '../swiper/swiper.vue';
// #endif
import { isNotInUni } from '../common/utils/utils';
import { SWIPER_PROPS } from '../swiper/utils';


const componentConfig = isNotInUni() ? {
// #ifdef H5
  Swiper: InnerSwiper,
// #endif
} : {};


export default {
  name: 'PressSwiper',
  components: {
    ...componentConfig,
  },
  props: {
    ...SWIPER_PROPS,
  },
  methods: {
    updateCurrent(...args) {
      this.$emit('updateCurrent', ...args);
    },
    updateCurrentItemId(...args) {
      this.$emit('updateCurrentItemId', ...args);
    },
    change(...args) {
      this.$emit('change', ...args);
    },
    animationfinish(...args) {
      this.$emit('animationfinish', ...args);
    },
    transition(...args) {
      this.$emit('transition', ...args);
    },
  },
};
</script>
