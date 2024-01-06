import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',
  dialog: 'tip-comp-dialog',
  'full-page': 'tip-comp-dialog--fullpage',
  'full-page--portrait': 'tip-comp-dialog--fullpage-portrait',
  content: 'tip-comp-dialog--fullpage-content',
  'content--received': 'tip-comp-dialog--fullpage-received',
  'content--get': 'tip-comp-dialog--fullpage-get',

  center: 'tip-comp-dialog--fullpage-center',
  'center-item': 'tip-comp-dialog--fullpage-centeritem',
  'base-info': 'tip-comp-dialog--fullpage-baseInfo',
  'goods-name': 'tip-comp-dialog--fullpage-tradename',
  'goods-desc': 'tip-comp-dialog--fullpage-limi-time',

  'button-wrap': 'tip-comp-dialog--fullpage-btn',
  'btn--medium-secondary': 'tip-comp-btn-medium-secondary',
  'btn--sure': 'tip-comp-dialog--fullpage-sure',

  'btn--cancel': 'tip-comp-dialog--fullpage-cancel',
  'btn--large-primary': 'tip-comp-btn-large-primary',
  'btn--large-secondary': 'tip-comp-btn-large-secondary',

  'received-box': 'tip-comp-dialog-received-box',
  'received-title': 'tip-comp-dialog-received-pop-title',
  'received-content': 'tip-comp-dialog-received-box-content',
  'received-status': 'tip-comp-dialog-received-get-status',

  'received-name': 'tip-comp-dialog-received-pop-jl-info',

  'received-img': 'tip-comp-dialog-received-box-img',
  'tip-wrap': 'tip-comp-dialog-received-num-info',
  'tip-name': 'tip-comp-dialog-received-sj-name',
  'button-box': 'tip-comp-dialog-received-pop-btn-box',

  'stay-out': 'tip-comp-dialog-received-stay-out',
  'height-line': 'tip-comp-dialog-received-height-line',
  'stay-out-new': 'tip-comp-dialog--Stay-out',
  tips: 'tip-comp-dialog--fullpage-tips',


  'sub-wrap': 'tip-comp-dialog--subscription-wrap',
  sub: 'tip-comp-dialog--subscription-check',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
