<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressCell
        :title="t('alert1')"
        is-link
        @click="onShowDialog('normal')"
      />
      <PressCell
        :title="t('alert2')"
        is-link
        @click="onShowDialog('noTitle')"
      />
      <PressCell
        :title="t('confirm')"
        is-link
        @click="onShowDialog('cancel')"
      />
    </demo-block>

    <demo-block :title="t('asyncClose')">
      <PressCell
        :title="t('asyncClose')"
        is-link
        @click="onShowDialog('async')"
      />
    </demo-block>

    <demo-block :title="t('componentCall')">
      <PressCell
        :title="t('componentCall')"
        is-link
        @click="onShowDialog('component')"
      />
    </demo-block>

    <!-- #ifndef H5 -->
    <PressDialog
      id="press-dialog"
      ref="press-dialog"
    />
    <!-- #endif -->

    <PressDialog
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
    </PressDialog>
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import { showDialog, showConfirmDialog } from 'press-ui/press-dialog';
import PressDialog from 'press-ui/press-dialog/press-dialog.vue';


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
    PressDialog,
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
      // let showCancelButton = false;
      let beforeClose = null;
      let func = showDialog;

      if (type === 'noTitle') {
        title = '';
      } else if (type === 'cancel') {
        // showCancelButton = true;
        func = showConfirmDialog;
      } else if (type === 'async') {
        // showCancelButton = true;
        beforeClose = gBeforeClose;
        func = showConfirmDialog;
      }


      func({
        context: this,
        title,
        // showCancelButton,
        message: this.t('content'),
        beforeClose,
      })
        .then(() => {
          console.log('dialog resolve');
        })
        .catch(() => {
          console.log('dialog reject');
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
