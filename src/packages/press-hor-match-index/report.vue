<template>
  <!-- 任务轮播 -->
  <div class="press-report">
    <div class="press-report__icon" />
    <swiper
      class="press-report__swiper"
      :autoplay="true"
      :circular="true"
      :vertical="true"
    >
      <swiper-item
        v-for="(item, index) in reportList"
        :key="index"
      >
        <div
          class="press-report__item"
          @click.stop="clickReport(item, index)"
        >
          <div class="press-report__name">
            {{ item.name }}
          </div>
          已获得
          <div class="press-report__award">
            {{ item.award }}
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    reportList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  emits: ['clickReport'],
  data() {
    return {

    };
  },
  methods: {
    clickReport(item, index) {
      this.$emit('clickReport', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/report.scss"></style>
