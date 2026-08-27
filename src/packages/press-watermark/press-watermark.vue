<template>
  <!-- #ifdef H5 -->
  <PressWatermarkWeb
    :gap-x="gapX"
    :gap-y="gapY"
    :image="image"
    :width="width"
    :height="height"
    :rotate="rotate"
    :z-index="zIndex"
    :content="content"
    :opacity="opacity"
    :full-page="fullPage"
    :text-color="textColor"
  >
    <template #content>
      <slot name="content" />
    </template>
  </PressWatermarkWeb>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <PressWatermarkUni
    :gap-x="gapX"
    :gap-y="gapY"
    :image="image"
    :width="width"
    :height="height"
    :rotate="rotate"
    :z-index="zIndex"
    :content="content"
    :opacity="opacity"
    :full-page="fullPage"
    :text-color="textColor"

    :watermark="watermark"
  />
<!-- #endif -->
</template>
<script>
import { WATERMARK_PROPS } from './props';

// #ifndef H5
import PressWatermarkUni from './uni.vue';
// #endif

// #ifdef H5
import PressWatermarkWeb from './web.vue';
// #endif


export default {
  name: 'PressWatermark',
  components: {
    // #ifndef H5
    PressWatermarkUni,
    // #endif

    // #ifdef H5
    PressWatermarkWeb,
    // #endif
  },
  props: {
    ...WATERMARK_PROPS,

    watermark: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss">
</style>
