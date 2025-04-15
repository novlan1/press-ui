<template>
  <div
    class="press-loading"
    :style="{background: loadingBg}"
  >
    <img
      :class="loadingScenes == 'btn' ? 'press-loading__img--btn' : 'press-loading__img--page'"
      :src="`https://image-1251917893.file.myqcloud.com/Esports/user/img/${loadingScenes}-loading.gif`"
    >
  </div>
</template>
<script>
export default {
  name: 'PressLoading',
  props: {
    // loading背景色，默认透明
    loadingBg: {
      type: String,
      default: '',
      required: false,
    },
    // loading的场景，默认是page，可选项：page/btn
    loadingScenes: {
      type: String,
      default: 'page',
      required: false,
    },
  },
  options: {
    virtualHost: true,
  },
  emits: [],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
