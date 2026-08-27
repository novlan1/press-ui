export const PAGINATION_COMMON_PROPS = {
  mode: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
  current: {
    type: Number,
    default: 0,
  },
  customClass: {
    type: String,
    default: '',
  },
};


export const PAGINATION_NEXT_PROPS = {
  prevText: {
    type: String,
    default: '上一页',
  },
  nextText: {
    type: String,
    default: '下一页',
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  showPageSize: {
    type: Number,
    default: 5,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  forceEllipses: {
    type: Boolean,
    default: false,
  },
  showPrevButton: {
    type: Boolean,
    default: true,
  },
  showNextButton: {
    type: Boolean,
    default: true,
  },
};


export const PAGINATION_E_SPORT_PROPS = {
  expand: {
    type: Boolean,
    default: false,
  },
  tipTemplate: {
    type: String,
    default: '第{{0}}页',
  },
  autoScroll: {
    type: Number,
    default: 1,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
};

