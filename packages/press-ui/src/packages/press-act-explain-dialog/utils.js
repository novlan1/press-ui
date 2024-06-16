import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',

  dialog: 'tip-comp-dialog',
  'dialog--tip': 'tip-comp-explain-tip',

  'title--text': 'tip-comp-text-title',
  title: 'tip-comp-dialog--title',
  'title--explain': 'tip-comp-explain-title',

  close: 'tip-comp-explain-close',
  detail: 'tip-comp-explain-detail',
  buttons: 'tip-comp-dialog--btn-cont',
  'btn--large-primary': 'tip-comp-btn-large-primary',
  'btn--sure': 'tip-comp-dialog-sure',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
