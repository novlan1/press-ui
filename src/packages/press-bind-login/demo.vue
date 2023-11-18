<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />
    </demo-block>

    <PressBindLogin
      v-if="show"
      :name="name"
      :description="description"
      :agreement-name="agreementName"
      :next-agreement-name="nextAgreementName"
      :show-next-agreement="showNextAgreement"
      @onCancel="show = false"
      @openAgreement="openAgreement"
      @openNextAgreement="openNextAgreement"
      @clickQQLogin="clickQQLogin"
      @clickWXLogin="clickWXLogin"
    />
  </div>
</template>
<script>
import PressBindLogin from 'src/packages/press-bind-login/press-bind-login.vue';

export default {
  components: {
    PressBindLogin,
  },
  data() {
    let show = false;
    // #ifdef H5
    show = true;
    // #endif

    return {
      show,
      name: 'Press UI',
      description: 'Press UI 是一套 Vue 组件库，支持基础 uni-app 的 H5、微信小程序、QQ小程序、APP，支持非 uni-app 的普通 H5 项目，并兼容 Vue2 和 Vue3',
      agreementName: 'Press UI 使用协议',
      nextAgreementName: 'Press UI 隐私协议',
      showNextAgreement: true,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    openAgreement() {
      this.onGTip('[openAgreement]');
    },
    openNextAgreement() {
      this.onGTip('[openNextAgreement]');
    },
    clickQQLogin() {
      this.onGTip('[clickQQLogin]');
    },
    clickWXLogin() {
      this.onGTip('[clickWXLogin]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
