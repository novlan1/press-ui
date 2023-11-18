<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />
    </demo-block>

    <PressQRCodePopup
      v-if="show"
      :qr-code-url="currentUrl"
      :type="type"
      @onCancel="show = false"
    />
  </div>
</template>
<script>
import PressQRCodePopup from 'src/packages/press-q-r-code-popup/press-q-r-code-popup.vue';


export default {
  components: {
    PressQRCodePopup,
  },
  data() {
    let currentUrl = 'https://baidu.com';
    let show = false;
    // #ifdef H5
    currentUrl = document.location.href;
    show = true;
    // #endif

    return {
      currentUrl,
      show,
      type: 1,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
