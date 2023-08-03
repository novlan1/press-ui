<template>
  <div class="press-hor-match-header">
    <div
      class="press-hor-match-header__back"
      @click="back"
    />
    <div class="press-hor-match-header__middle">
      <slot name="middle" />
    </div>
    <div class="press-hor-match-header__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PressHorMatchHeader',
  props: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    back() {
      this.$emit('back');
    },
  },
};

</script>
<style scoped lang="scss">
@import "../base/layout.scss";
@import "../base/mixin.scss";

.press-hor-match-header {
  display: flex;
  align-items: center;
  padding-top: 0.12rem;
  padding-bottom: 0.18rem;

  &__middle {
    flex: 1;
    overflow: hidden;
  }

  &__back {
    width: 0.8rem;
    height: 0.5rem;
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/back.png)
      no-repeat center;
    background-size: contain;
  }
}
</style>
