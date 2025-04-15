import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  popup: 'tip-match-bottom-popup-wrap',
  mask: 'tip-match-mask',
  'mask--fade-in': 'tip-match-fade-in',
  'mask--fade-out': 'tip-match-fade-out',

  content: 'tip-match-popup-content',
  'content--bottom-enter': 'tip-match-bottom-enter',
  'content--bottom-leave': 'tip-match-bottom-leave',

  'title-wrap': 'tip-match-popup-title-wrap',
  'title-line': 'tip-match-popup-title-line',
  back: 'tip-match-popup-back',
  title: 'tip-match-popup-title',
  close: 'tip-match-popup-close',

  'qr-code': 'tip-match-wx-code',
  save: 'tip-match-code-save',
  tip: 'tip-match-code-tip',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
