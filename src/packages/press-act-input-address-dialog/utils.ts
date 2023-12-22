import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',
  'dialog--address': 'tip-comp-dialog--input-addr',

  close: 'tip-comp-dialog--close',

  title: 'tip-comp-dialog--title',
  'title--address': 'tip-comp-dialog--input-addr-title',

  info: 'tip-comp-dialog--input-info-content',
  'info-list': 'tip-comp-dialog--input-info-list',
  'info-item': 'tip-comp-dialog--input-item',
  'input-wrap': 'tip-comp-dialog--input-wrap',

  'input-area': 'tip-comp-dialog--area',
  'input-area--placeholder': 'tip-comp-dialog--placeholder',

  'address-detail': 'tip-comp-dialog--detail-addr',
  tip: 'tip-comp-dialog--input-info-msg',
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
