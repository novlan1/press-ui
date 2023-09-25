import { initGlobalMixin, initGlobalProps } from '../../packages/common/vue3/adapter';
import Toast from '../../packages/press-toast/index';

// Vue2 和 Vue3 的 uni-app 工程，共用的mixin
export function initMixin(app: any) {
  const mixin = {
    // @ts-ignore
    onShareAppMessage() {
      return {
        title: 'Press UI 组件库演示',
        // path: '/pages/index/index',
        imageUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-avatar-wx-share.png',
      };
    },
    onLoad() {
      // #ifdef MP-QQ
      // @ts-ignore
      qq?.showShareMenu?.({
        showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
      });
      // #endif
    },
    methods: {
      onGTip(title: string, duration = 1000) {
        uni.hideToast();
        uni.showToast({
          title,
          icon: 'none',
          duration,
        });
      },
      onGShowLoading(title?: string, options = {}) {
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

  // 注册$toast
  initGlobalProps({
    name: '$toast',
    prop: Toast,
  }, app);
}
