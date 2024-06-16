import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',

  dialog: 'tip-comp-dialog',
  'dialog--qr': 'tip-comp-dialog--scan-code',

  close: 'tip-comp-dialog--close',

  title: 'tip-comp-dialog--title',
  'title--qr': 'tip-comp-dialog--scan-code-title',

  content: 'tip-comp-dialog--scan-code-content',
  image: 'tip-comp-dialog--scan-code-img',
  desc: 'tip-comp-dialog--scan-code-subhead',
  'button-wrap': 'tip-comp-dialog--scan-code-btn',
  'btn--qr': 'tip-comp-dialog--scan-code-sure',
  'btn--medium-primary': 'tip-comp-btn-medium-primary',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
