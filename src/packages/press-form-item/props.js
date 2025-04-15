export default {
  props: {
    customStyle: {
      type: String,
      default: '',
    },
    // input的label提示语
    label: {
      type: String,
      default: '',
    },
    // 绑定的值
    prop: {
      type: String,
      default: '',
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: true,
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: '',
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: '',
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: '',
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: '',
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: false,
    },
    leftIconStyle: {
      type: [String, Object],
      default: '',
    },
  },
};
