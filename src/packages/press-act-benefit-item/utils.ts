import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  benefit: 'tip-act-welfare-item',
  top: 'tip-act-welfare-top',

  'shop-icon': 'tip-act-welfare-shop-icon',
  'shop-name': 'tip-act-welfare-shop',
  'shop-desc': 'tip-act-welfare-range',

  main: 'tip-act-welfare-main',
  'goods-img': 'tip-act-welfare-img',
  info: 'tip-act-welfare-info',
  'goods-name': 'tip-act-welfare-detail',
  'goods-desc': 'tip-act-welfare-name',
  'tip-line': 'tip-act-welfare-tip-con',

  'tip-wrap': 'tip-act-welfare-tip-wrap',
  tip: 'tip-act-welfare-tip',

  buttons: 'tip-act-welfare-btn-wrap',
  process: 'tip-act-welfare-process',
  'benefit-btn': 'tip-act-welfare-btn',
  'benefit-btn--use': 'tip-act-use-btn',
  'benefit-btn--out': 'tip-act-out-btn',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
