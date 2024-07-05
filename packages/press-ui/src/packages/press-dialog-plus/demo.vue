<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        :title="t('alert1')"
        is-link
        @click="onShowDialog('normal')"
      />
      <press-cell
        :title="t('alert2')"
        is-link
        @click="onShowDialog('noTitle')"
      />
      <press-cell
        :title="t('confirm')"
        is-link
        @click="onShowDialog('cancel')"
      />
    </demo-block>

    <demo-block :title="t('asyncClose')">
      <press-cell
        :title="t('asyncClose')"
        is-link
        @click="onShowDialog('async')"
      />
    </demo-block>

    <demo-block :title="t('componentCall')">
      <press-cell
        :title="t('componentCall')"
        is-link
        @click="onShowDialog('component')"
      />
    </demo-block>

    <!-- #ifndef H5 -->
    <PressDialogPlus
      id="press-dialog"
      ref="press-dialog"
    />
    <!-- #endif -->

    <press-dialog-plus
      use-slot
      :title="t('title')"
      :show="show"
      show-cancel-button
      confirm-button-open-type="getUserInfo"
      @close="onClose"
      @getuserinfo="getUserInfo"
    >
      <img
        src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_260c4142c7225b5f73.jpeg"
        style="width: 100%;margin-top: 16px;"
        mode="aspectFit"
      >
    </press-dialog-plus>
  </div>
</template>
<script>
import PressDialogPlus from 'press-ui/press-dialog-plus/press-dialog-plus.vue';
import Dialog from 'press-ui/press-dialog-plus/handler';
import PressCell from 'press-ui/press-cell/press-cell.vue';


const gBeforeClose = action => new Promise((resolve) => {
  if (action === 'confirm') {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  } else {
    // false可以拦截取消操作
    resolve(true);
  }
});


export default {
  i18n: {
    'zh-CN': {
      alert1: '提示弹窗',
      alert2: '提示弹窗（无标题）',
      confirm: '确认弹窗',
      asyncClose: '异步关闭',
      roundButton: '圆角按钮样式',
      componentCall: '组件调用',
      content: '代码是写出来给人看的，附带能在机器上运行',
    },
    'en-US': {
      alert1: 'Alert',
      alert2: 'Alert without title',
      confirm: 'Confirm dialog',
      asyncClose: 'Async Close',
      roundButton: 'Round Button Style',
      componentCall: 'Component Call',
    },
  },

  components: {
    PressDialogPlus,
    PressCell,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onShowDialog(type) {
      if (type === 'component') {
        this.show = true;
        return;
      }

      let title = this.t('title');
      let showCancelButton = false;
      let beforeClose = null;

      if (type === 'noTitle') {
        title = '';
      } else if (type === 'cancel') {
        showCancelButton = true;
      } else if (type === 'async') {
        showCancelButton = true;
        beforeClose = gBeforeClose;
      }

      Dialog.alert({
        context: this,
        title,
        showCancelButton,
        message: this.t('content'),
        beforeClose,
      }).then(() => {
        // on close
      });
    },
    getUserInfo(res) {
      console.log('getUserInfo.res', res);
    },
    onClose() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
