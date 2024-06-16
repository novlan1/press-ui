import { genAllProps } from '../common/component-handler/press-component';

export const propsKeyMap = {
  arrowIcon: 'showBackArrow',
  closeIcon: 'isShowpopupClose',
  showTitle: 'isShowTitle',
  horizontal: 'isCrossSlab',
  title: 'popupTitle',
  button: 'popupTitleBtn',

  borderButton: 'isBorderBtn',
  closeOnClickOverlay: 'canTouchRemove',
  confirm: 'onConfirm',
  cancel: 'onCancel',
};


export const newProps = {
  customStyle: {
    type: String,
    default: '',
  },
  // 是否显示标题
  showTitle: {
    type: Boolean,
    default: true,
    required: false,
  },
  // 横板弹窗宽度百分比
  widthNumber: {
    type: Number,
    default: 100,
    required: false,
  },
  // 是否切换横板样式
  horizontal: {
    type: Boolean,
    default: false,
    required: false,
  },
  // 是否显示关闭按钮
  closeIcon: {
    type: Boolean,
    default: false,
    required: false,
  },
  // 左上角是否显示为返回箭头
  arrowIcon: {
    type: Boolean,
    default: false,
  },
  // 弹窗标题
  title: {
    type: String,
    default: '',
    required: false,
  },
  // 弹窗标题按钮
  button: {
    type: String,
    default: '',
    required: false,
  },
  // 标题按钮样式
  borderButton: {
    type: Boolean,
    default: false,
    required: false,
  },
  // 按钮置灰
  disabledButton: {
    type: Boolean,
    default: false,
    required: false,
  },
  // 在执行确认动画前，validateConfirm返回false则进行拦截
  validateConfirm: {
    type: [Function, null],
    default: null,
  },
  isShow: {
    type: Boolean,
    default: true,
    required: false,
  },
  // 弹窗层级
  zIndex: {
    type: String,
    default: '99',
    required: false,
  },
  // class
  popupClass: {
    type: String,
    default: '',
    required: false,
  },
  // 是否可以点击蒙版关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  // 即将废弃，用 asyncCancel 代替
  asyncClose: {
    type: [Function, null],
    default: null,
  },
  asyncCancel: {
    type: [Function, null],
    default: null,
  },
  asyncConfirm: {
    type: [Function, null],
    default: null,
  },
  mode: {
    type: String,
    default: '',
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
};

export const allProps = genAllProps(newProps, propsKeyMap);

