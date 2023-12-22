import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',

  dialog: 'tip-comp-dialog',
  'dialog--select': 'tip-comp-dialog-select',

  close: 'tip-comp-dialog--close',

  title: 'tip-comp-dialog--title',
  'title--select': 'tip-comp-dialog--reward-title',

  content: 'tip-comp-dialog--reward-content',

  'award-list': 'tip-comp-select-reword-list',
  'award-item': 'tip-comp-select-reword-item',
  'award-item--active': 'active',

  left: 'item-left',
  box: 'tip-comp-select-box',
  image: 'tip-comp-select-image',
  'info-wrap': 'tip-comp-info-container',
  name: 'tip-comp-select-name',
  tip: 'tip-comp-stock-num',
  right: 'item-right',
  'select-button': 'select-button',

  bottom: 'item-bottom',
  buttons: 'tip-comp-dialog--btn-cont',

  btn: 'tip-comp-dialog--btn',
  'btn--close': 'tip-comp-btn-close',
  'btn--maxlarge-primary': 'tip-comp-btn-maxlarge-primary',
  'btn--disabled': 'tip-comp-btn-disabled',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
