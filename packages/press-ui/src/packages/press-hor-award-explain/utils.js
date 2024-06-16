import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  'award-explain': 'tip-match-wrap',
  awards: 'tip-match-award-group',
  rank: 'tip-match-rank',
  award: 'tip-match-award-item',
  image: 'tip-match-award-img',
  meta: 'tip-match-award-content',
  name: 'tip-match-award-name',
  label: 'tip-match-award-label',
  description: 'tip-match-award-des',
};

export function getActClass(useTipClass, args) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
