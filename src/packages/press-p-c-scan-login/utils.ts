import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  dialog: 'tip-wx-login-dialog-layout',
  content: 'tip-wx-login-dialog-content',
  header: 'el-dialog__header',
  title: 'el-dialog__title',

  'header-button': 'el-dialog__headerbtn',
  close: 'el-dialog__close',
  icon: 'el-icon',
  'icon--close': 'el-icon-close',

  'login-wrap': 'dialog-login-contant',
  'login-content': 'login-content',
  'login-inner': 'login_container',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
