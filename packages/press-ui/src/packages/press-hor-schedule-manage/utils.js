import { getActClass as commonGetActClass } from '../common/utils/act-bem';

export const TIP_CLASS_MAP = {
  bar: 'gp-match-bar',
  close: 'gp-match-close',

  'bar-item': 'gp-match-bar-item',
  'bar-item--active': 'gp-match-bar-item-active',

  left: 'left-container',
  header: 'schedule-manage-header',
  'head-helmet': 'img-helmet',
  'head-title': 'peace-text',
  'head-ob': 'btn-referee-watch',
  main: 'schedule-manage-container',

  'match-tabs': 'match-tabs',
  'search-wrap': 'schedule-manage-search',
  'search-input': 'search-input',
  'icon-search': 'icon-search',
  'btn-cancel': 'btn-cancel',
  'team-group': 'team-group',
  'team-item': 'team-item',
  'item-top': 'item-top',
  'item-top--gray': 'item-top-gray',
  'label-gray': 'label-gray',

  'team-name': 'team-title-num',
  'team-desc': 'team-title-branch',
  'item-bottom': 'item-bottom',
  'item-logos': 'team-logo-group',
  'item-logo': 'team-logo-item',

  'item-check': 'item-status-check',
  'icon-guide': 'icon-guide',
  'item-status': 'item-status',
  // 'gray': 'gray',
  footer: 'schedule-manage-footer',
  'btn-search': 'btn-search',
  'btn-refresh': 'btn-refresh',
  'icon-refresh': 'icon-refresh',
  'btn-group': 'btn-group',
  'primary-btn': 'primary-btn',
  'secondary-btn': 'secondary-btn',
  'disabled-btn': 'disabled-btn',

  'des-text': 'des-text',
  'table-head': 'team-list-head',
  'table-rank': 'team-rank',
  'table-history': 'team-history',
  'table-score': 'team-score',
  'table-operate': 'team-operate',
  'table-name': 'team-name',
  'table-num': 'team-num',
  'table-detail': 'team-detail',
  'table-full': 'team-full',
  'table-status': 'team-status',

  'table-main': 'team-list-group',
  'table-item': 'team-list-item',
  'table-team-name': 'name',
  checkbox: 'checkbox',
  'checkbox--disabled': 'disabled',
  'checkbox--checked': 'checked',

  'team-popover': 'team-info',
  'team-popover-name': 'team-info-name',
  'team-popover-list': 'team-info-personal',

  grouping: 'team-num-wrap',
  'select-box': 'select-box',
  select: 'select',
  option: 'option',

  'tab-warp': 'tab-warp',
  'history-detail': 'team-history-detail',
  'history-detail-head': 'team-history-detail-head',
  'history-detail-list': 'team-history-detail-list',
  'ob-eye': 'operate-icon-eye',

  'personal-box': 'personal-box',
  'personal-avatar-box': 'personal-avatar-box',
  'personal-avatar': 'personal-avatar',
  'personal-avatar--invite': 'personal-avatar-invite',
  'personal-label-ready': 'label-personal-ready',
  'personal-label-enter': 'label-personal-enter',
  'personal-status-leader': 'status-leader',
  'personal-status-leader--invite': 'status-leader-invite',

  'personal-rank-img': 'personal-rank-img',
  'personal-add': 'personal-add',
  'icon-people': 'icon-people',
  'personal-empty': 'personal-empty',
  'personal-empty--invite': 'personal-empty-invite',

  'personal-msg-card': 'personal-msg-card',
  'personal-msg-name': 'personal-msg-name',
  'personal-msg-box': 'personal-msg-box',
  'personal-member-rank': 'team-member-rank',
  'personal-member-name': 'team-member-name',
  'personal-more-msg': 'more-msg-box',
  'personal-rank': 'personal-rank',
  'personal-rank-name': 'personal-rank-name',
};

export function getActClass(...args) {
  return commonGetActClass(false, TIP_CLASS_MAP, args);
}
