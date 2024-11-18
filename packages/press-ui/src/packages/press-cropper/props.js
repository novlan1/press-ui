export const CROPPER_PROPS = {
  width: { // width of the container
    type: [String, Number],
    default: '100%',
  },
  height: { // height of the container
    type: [String, Number],
    default: '100%',
  },
  cutWidth: { // cutter width
    type: [String, Number],
    default: '50%',
  },
  cutHeight: { // cutter height
    type: [String, Number],
    default: 0,
  },
  minWidth: { // minWidth of the cutter
    type: Number,
    default: 50,
  },
  minHeight: { // minHeight of the cutter
    type: Number,
    default: 50,
  },
  center: { // autoCenter
    type: Boolean,
    default: true,
  },
  src: String,
  disableScale: Boolean, // disable to zoom
  disableRotate: {
    type: Boolean,
    default: false,
  },
  disableTranslate: Boolean,
  disableCtrl: Boolean, // disable to resize the cutter
  boundDetect: {
    type: Boolean,
    default: false,
  }, // open boundary detection
  freeBoundDetect: Boolean, // open boundary detection while doing rotation
  keepRatio: Boolean, // keep the ratio of the cutter
  disablePreview: {
    type: Boolean,
    default: false,
  }, // disable preview after cutting
  showCtrlBorder: Boolean, // show cutter border
  resetCut: Boolean, // reset cut while img change
  fit: {
    type: Boolean,
    default: true,
  },
  imageCenter: Boolean, // auto center/middle for image
  maxZoom: { // maximum scaling factor
    type: Number,
    default: 10, // can not be Infinity in baidu-MiniProgram
  },
  minZoom: { // minimum scaling factor
    type: Number,
    default: 1,
  },
  angle: { // initial angle of rotation
    type: Number,
    default: 0,
  },
  zoom: { // initial scaling factor
    type: Number,
    default: 1,
  },
  offset: { // initial offset relative to the cutter left border
    type: Array,
    default() {
      return [0, 0];
    },
  },
  background: {
    type: String,
    default: '#000',
  },
  canvasBackground: { // background for the exported image
    type: String,
    default: '#fff',
  },
  canvasZoom: {  // export multiples of the cutter size
    type: Number,
    default: 1,
  },
  fileType: {
    type: String,
    default: 'png',
    validator(t) {
      return ['png', 'jpg'].includes(t);
    },
  },
  quality: {
    type: Number,
    default: 1,
  },
  maskType: { // type for mask
    type: String,
    default: 'shadow',
  },
  circleView: Boolean, // circle clip view
};
