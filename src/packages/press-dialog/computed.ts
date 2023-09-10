import { t } from '../locale';

export const dialogProps = {
  show: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: '',
  },
  dialogType: {
    type: [Number, String],
    default: 1,
  },
  title: {
    type: String,
    default: t('dialog.title'),
  },
  content: {
    type: String,
    default: '',
  },
  canTouchRemove: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: t('confirm'),
  },
  cancelText: {
    type: String,
    default: '',
  },
  onClickCancel: {
    type: [Function, null],
    default: null,
  },
  onConfirmClick: {
    type: [Function, null],
    default: null,
  },
  htmlContent: {
    type: String,
    default: '',
  },
  zIndex: {
    type: [Number, String],
    default: '99',
  },
  useScrollView: {
    type: Boolean,
    default: false,
  },
  onClickImage: {
    type: [Function, null],
    default: null,
  },
  onLongPressImage: {
    type: [Function, null],
    default: null,
  },
  showField: {
    type: Boolean,
    default: false,
  },
  fieldPlaceHolder: {
    type: String,
    default: '',
  },
  fieldValue: {
    type: String,
    default: '',
  },
};
