export default {
  props: {
    customStyle: {
      type: [String, Object],
      default: '',
    },
    // 文字颜色
    color: {
      type: String,
      default: '#2979ff',
    },
    // 字体大小，单位 px
    fontSize: {
      type: [String, Number],
      default: 15,
    },
    // 是否显示下划线
    underline: {
      type: Boolean,
      default: false,
    },
    // 要跳转的链接
    href: {
      type: String,
      default: '',
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
      type: String,
      default: '链接已复制，请在浏览器打开',
    },
    // 下划线颜色
    lineColor: {
      type: String,
      default: '',
    },
    // 超链接的问题，不使用 slot 形式传入，是因为 nvue 下无法修改颜色
    text: {
      type: String,
      default: '',
    },
  },
};
