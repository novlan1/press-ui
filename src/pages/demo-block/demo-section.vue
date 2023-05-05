<template>
  <section
    class="press-doc-demo-section"
  >
    <slot />
  </section>
</template>

<script>

export default {
  name: 'DemoSection',

  computed: {
  },
};
</script>

<style lang="scss">
.press-doc-demo-section {
  box-sizing: border-box;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */
  /* #ifndef H5 */
  min-height: calc(100vh);
  /* #endif */
}
</style>
