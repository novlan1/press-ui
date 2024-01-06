<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />

      <!-- #ifdef H5 -->
      <press-cell
        title="函数式调用"
        is-link
        @click="showFunctionalDialog"
      />
      <!-- #endif -->
    </demo-block>

    <PressAuthLogin
      v-if="show"
      :after-cancel="afterCancel"
      :after-confirm="afterConfirm"
    />
  </div>
</template>
<script>
import PressAuthLogin from 'src/packages/press-auth-login/press-auth-login.vue';
import { initH5Instance } from 'src/packages/common/component-handler/h5-handler';

let that;

export default {
  components: {
    PressAuthLogin,
  },
  data() {
    that = this;
    return {
      show: false,
    };
  },
  mounted() {
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    showFunctionalDialog() {
      initH5Instance(PressAuthLogin, 'press-auth-login', {
        isShowByFunction: true,
        afterCancel: this.afterCancel,
        afterConfirm: this.afterConfirm,
      });
    },
    afterCancel() {
      that.onGTip('[afterCancel]');
      that.show = false;
    },
    afterConfirm() {
      that.onGTip('[afterConfirm]');
      that.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
