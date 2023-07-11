import Vue from 'vue';

export function initMixin() {
  Vue.mixin({
    // @ts-ignore
    onShareAppMessage() {
      return {
        title: 'Press UI 组件库演示',
        // path: '/pages/index/index',
        imageUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-avatar-wx-share.png',
      };
    },
    methods: {
      onGTip(title, duration = 1000) {
        uni.showToast({
          title,
          icon: 'none',
          duration,
        });
      },
    },

  });
}
