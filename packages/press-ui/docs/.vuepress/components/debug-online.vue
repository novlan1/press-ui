<template>
  <div class="wrap">
    <button
      class="press-button press-button--primary"
      @click.stop="clickVue2"
    >
      Vue2
    </button>
  </div>
</template>
<script>
const STACKBLITZ_VUE2 = 'https://stackblitz.com/~/github.com/novlan1/press-ui-demo-template?file=src/static/logo.png';

export default {
  data() {
    return {

    };
  },
  watch: {
    $page: {
      handler(value) {
        console.log('$page', value);
      },
      immediate: true,
    },
  },
  methods: {
    clickVue2() {
      console.log('clickVue2');
      window.open(STACKBLITZ_VUE2);
    },
  },

};
</script>
<style scoped lang="stylus">
@require '../theme/styles/button.styl';

.wrap {
  min-height: 50px;
  padding: 20px 0;
}
</style>
