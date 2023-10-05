<template>
  <div class="press-card-title">
    <div class="press-card-title__main">
      {{ title }}<slot />
    </div>

    <div
      v-if="showIcon"
      class="press-card-title__icon-wrap"
      @click="checkDataDetail"
    >
      <div class="press-card-title__icon-title">
        详情
      </div>
      <i class="card-iconfont icon-back" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressScheduleCardTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    checkDataDetail() {
      this.$emit('checkDataDetail');
    },
  },
};
</script>

<style lang="scss" scoped src="./css/card-title.scss"></style>
