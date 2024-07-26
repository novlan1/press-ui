import { initGlobalMixin, initGlobalProps } from '../../packages/common/vue3/adapter';
import Toast from '../../packages/press-toast/index';
import {
  FUNCTIONAL_ID_MAP,
} from '../../packages/press-popup-cell/demo-helper/helper';


const SHARE_INFO = {
  title: 'Press UI 组件库',
  // path: '/pages/index/index',
  imageUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-avatar-wx-share.png',
};

// Vue2 和 Vue3 的 uni-app 工程，共用的 mixin
export function initMixin(app: any) {
  const mixin = {
    // @ts-ignore
    onShareAppMessage() {
      return {
        ...SHARE_INFO,
      };
    },
    onShareTimeline() {
      return {
        ...SHARE_INFO,
      };
    },
    onLoad() {
      // #ifdef MP-QQ
      // @ts-ignore
      qq?.showShareMenu?.({
        showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
      });
      // #endif

      // https://opendocs.alipay.com/mini/api/xwq8e6
      // #ifdef MP-ALIPAY
      // @ts-ignore
      my?.setNavigationBar({
        backgroundColor: '#fff',
        // @ts-ignore
        frontColor: '#000',
      });
      // #endif
    },
    data() {
      return {
        FUNCTIONAL_ID_MAP,
      };
    },
    methods: {
      onGTip(title: string, duration = 1000) {
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

  // 注册 $toast
  initGlobalProps({
    name: '$toast',
    prop: Toast,
  }, app);
}
