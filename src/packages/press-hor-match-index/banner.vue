<template>
  <!-- 轮播图 -->
  <div class="press-banner">
    <swiper
      class="press-banner__swiper"
      :autoplay="true"
      :circular="true"
      :indicator-dots="true"
    >
      <swiper-item
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <img
          :src="item"
          class="press-banner__swiper__img"
          @click.stop="clickBanner(item, index)"
        >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  emits: ['clickBanner'],
  data() {
    return {

    };
  },
  methods: {
    clickBanner(item, index) {
      this.$emit('clickBanner', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/banner.scss"></style>
