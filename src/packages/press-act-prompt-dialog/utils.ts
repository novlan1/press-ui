import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',

  'dialog--prompt': 'tip-comp-dialog--prompt',
  hook: 'tip-comp-dialog-hook',
  title: 'tip-comp-dialog--title',
  'title--prompt': 'tip-comp-dialog-prompt-title',
  close: 'tip-comp-dialog--close',
  content: 'tip-comp-dialog--prompt-content',
  box: 'tip-comp-dialog--prompt-box',
  empty: 'tip-comp-dialog--prompt-empty',
  'pic-wrap': 'tip-comp-dialog-pic-wrap',
  notice: 'tip-comp-dialog--notice-title',

  'text--gold': 'tip-comp-dialog--notice-text-gold',
  text: 'tip-comp-dialog--notice-text',

  'button-wrap': 'tip-comp-dialog--btn-cont',
  'btn--cancel': 'tip-comp-dialog-cancel',
  'btn--sure': 'tip-comp-dialog-sure',
  'btn--back': 'tip-comp-dialog-back',
  'btn--enter': 'tip-comp-dialog-enter',
  'btn--form': 'tip-comp-dialog-fillin',
  'btn--i-know': 'tip-comp-btn-medium-iknow',
  'btn--notify': 'tip-comp-btn-medium-kaqitongzhi',
  'btn--medium-secondary': 'tip-comp-btn-medium-secondary',
  'btn--medium-primary': 'tip-comp-btn-medium-primary',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
