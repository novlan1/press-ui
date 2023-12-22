import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',
  'dialog--qq': 'tip-comp-dialog--input-qq-info',

  close: 'tip-comp-dialog--close',
  title: 'tip-comp-dialog--title',
  'title--qq': 'tip-comp-dialog--input-qq-title',

  content: 'tip-comp-dialog--input-qq-content',
  box: 'tip-comp-dialog--input-qq-box',

  'button-wrap': 'tip-comp-dialog--btn-cont',
  'btn--cancel': 'tip-comp-dialog-cancel',
  'btn--medium-secondary': 'tip-comp-btn-medium-secondary',
  'btn--disabled': 'tip-comp-button-disabled',
  'btn--sure': 'tip-comp-dialog-sure',
  'btn--medium-primary': 'tip-comp-btn-medium-primary',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
