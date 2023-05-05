import {
  ROW_HEIGHT,
  initialMinDate,
  initialMaxDate,
} from './utils';
import { t } from '../locale';

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
    default: initialMinDate,
  },
  maxDate: {
    type: Number,
    default: initialMaxDate,
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
