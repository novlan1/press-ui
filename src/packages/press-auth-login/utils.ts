import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  popup: 'tip-match-bottom-popup-wrap',
  mask: 'tip-match-mask',
  'mask--fade-in': 'tip-match-fade-in',
  'mask--fade-out': 'tip-match-fade-out',

  content: 'tip-match-popup-content',
  'content--bottom-enter': 'tip-match-bottom-enter',
  'content--bottom-leave': 'tip-match-bottom-leave',

  title: 'tip-match-title',
  close: 'tip-match-close',
  logo: 'tip-match-auth-logo',
  desc: 'tip-match-tip-desc',
  button: 'tip-match-auth-btn',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
