export function deepClone(vnodes, createElement) {
  function cloneVNode(vnode) {
    const clonedChildren = vnode.children?.map(cloneVNode);
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
    cloned.text = vnode.text;
    cloned.isComment = vnode.isComment;
    cloned.componentOptions = vnode.componentOptions;
    cloned.elm = vnode.elm;
    cloned.context = vnode.context;
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    return cloned;
  }

  return vnodes.map(cloneVNode);
}

export const SWIPER_PROPS = {
  indicatorDots: {
    type: [Boolean, String],
    default: false,
  },
  vertical: {
    type: [Boolean, String],
    default: false,
  },
  autoplay: {
    type: [Boolean, String],
    default: false,
  },
  circular: {
    type: [Boolean, String],
    default: false,
  },
  interval: {
    type: [Number, String],
    default: 5e3,
  },
  duration: {
    type: [Number, String],
    default: 500,
  },
  current: {
    type: [Number, String],
    default: 0,
  },
  indicatorColor: {
    type: String,
    default: '',
  },
  indicatorActiveColor: {
    type: String,
    default: '',
  },
  previousMargin: {
    type: String,
    default: '',
  },
  nextMargin: {
    type: String,
    default: '',
  },
  currentItemId: {
    type: String,
    default: '',
  },
  skipHiddenItemLayout: {
    type: [Boolean, String],
    default: false,
  },
  displayMultipleItems: {
    type: [Number, String],
    default: 1,
  },
  disableTouch: {
    type: [Boolean, String],
    default: false,
  },
  navigation: {
    type: [Boolean, String],
    default: false,
  },
  navigationColor: {
    type: String,
    default: '#fff',
  },
  navigationActiveColor: {
    type: String,
    default: 'rgba(53, 53, 53, 0.6)',
  },
};
