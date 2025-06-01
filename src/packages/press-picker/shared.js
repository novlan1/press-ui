import { t } from '../locale';

export const pickerProps = {
  title: { type: String, default: '' },
  showToolbar: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },

  cancelButtonText: {
    type: String,
    default: t('picker.cancel'),
  },
  confirmButtonText: {
    type: String,
    default: t('picker.confirm'),
  },
  visibleItemCount: {
    type: Number,
    default: 6,
  },
  itemHeight: {
    type: [Number, String],
    default: 44,
  },
};
