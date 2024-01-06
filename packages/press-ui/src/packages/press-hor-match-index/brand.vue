<template>
  <!-- 品牌赛事 -->
  <div
    class="press-brand"
    :class="{'press-brand--task': isBrandSwiper}"
  >
    <div
      class="press-brand__title"
      :class="{'press-brand__title--task': isBrandSwiper}"
    />
    <div class="press-brand__list">
      <swiper
        v-if="isBrandSwiper"
        class="press-brand__swiper"
        :autoplay="true"
        :circular="true"
        display-multiple-items="4"
      >
        <swiper-item
          v-for="(item,index) in brandList"
          :key="index"
          class="press-brand__swiper-item"
        >
          <div class="press-brand__item__box">
            <img
              :src="item.img"
              class="press-brand__img"
            >
            <div class="press-brand__name">
              {{ item.name }}
            </div>
          </div>
        </swiper-item>
      </swiper>

      <template v-else>
        <div
          v-for="(item,index) in brandList"
          :key="index"
          v-treport="item.reportData"
          class="press-brand__item"
          @click="clickBrand(item, index)"
        >
          <img
            :src="item.img"
            class="press-brand__img"
          >
          <div class="press-brand__name">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isBrandSwiper: {
      type: Boolean,
      default: false,
    },
    brandList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  emits: ['clickBrand'],
  data() {
    return {

    };
  },
  methods: {
    clickBrand(item, index) {
      this.$emit('clickBrand', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/brand.scss"></style>
