import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  popup: 'tip-match-bottom-popup-wrap',
  content: 'tip-match-popup-content',
  'content--bottom-enter': 'tip-match-bottom-enter',
  'content--bottom-leave': 'tip-match-bottom-leave',

  title: 'tip-match-title',
  close: 'tip-match-close',
  logo: 'tip-match-logo',
  name: 'tip-match-name',
  desc: 'tip-match-desc',

  'login-list': 'tip-match-login-list',
  'login-item': 'tip-match-login-item',
  agreements: 'tip-match-agreement-wrap',
  'checkbox--checked': 'tip-match-checked',
  checkbox: 'tip-match-check',
  agreement: 'tip-match-agreement',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
