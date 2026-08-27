<template>
  <div class="demo-wrap">
    <demo-block :title="t('text')">
      <PressCell
        :title="t('check')"
        is-link
        @click="onShowToast"
      />
    </demo-block>
    <demo-block :title="t('loading')">
      <PressCell
        :title="t('default')"
        is-link
        @click="onShowToastLoading('normal')"
      />
      <PressCell
        title="Spinner"
        is-link
        @click="onShowToastLoading('spinner')"
      />
      <PressCell
        :title="t('noDestroy')"
        is-link
        @click="onShowToastLoading('normal', 0)"
      />
    </demo-block>
    <demo-block :title="t('customTip')">
      <PressCell
        :title="t('success')"
        is-link
        @click="onShowToastSuccess('success')"
      />
      <PressCell
        :title="t('fail')"
        is-link
        @click="onShowToastSuccess('fail')"
      />
      <PressCell
        :title="t('dynamic')"
        is-link
        @click="onShowDynamicToast"
      />
      <PressCell
        :title="t('html')"
        is-link
        @click="onShowHtmlToast"
      />
    </demo-block>

    <PressToast
      id="press-toast"
      ref="press-toast"
    />
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import Toast, {
  showToast,
  closeToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
} from 'press-ui/press-toast';
import PressToast from 'press-ui/press-toast/press-toast.vue';


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
      html: 'HTML提示',

      toastTip: '我是提示文案，建议不超过十五字~',
      loadingTip: '加载中...',
      successTip: '成功文案',
      failTip: '失败文案',
      htmlTip: '我是提示文案，建议不超过<span style="color: #07A872">十五字</span>~',
      dynamicTip: second =>  `倒计时 ${second} 秒`,
      noDestroy: '不消失',
    },
    'en-US': {
      customTip: 'Custom Tip',
      text: 'Show',
      loading: 'Loading',
      default: 'Default',
      success: 'Success',
      fail: 'Fail',
      dynamic: 'Dynamic',
      html: 'HTML',

      toastTip: 'Some messages',
      loadingTip: 'Loading...',
      successTip: 'Success',
      failTip: 'Fail',
      htmlTip: 'Some <span style="color: #07A872">messages</span>',
      dynamicTip: second => `${second} seconds`,
      noDestroy: 'Not Destroy',
    },
  },
  components: {
    PressCell,
    PressToast,
  },
  data() {
    return {
      customStyle: '',
      timer: null,
    };
  },
  methods: {
    onShowToast() {
      Toast(this.t('toastTip'));
    },
    onShowToastLoading(type, duration = 3000) {
      closeToast();
      if (type === 'normal') {
        showLoadingToast({
          message: this.t('loadingTip'),
          forbidClick: !!duration,
          duration,
        });
        return;
      }
      // 自定义加载图标
      showLoadingToast({
        message: this.t('loadingTip'),
        forbidClick: !!duration,
        loadingType: 'spinner',
        duration,
      });
    },
    onShowToastSuccess(type) {
      if (type === 'success') {
        showSuccessToast(this.t('successTip'));
        return;
      }
      showFailToast(this.t('failTip'));
    },
    onShowDynamicToast() {
      const toast = showLoadingToast({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.t('dynamicTip', 3),
        // selector: '#custom-selector',
      });
      let second = 3;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        second -= 1;
        if (second) {
          toast.set('dataMessage', this.t('dynamicTip', second));
        } else {
          clearInterval(this.timer);
          closeToast();
        }
      }, 1000);
    },
    onShowHtmlToast() {
      showToast({
        message: this.t('htmlTip'),
        duration: 3000,
        type: 'html',
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>

