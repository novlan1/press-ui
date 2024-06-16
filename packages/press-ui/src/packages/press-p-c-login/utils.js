import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  dialog: 'tip-toc-dialog-wrap',
  main: 'tip-toc-bottomdialog',
  close: 'tip-toc-dialog-close',
  title: 'tip-toc-dialog-title',
  login: 'tip-toc-login',
  text: 'public-text',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
