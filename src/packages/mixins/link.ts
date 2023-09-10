import { isNotInUni } from '../common/utils/utils';

export const link = {
  props: {
    url: { type: String, default: '' },
    linkType: {
      type: String,
      default: 'navigateTo',
    },
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this[urlKey];
      if (url) {
        // #ifdef H5
        if (isNotInUni()) {
          (this as any).$router?.push?.(url);
          return;
        }
        // #endif

        if ((this as any).linkType === 'navigateTo'
                    && getCurrentPages().length > 9) {
          uni.redirectTo({ url });
        } else {
          uni[(this as any).linkType]({ url });
        }
      }
    },
  },
};
