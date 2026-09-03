export const DEFAULT_HELPER_CONFIG = {
  banner: 'https://cdn.uwayfly.com/article/2023/10/own_mike_73efe2e280b57cd7f2.jpg',
  title: 'Press UI',
  description: '易用、灵活、丰富的跨端组件库',
  cellList: [
    {
      img: 'https://cdn.uwayfly.com/article/2023/10/own_mike_f7ed201e31e34255d0.png',
      title: '关于 Press UI',
      desc: '一套灵活、易用的跨端组件库',
      callback: 'INTRODUCE',
    },
    {
      img: 'https://cdn.uwayfly.com/article/2023/10/own_mike_2f0015528742ab3f15.png',
      title: '开发交流',
      desc: '欢迎提供意见、建议、想法',
      callback: 'GROUP_QRCODE',
    },
  ],
  groupQRCode: 'https://cdn.uwayfly.com/article/2023/10/own_mike_16e1b3ddcfd83bdb58.png',
};

/**
 * 首页「相关项目」区块的快捷链接列表。
 * 原从七彩石 CDN 接口下发，已改为本地配置。
 */
export const QUICK_LINK_LIST = [
  {
    label: 'Press UI 文档',
    name: 'PressUIDocs',
    link: 'https://novlan1.github.io/press-ui/',
  },
  {
    label: 'Vue3 Uniapp 示例',
    name: 'vue3-uni',
    link: 'https://novlan1.github.io/press-ui-demo-vue3-uni/',
    mpWeixin: {
      appId: 'wx2f9cc98a92e508fe',
    },
  },
  {
    label: 'Vue2 Uniapp 示例',
    name: 'vue2-uni',
    link: 'https://novlan1.github.io/press-ui/h5/',
    mpWeixin: {
      appId: 'wxd593abb04ef95f3e',
    },
    mpQQ: {
      appId: '1112254204',
    },
  },
  {
    label: 'Vue3 Uniapp 示例',
    name: 'vue3-not-uni',
    link: 'https://novlan1.github.io/press-ui-demo-vue3-pure/',
  },
  {
    label: 'Vue2 非 Uniapp 示例',
    name: 'vue2-not-uni',
    link: 'https://novlan1.github.io/press-ui-demo-vue2-pure/',
  },
];

/**
 * press-plus 小程序端需要隐藏的组件。
 * 原从七彩石 CDN 接口下发，已改为本地配置。
 */
export const PRESS_PLUS_HIDE_COMPONENTS_IN_MP = [
  'marquee',
  'hor-award-explain',
  'hor-dialog',
  'hor-match-header',
  'hor-match-index',
  'hor-owner-index',
  'hor-owner-theme',
  'hor-rule',
  'hor-schedule-manage',
  'login-p-c-scan',
  'hor-task',
  'live-player',
  'act-input-phone-dialog',
  'act-input-address-dialog',
  'act-input-q-q',
  'gp-index-hor',
];
