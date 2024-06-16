import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  dialog: 'tip-toc-dialog-wrap',
  main: 'tip-toc-bottomdialog',
  close: 'tip-toc-dialog-close',
  title: 'tip-toc-dialog-title',
  login: 'tip-toc-login',
  text: 'public-text',

  role: 'tip-toc-dialog-role',
  back: 'tip-toc-dialog-return',
  'wx-login': 'tip-toc-wechat-login',
  'wx-login-img': 'tip-toc-wechat-login-img',
  'wx-login-tip': 'tip-toc-wechat-login-tips',

  save: 'tip-toc-press-save',
  'qq-login-img': 'tip-toc-qq-login-img',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
