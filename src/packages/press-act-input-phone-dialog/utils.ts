import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',
  'dialog-phone': 'tip-comp-dialog--input-phone-info',

  close: 'tip-comp-dialog--close',
  title: 'tip-comp-dialog--title',
  'title--phone': 'tip-comp-dialog--input_phone-title',

  content: 'tip-comp-dialog--input_phone-content',
  box: 'tip-comp-dialog--input_phone-box',

  'phone-number': 'phone-number',
  'code-wrap': 'code-wrap',
  'code-number': 'code-number',
  'code-btn': 'send-code',
  'code-btn--disabled': 'disabled',

  message: 'tip-comp-dialog--input_phone-msg',
  'treaty-wrap': 'tip-comp-dialog--treaty-wrap',
  'treaty-check': 'tip-comp-dialog--treaty-check',
  'treaty-terms': 'tip-comp-dialog--treaty-terms',
  'treaty-desc': 'tip-comp-dialog--phone-treaty-desc',

  'button-wrap': 'tip-comp-dialog--btn-cont',
  'btn--cancel': 'tip-comp-dialog-cancel',
  'btn--medium-secondary': 'tip-comp-btn-medium-secondary',
  'btn--disabled': 'tip-comp-button-disabled',
  'btn--sure': 'tip-comp-dialog-sure',
  'btn--medium-primary': 'tip-comp-btn-medium-primary',

  'act-checkbox': 'tip-comp-checkbox-normal',
  'act-checkbox--checked': 'checked',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
