import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  award: 'tip-act-dialog-wrap',
  name: 'name',
  link: 'link',

  main: 'dialog-box',
  'main--big': 'dialog-big',
  'icon--close': 'icon-close',

  'text--get': 'text-get',
  'text--received': 'text-nyhd',
  'text--detail': 'text-jlsm',

  content: 'dialog-content',
  'content--goods': 'wz-goods-content',
  left: 'left',
  right: 'right',

  'bg-get': 'bg-get',
  'label--used': 'label-used',
  'label--overtime': 'label-overtime',
  'label--got': 'label-got',

  'goods-box': 'goods-box',
  'goods-img': 'goods-img',

  'label--online': 'label-online',
  'label--offline': 'label-offline',
  'label--normal': 'label-normal',

  'goods-detail': 'goods-detail',
  'goods-tag': 'goods-discount',
  'goods-name': 'goods-name',
  'goods-time': 'goods-time',
  'goods-task': 'goods-task',

  'btn--normal-long': 'btn-normal-long',
  'btn--normal': 'btn-normal',
  'btn--normal-top': 'btn-normal-top',

  'goods-list-wrap': 'goods-list-wrap',
  'goods-list': 'goods-list',
  'goods-item': 'goods-list-item',
  'goods-item--current': 'current',

  'btn--goods-detail': 'btn-goods-detail',

  'exchange-wrap': 'get-wrap',
  'exchange-title': 'title-discount',
  'exchange-title--no-border': 'no-border',
  'exchange-title--top-border': 'top-border',

  'exchange-code': 'code-discount',
  'exchange-type': 'give-type',

  'barcode-bg': 'bg-bar-code',

  'wx-box': 'wz-goods-box',
  'wx-box--cdk': 'cdk',
  label: 'label',
  'wz-detail-wrap': 'wz-goods-detail-box',
  'wz-img': 'wz-goods-img',
  'wz-time': 'wz-goods-time',
  'wz-detail': 'wz-goods-detail',
  'wz-limit': 'wz-goods-condition',

  'wz-act-container': 'wz-act-container',
  'wz-info-box': 'wz-info-box',
  'wz-image-box': 'wz-image-box',
  'wz-image': 'wz-image',

  'wz-info-detail': 'wz-info-detail',
  'wz-detail-title': 'detail-title',
  'wz-detail-desc': 'detail-desc',

  'view-button': 'view-button',

  'wz-tips': 'wz-goods-tips',
  'wz-props': 'wz-goods-props',
  'item-props': 'item-props',
  'gift-popup': 'gift-tip-popup',
  'des-discount': 'des-discount',

  'flag-bg': 'flag-bg',
  'flag-name': 'flag-name',
  'flag-address': 'flag-address',
  'btn-more': 'btn-more',

  'radio-group': 'radio-group',
  radio: 'radio',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
