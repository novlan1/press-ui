import { t } from '../locale';

export const pickerProps = {
  title: String,
  loading: Boolean,
  showToolbar: Boolean,
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
