<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />
    </demo-block>

    <PressMobileLogin
      :loader="loaderUnity"
      :show-choose-dialog.sync="showChooseDialog"
      :show-scan-dialog.sync="showScanDialog"
      :show-tip-dialog.sync="showTipDialog"
      :current-url="currentUrl"
      :show-q-q="showQQ"
      :show-w-x="showWX"
      :scan-code-type="scanCodeType"
      @jumpToLoginWX="jumpToLoginWX"
      @jumpToLoginQQ="jumpToLoginQQ"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import PressMobileLogin from 'press-ui/press-mobile-login/press-mobile-login.vue';
import { loaderUnity } from 't-comm/lib/loader/loader-unity';


export default {
  components: {
    PressMobileLogin,
  },
  data() {
    let currentUrl = 'https://baidu.com';
    let showChooseDialog = false;
    // #ifdef H5
    currentUrl = document.location.href;
    if (currentUrl.indexOf('http://localhost') > -1) {
      currentUrl = 'https://novlan1.github.io/press-ui-demo-vue2/';
    }
    showChooseDialog = true;
    // #endif

    return {
      loaderUnity,
      showChooseDialog,
      showScanDialog: false,
      showTipDialog: false,

      currentUrl,
      scanCodeType: 'WX',
      showQQ: true,
      showWX: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.currentUrl = 'https://www.qq.com';
    }, 2000);
  },
  methods: {
    jumpToLoginWX() {
      this.onTip('[jumpToLoginWX]');
      this.showChooseDialog = false;
      this.showScanDialog = true;
    },
    jumpToLoginQQ() {
      this.onTip('[jumpToLoginQQ]');
      this.showChooseDialog = false;
      this.showTipDialog = true;
    },
    closeDialog() {
      this.onTip('[closeDialog]');
    },
    showDialog() {
      this.showChooseDialog = true;
    },
    onTip(message) {
      // #ifndef H5
      this.onGTip(message);
      // #endif

      // #ifdef H5
      this.$toast({
        message,
        zIndex: 10000,
      });
      // #endif
    },
  },
};
</script>
<style scoped lang="scss">
</style>
