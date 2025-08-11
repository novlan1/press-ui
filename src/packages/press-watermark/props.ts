export const WATERMARK_PROPS = {
  gapX: {
    type: Number,
    default: 0,
  },
  gapY: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  rotate: {
    type: [Number, String],
    default: -22,
  },
  zIndex: {
    type: [Number, String],
    default: 100,
  },
  content: {
    type: String,
    default: '',
  },
  opacity: {
    type: [Number, String],
    default: 1,
  },
  fullPage: {
    type: Boolean,
    default: false,
  },
  textColor: {
    type: String,
    default: '#dcdee0',
  },
};
