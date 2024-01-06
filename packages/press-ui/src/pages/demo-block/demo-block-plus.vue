<template>
  <div class="press-doc-demo-block">
    <h2
      v-if="title"
      class="press-doc-demo-block__title"
    >
      {{ title }}
    </h2>
    <div
      v-if="card"
      class="press-doc-demo-block__card"
    >
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',

  props: {
    card: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
@import "src/utils/style/var";

.press-doc-demo-block {
  &__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: $press-doc-text-light-blue;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  &__card {
    margin: 12px 12px 0;
    overflow: hidden;
    border-radius: 8px;
  }

  &__title + &__card {
    margin-top: 0;
  }

  &:first-of-type {
    .press-doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
