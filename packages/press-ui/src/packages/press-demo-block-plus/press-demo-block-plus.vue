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
  name: 'PressDemoBlockPlus',

  props: {
    card: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
