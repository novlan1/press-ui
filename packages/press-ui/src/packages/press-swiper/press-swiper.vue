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
import { SWIPER_PROPS } from '../swiper/utils';
import { SwiperPureMixin } from '../mixins/pure/swiper';


export default {
  name: 'PressSwiper',
  components: {
  },
  mixins: [SwiperPureMixin],
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
