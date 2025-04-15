const props = {
  /** 透传 返回 的全部属性，示例：`{ content: '返回', type: 'default' }` */
  backButtonProps: {
    type: Object,
    default: () => ({}),
  },
  /** 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景 */
  current: {
    type: Number,
    default: -1,
  },
  /** 透传 完成 的全部属性，示例：`{ content: '完成', type: 'primary' }` */
  finishButtonProps: {
    type: Object,
    default: () => ({}),
  },
  /** 是否隐藏计数 */
  hideCounter: {
    type: Boolean,
    default: false,
  },
  /** 是否隐藏跳过按钮 */
  hideSkip: {
    type: Boolean,
    default: false,
  },
  /** 高亮框的内边距，单位rpx */
  highlightPadding: {
    type: Number,
    default: 16,
  },
  /** 引导框的类型 */
  mode: {
    type: String,
    default: 'popover',
  },
  /** 透传 下一步按钮 的全部属性，示例：{ content: '下一步', type: 'primary' } */
  nextButtonProps: {
    type: Object,
    default: () => ({}),
  },
  /** 是否出现遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 透传 跳过按钮 的全部属性，{ content: '跳过', type: 'default' } */
  skipButtonProps: {
    type: Object,
    default: () => ({}),
  },
  /** 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。 */
  steps: {
    type: Array,
    default: () => ([]),
  },
  /** 是否使用了自定义导航栏 */
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  /** 提示框的层级 */
  zIndex: {
    type: Number,
    default: 999999,
  },
};

export default props;
