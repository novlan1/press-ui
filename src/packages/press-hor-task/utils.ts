import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  task: 'task-award-page',
  'header-right': 'task-award-right',
  'header-btn': 'task-award-btn',
  'header-rule': 'task-award-icon-rule',
  content: 'task-award-content',

  'award-title': 'task-award-title',
  'award-list': 'task-award-list',

  'task-list': 'task-list',
  'match-title': 'recommend-match-title',
  'match-list': 'match-list',

  'match-item': 'match-item',
  'match-label': 'match-label',
  'match-meta': 'match-top',
  'match-image': 'match-img',
  'match-name': 'match-name',
  'match-awards': 'award-list',

  'task-item': 'task-item',
  'task-name': 'task-name',
  'task-box': 'task-box',
  'task-award-img': 'task-award-img',

  'btn--primary': 'btn-primary',
  'btn--secondary': 'btn-secondary',
  'btn--text': 'btn-text',
};

export function getActClass(useTipClass: boolean, args: any) {
  return commonGetActClass(useTipClass, TIP_CLASS_MAP, args);
}
