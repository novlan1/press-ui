<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />
    </demo-block>

    <PressPCLogin
      :show.sync="show"
      @close="closeDialog"
      @jumpToLoginWX="jumpToLoginWX"
      @jumpToLoginQQ="jumpToLoginQQ"
    />
  </div>
</template>
<script>
import PressPCLogin from 'src/packages/press-p-c-login/press-p-c-login.vue';


export default {
  components: {
    PressPCLogin,
  },
  data() {
    let show = false;
    // #ifdef H5
    show = true;
    // #endif

    return {
      show,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    jumpToLoginWX() {
      this.onGTip('[jumpToLoginWX]');
      this.show = false;
    },
    jumpToLoginQQ() {
      this.onGTip('[jumpToLoginQQ]');
      this.show = false;
    },
    closeDialog() {
      console.log('[closeDialog]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
