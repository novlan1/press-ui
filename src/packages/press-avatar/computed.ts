export default {
  props: {
    // 头像图片路径(不能为相对路径)
    src: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: true,
    },
    // 头像尺寸
    size: {
      type: [String, Number],
      default: '40',
    },
    // 裁剪模式
    mode: {
      type: String,
      default: 'uni.$u.props.avatar.mode',
    },
    // 显示的文字
    text: {
      type: String,
      default: '',
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: '#c0c4cc',
    },
    // 文字颜色
    color: {
      type: String,
      default: '#fff',
    },
    // 文字大小
    fontSize: {
      type: [String, Number],
      default: 18,
    },
    // 显示的图标
    icon: {
      type: String,
      default: '',
    },
    // 显示小程序头像，只对百度，微信，QQ小程序有效
    mpAvatar: {
      type: Boolean,
      default: false,
    },
    // 是否使用随机背景色
    randomBackgroundColor: {
      type: Boolean,
      default: false,
    },
    // 加载失败的默认头像(组件有内置默认图片)
    defaultUrl: {
      type: String,
      default: '',
    },
    // 如果配置了 randomBackgroundColor 为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
    colorIndex: {
      type: [String, Number],
      // 校验参数规则，索引在0-19之间
      validator(n) {
        return n <= 19;
      },
      default: -1,
    },
    // 组件标识符
    name: {
      type: String,
      default: 'level',
    },
    customStyle: {
      type: String,
      default: '',
    },
  },
};
