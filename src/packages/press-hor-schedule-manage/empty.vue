<template>
  <div class="press-empty">
    <div class="press-empty__img" />
    <div
      class="press-empty__text"
      v-html="text ? text : '暂无内容'"
    />
    <div
      v-if="confirmText"
      class="press-empty__primary-btny"
      @click.stop="clickConfirm()"
    >
      {{ confirmText }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'PressEmpty',
  components: {

  },
  props: {
    // 空状态文案
    text: {
      type: String,
      default: '',
      required: false,
    },
    // 确认按钮文案
    confirmText: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {

  },
  methods: {
    clickConfirm() {
      this.$emit('clickConfirm');
    },
  },
};
</script>

<style lang="scss" src="./css/empty.scss" scoped></style>
