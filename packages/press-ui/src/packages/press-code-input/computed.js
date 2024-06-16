import * as test from '../press-uploader/test';

export default {
  props: {
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: true,
    },
    // 最大输入长度
    maxLength: {
      type: [String, Number],
      default: 6,
    },
    // 是否用圆点填充
    dot: {
      type: Boolean,
      default: false,
    },
    // 显示模式，box-盒子模式，line-底部横线模式
    mode: {
      type: String,
      default: 'box',
    },
    // 是否细边框
    hairline: {
      type: Boolean,
      default: false,
    },
    // 字符间的距离
    space: {
      type: [String, Number],
      default: 10,
    },
    // 预置值
    value: {
      type: [String, Number],
      default: '',
    },
    // 是否自动获取焦点
    focus: {
      type: Boolean,
      default: false,
    },
    // 字体是否加粗
    bold: {
      type: Boolean,
      default: false,
    },
    // 字体颜色
    color: {
      type: String,
      default: '#606266',
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: 18,
    },
    // 输入框的大小，宽等于高
    size: {
      type: [String, Number],
      default: 35,
    },
    // 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
    disabledKeyboard: {
      type: Boolean,
      default: false,
    },
    // 边框和线条颜色
    borderColor: {
      type: String,
      default: '#c9cacc',
    },
    // 是否禁止输入"."符号
    disabledDot: {
      type: Boolean,
      default: true,
    },
  },
};


/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
export function getPx(value, unit = false) {
  if (test.number(`${value}`)) {
    return unit ? `${value}px` : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(`${value}`)) {
    return unit ? `${uni.upx2px(parseInt(`${value}`))}px` : Number(uni.upx2px(parseInt(`${value}`)));
  }
  return unit ? `${parseInt(`${value}`)}px` : parseInt(`${value}`);
}
