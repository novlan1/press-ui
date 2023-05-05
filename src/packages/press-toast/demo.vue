<template>
  <div class="wrap">
    <demo-block :title="t('text')">
      <PressButton
        type="e-sport-primary"
        :custom-style="customStyle"
        @click="onShowToast"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>
    <demo-block :title="t('loading')">
      <PressButton
        type="e-sport-primary"
        :custom-style="customStyle"
        @click="onShowToastLoading('normal')"
      >
        {{ t('default') }}
      </PressButton>

      <PressButton
        type="e-sport-primary"
        :custom-style="`${customStyle};margin-left:12px;`"
        @click="onShowToastLoading('spinner')"
      >
        Spinner
      </PressButton>
    </demo-block>
    <demo-block :title="t('success')">
      <PressButton
        type="e-sport-primary"
        :custom-style="customStyle"
        @click="onShowToastSuccess('success')"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>
    <demo-block :title="t('fail')">
      <PressButton
        type="e-sport-primary"
        :custom-style="customStyle"
        @click="onShowToastSuccess('fail')"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>
    <demo-block :title="t('dynamic')">
      <PressButton
        type="e-sport-primary"
        :custom-style="customStyle"
        @click="onShowDynamicToast"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>

    <!-- #ifndef H5 -->
    <press-toast id="press-toast" />
    <!-- #endif -->
  </div>
</template>
<script>
import Toast from 'src/packages/press-toast';

export default {
  i18n: {
    'zh-CN': {
      text: '文字提示',
      loading: '加载提示',
      default: '默认',
      success: '成功提示',
      fail: '失败提示',
      dynamic: '动态更新提示',

      toastTip: '我是提示文案，建议不超过十五字~',
      loadingTip: '加载中...',
      successTip: '成功文案',
      failTip: '失败文案',
      dynamicTip: second =>  `倒计时 ${second} 秒`,
    },
    'en-US': {
      text: 'Show',
      loading: 'Loading',
      default: 'Default',
      success: 'Success',
      fail: 'Fail',
      dynamic: 'Dynamic',

      toastTip: 'Some messages',
      loadingTip: 'Loading...',
      successTip: 'Success',
      failTip: 'Fail',
      dynamicTip: second => `${second} seconds`,
    },
  },
  data() {
    return {
      customStyle: '',
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onShowToast() {
      Toast(this.t('toastTip'));
    },
    onShowToastLoading(type) {
      setTimeout(() => {
        Toast.clear();
      }, 5000);
      if (type === 'normal') {
        Toast.loading({
          message: this.t('loadingTip'),
          forbidClick: true,
        });
        return;
      }
      // 自定义加载图标
      Toast.loading({
        message: this.t('loadingTip'),
        forbidClick: true,
        loadingType: 'spinner',
      });
    },
    onShowToastSuccess(type) {
      if (type === 'success') {
        Toast.success(this.t('successTip'));
        return;
      }
      Toast.fail(this.t('failTip'));
    },
    onShowDynamicToast() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.t('dynamicTip', 3),
        // selector: '#custom-selector',
      });
      let second = 3;
      const timer = setInterval(() => {
        second -= 1;
        if (second) {
          toast.set('dataMessage', this.t('dynamicTip', second));
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
</style>

