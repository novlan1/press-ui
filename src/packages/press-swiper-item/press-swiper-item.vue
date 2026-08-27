<template>
  <swiper-item
    :item-id="itemId"
  >
    <template #default>
      <slot />
    </template>
  </swiper-item>
</template>
<script>
import { SwiperPureMixin } from '../mixins/pure/swiper';
import { SWIPER_ITEM_PROPS } from '../swiper-item/utils';


export default {
  name: 'PressSwiperItem',
  components: {
  },
  mixins: [SwiperPureMixin],
  props: {
    ...SWIPER_ITEM_PROPS,
  },
  data() {
    return {

    };
  },
};
</script>
