<template>
  <div class="demo-wrap">
    <demo-block :title="t('text')">
      <press-cell
        :title="t('check')"
        is-link
        @click="onShowToast"
      />
    </demo-block>
    <demo-block :title="t('loading')">
      <press-cell
        :title="t('default')"
        is-link
        @click="onShowToastLoading('normal')"
      />
      <press-cell
        title="Spinner"
        is-link
        @click="onShowToastLoading('spinner')"
      />
    </demo-block>
    <demo-block :title="t('customTip')">
      <press-cell
        :title="t('success')"
        is-link
        @click="onShowToastSuccess('success')"
      />
      <press-cell
        :title="t('fail')"
        is-link
        @click="onShowToastSuccess('fail')"
      />
      <press-cell
        :title="t('dynamic')"
        is-link
        @click="onShowDynamicToast"
      />
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
      customTip: '自定义提示',
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
      customTip: 'Custom Tip',
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

