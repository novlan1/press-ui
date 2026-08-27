import { genAllProps } from '../common/component-handler/press-component';

export const propsKeyMap = {
  arrowIcon: 'showBackArrow',
  list: 'selectList',
  current: 'selectItem',
  confirm: 'onClickConfirm',
  cancel: 'onRemove',
};

export const newProps = {
  // 左上角是否显示为返回箭头
  arrowIcon: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  // 数据列表
  list: {
    type: Array,
    default: () => [],
    required: false,
  },
  current: {
    type: Object,
    default: null,
    required: false,
  },
  // 提示
  tip: {
    type: String,
    default: '',
    required: false,
  },
  confirm: {
    type: Function,
    default: null,
    required: false,
  },
  cancel: {
    type: Function,
    default: null,
    required: false,
  },
  virtualListThreshold: {
    type: Number,
    default: 50,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
};


export const allProps = genAllProps(newProps, propsKeyMap);

