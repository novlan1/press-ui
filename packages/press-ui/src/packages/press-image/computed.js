export default {
  props: {
    // 图片地址
    src: {
      type: String,
      default: '',
    },
    // 裁剪模式
    mode: {
      type: String,
      default: 'scaleToFill',
    },
    // 宽度，单位任意
    width: {
      type: [String, Number],
      default: 300,
    },
    // 高度，单位任意
    height: {
      type: [String, Number],
      default: 225,
    },
    // 是否为圆形
    round: {
      type: Boolean,
      default: false,
    },
    // 圆角，单位任意
    radius: {
      type: [String, Number],
      default: 0,
    },
    // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
    lazyLoad: {
      type: Boolean,
      default: true,
    },
    // 开启长按图片显示识别微信小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      default: true,
    },
    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: 'photo',
    },
    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: 'photo-fail',
    },
    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: true,
    },
    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true,
    },
    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: true,
    },
    // 只支持网络资源，只对微信小程序有效
    webp: {
      type: Boolean,
      default: false,
    },
    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 500,
    },
    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    backgroundColor: {
      type: String,
      default: '#f3f4f6',
    },
    customStyle: {
      type: String,
      default: '',
    },
    transitionStyle: {
      type: String,
      default: '',
    },
  },
};
