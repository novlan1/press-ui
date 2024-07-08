<template>
  <div class="wrap">
    <button
      class="press-button press-button--default press-button--small"
      @click.stop="clickVue2"
    >
      Vue2
    </button>
    <button
      class="press-button press-button--default press-button--small"
      @click.stop="clickVue3"
    >
      Vue3
    </button>
    <button
      class="press-button press-button--default press-button--small"
      @click.stop="clickVue2Pure"
    >
      Vue2 非 uni-app
    </button>
    <button
      class="press-button press-button--default press-button--small"
      @click.stop="clickVue3Pure"
    >
      Vue3 非 uni-app
    </button>
  </div>
</template>
<script>
const STACKBLITZ_MAP = {
  VUE3: 'https://stackblitz.com/~/github.com/novlan1/press-ui-demo-vue3?file=src/',
  VUE2: 'https://stackblitz.com/~/github.com/novlan1/press-ui-demo-vue2?file=src/',
  VUE2_PURE: 'https://stackblitz.com/~/github.com/novlan1/press-ui-demo-vue2-pure?file=src/',
  VUE3_PURE: 'https://stackblitz.com/~/github.com/novlan1/press-ui-demo-vue3-pure?file=src/',
};

export default {
  data() {
    return {

    };
  },
  computed: {
    currentComponent() {
      const { url } = this.$page.frontmatter || {};
      return url;
    },
  },
  watch: {
  },
  methods: {
    clickVue3() {
      window.open(`${STACKBLITZ_MAP.VUE3}${this.currentComponent}.vue`);
    },
    clickVue2() {
      window.open(`${STACKBLITZ_MAP.VUE2}${this.currentComponent}.vue`);
    },
    clickVue2Pure() {
      window.open(`${STACKBLITZ_MAP.VUE2_PURE}${this.currentComponent}.vue`);
    },
    clickVue3Pure() {
      window.open(`${STACKBLITZ_MAP.VUE3_PURE}${this.currentComponent}.vue`);
    },
  },

};
</script>
<style scoped lang="stylus">
@require '../theme/styles/button.styl';

.wrap {
  padding: 20px 0;
}

.press-button--small {
  padding: 9px 15px;
  margin-right: 16px;
}
</style>
