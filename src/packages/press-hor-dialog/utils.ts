import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  'hor-dialog': 'tip-match-container',
  mask: 'tip-match-mask',
  border: 'tip-match-border',
  content: 'tip-match-content',
  header: 'tip-match-header',
  title: 'tip-match-title',
  close: 'tip-match-close',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
