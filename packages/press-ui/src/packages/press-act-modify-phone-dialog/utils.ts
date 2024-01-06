import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',
  'dialog-update': 'tip-comp-dialog-modify-phone',

  close: 'tip-comp-dialog-close',
  title: 'tip-comp-dialog-title',
  content: 'tip-comp-dialog-content',

  'phone-number': 'phone-number',
  'code-wrap': 'code-wrap',
  'code-number': 'code-number',
  'code-btn': 'send-code',
  'code-btn--disabled': 'disabled',

  'button-wrap': 'tip-comp-dialog-btn-wrap',
  'btn--cancel': 'tip-comp-dialog-cancel',
  'btn--medium-secondary': 'tip-comp-btn-medium-secondary',
  'btn--sure': 'tip-comp-dialog-sure',
  'btn--medium-primary': 'tip-comp-btn-medium-primary',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
