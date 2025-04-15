import { initGlobalMixin, initGlobalProps } from '../../common/vue3/adapter';
import Toast from '../../press-toast/index';


const SHARE_INFO = {
  title: 'Press UI 组件库',
  // path: '/pages/index/index',
  imageUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-avatar-wx-share.png',
};

// Vue2 和 Vue3 的 uni-app 工程，共用的 mixin
export function initDemoMixin(app, shareInfo = SHARE_INFO) {
  const mixin = {
    onShareAppMessage() {
      return {
        ...shareInfo,
      };
    },
    onShareTimeline() {
      return {
        ...shareInfo,
      };
    },
    onLoad() {
      // #ifdef MP-QQ
      // eslint-disable-next-line no-undef
      qq?.showShareMenu?.({
        showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
      });
      // #endif

      // https://opendocs.alipay.com/mini/api/xwq8e6
      // #ifdef MP-ALIPAY
      // eslint-disable-next-line no-undef
      my?.setNavigationBar({
        backgroundColor: '#fff',
        frontColor: '#000',
      });
      // #endif
    },
    data() {
      return {
      };
    },
    methods: {
      onGTip(title, duration = 1000) {
        uni.hideToast();
        if (!title) {
          return;
        }
        uni.showToast({
          title,
          icon: 'none',
          duration,
        });
      },
      onGShowLoading(title, options = {}) {
        uni.showLoading({
          title,
          ...options,
        });
      },
      onGHideToast() {
        uni.hideToast();
      },
    },

  };

  initGlobalMixin(mixin, app);

  // 注册 $toast
  initGlobalProps({
    name: '$toast',
    prop: Toast,
  }, app);
}
