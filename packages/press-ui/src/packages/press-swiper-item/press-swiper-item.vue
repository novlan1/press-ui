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
// #ifdef H5
import InnerSwiperItem from '../swiper-item/swiper-item.vue';
import { setCustomElements } from '../common/vue3/adapter';
// #endif
import { isNotInUni } from '../common/utils/utils';
import { SWIPER_ITEM_PROPS } from '../swiper-item/utils';


const componentConfig = isNotInUni() ? {
// #ifdef H5
  SwiperItem: InnerSwiperItem,
// #endif
} : {};


// #ifdef H5
if (isNotInUni()) {
  setCustomElements([
    'uni-swiper-item',
  ]);
}
// #endif


export default {
  name: 'PressSwiperItem',
  components: {
    ...componentConfig,
  },
  props: {
    ...SWIPER_ITEM_PROPS,
  },
  data() {
    return {

    };
  },
};
</script>
