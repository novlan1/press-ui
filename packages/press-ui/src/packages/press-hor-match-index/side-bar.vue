<template>
  <div class="press-index__sidebar">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="['press-index__sidebar__item',
               current == index ? `sidebar-on`:'']"
      @click="sidebarSwitch(item, index)"
    >
      {{ item.label }}
    </div>

    <div
      class="press-index__sidebar__active"
      :style="{ transform: `translateY(${current * .88}rem)` }"
    />
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    current: {
      type: [Number, String],
      default: '-1',
    },
  },
  emits: [
    'change',
  ],
  data() {
    return {

    };
  },
  methods: {
    sidebarSwitch(item, index) {
      this.$emit('change', item, index);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/smoba/layout.scss";
@import "../common/style/smoba/mixin.scss";

.press-index {
  &__sidebar {
    position: relative;
    width: 2.08rem;
    height: 100%;
    flex-shrink: 0;
    padding-left: 0.7rem;
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/home/sidebar-line.png)
      no-repeat 0.46rem top;
    background-size: 0.02rem 6.33rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  &__sidebar__active {
    position: absolute;
    top: 0.36rem;
    left: 0;
    width: 2.23rem;
    height: 1.48rem;
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/home/sidebar-on.png)
      no-repeat right center;
    background-size: contain;
    transition-duration: 0.3s;
  }

  &__sidebar__item {
    position: relative;
    font-family: "GAMEFONT";
    color: #b3cde8;
    font-size: $font-xs;
    padding: 0.3rem 0;
    z-index: 2;

    &:first-child {
      margin-top: 0.6rem;
    }

    &.sidebar-on {
      color: $color-white;
      text-shadow: 0 0 0.16rem rgba(95, 147, 234, 0.69);
    }
  }
}
</style>
