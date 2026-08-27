import { t } from '../locale';

import {
  ROW_HEIGHT,
  INITIAL_MIX_DATE,
  INITIAL_MAX_DATE,
} from './utils';


export const SHARE_PROPS = {
  title: {
    type: String,
    default: t('calendar.title'),
  },
  color: { type: String, default: '' },
  formatter: { type: Function, default: null },
  confirmText: {
    type: String,
    default: t('calendar.confirm'),
  },
  confirmDisabledText: {
    type: String,
    default: t('calendar.confirm'),
  },
  allowSameDay: Boolean,
  type: {
    type: String,
    default: 'single',
    observer: 'reset',
  },
  minDate: {
    type: Number,
    default: INITIAL_MIX_DATE,
  },
  maxDate: {
    type: Number,
    default: INITIAL_MAX_DATE,
  },
  rowHeight: {
    type: null,
    default: ROW_HEIGHT,
  },
  showMark: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  poppable: {
    type: Boolean,
    default: true,
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
};
