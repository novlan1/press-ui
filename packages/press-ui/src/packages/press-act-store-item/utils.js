import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  store: 'tip-comp-storelist-item',
  img: 'tip-comp-storelist-item-img',
  detail: 'tip-comp-storelist-item-detailinfo',
  name: 'tip-comp-storelist-item-name',
  'icon--primary': 'tip-comp-icon-primary',
  distance: 'tip-comp-storelist-item-distance',
  'distance--primary': 'tip-comp-distance-primary',

  addr: 'tip-comp-storelist-item-addr',
  'icon--addr': 'tip-comp-storelist-icon-addr',
  'distance--secondary': 'tip-comp-distance-secondary',

  address: 'tip-comp-storelist-item-address',

  'icon--secondary': 'tip-comp-icon-secondary',
  'icon--instore': 'tip-comp-icon-instore',
  'icon--eventbeen': 'tip-comp-icon-eventbeen',
  'icon--lately': 'tip-comp-icon-lately',

  'icon-state': 'tip-comp-storelist-icon-state',
  'icon--jp': 'tip-comp-storelist-item-icon-jp',
  'icon--yp': 'tip-comp-storelist-item-icon-yp',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
