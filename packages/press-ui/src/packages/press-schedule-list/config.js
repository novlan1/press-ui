import { t } from '../locale';

export const MIDDLE_BUTTON_STATUS_MAP = {
  manage: 'MANAGE',
  watch: 'WATCH',
  play: 'PLAY',
  review: 'REVIEW',
  order: 'ORDER',
  hasOrdered: 'HAVE_ORDERED',
};

export const MIDDLE_BUTTON_TITLE_MAP = {
  [MIDDLE_BUTTON_STATUS_MAP.manage]: t('scheduleList.manage'),
  [MIDDLE_BUTTON_STATUS_MAP.watch]: t('scheduleList.spectate'),
  [MIDDLE_BUTTON_STATUS_MAP.play]: t('scheduleList.toPlay'),
  [MIDDLE_BUTTON_STATUS_MAP.review]: t('scheduleList.reCap'),
  [MIDDLE_BUTTON_STATUS_MAP.order]: t('scheduleList.subscribe'),
  [MIDDLE_BUTTON_STATUS_MAP.hasOrdered]: t('scheduleList.subscribed'),
};

