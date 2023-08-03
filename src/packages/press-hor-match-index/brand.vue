<template>
  <!-- 品牌赛事 -->
  <div class="press-brand">
    <div class="press-brand__title" />
    <div class="press-brand__list">
      <div
        v-for="(item,index) in brandList"
        :key="index"
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    brandList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
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
