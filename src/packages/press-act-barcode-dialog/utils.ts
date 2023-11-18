import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  barcode: 'tip-act-dialog-wrap',
  main: 'dialog-box',
  'main--barcode': 'dialog-bar-code',
  'icon--close': 'icon-close',
  title: 'title-bar-code',
  'barcode-wrap': 'bg-bar-code',
  'barcode-left': 'left',
  'barcode-right': 'right',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
