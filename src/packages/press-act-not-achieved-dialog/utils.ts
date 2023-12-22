import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',

  dialog: 'tip-comp-dialog',
  'dialog--fail': 'tip-comp-dialog--notachieved',

  close: 'tip-comp-dialog--close',

  title: 'tip-comp-dialog--title',
  'title--fail': 'tip-comp-dialog--notachieved-title',

  content: 'tip-comp-dialog--notachieved-content',
  name: 'tip-comp-dialog--notachieved-prizesmsg-name',

  user: 'tip-comp-dialog--notachieved-useinfo',
  'progress-wrap': 'tip-comp-dialog--notachieved-box',

  progress: 'tip-comp-dialog--notachieved-progressdetail',
  num: 'tip-comp-dialog--notachieved-num',
  'progress-bar': 'tip-comp-dialog--notachieved-progressbar',

  buttons: 'tip-comp-dialog--btn-cont',
  btn: 'tip-comp-dialog--btn',
  'btn--maxlarge-primary': 'tip-comp-btn-maxlarge-primary',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
