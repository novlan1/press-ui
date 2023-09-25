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
    jumpLink(this: any, urlKey = 'url') {
      const url = this[urlKey];
      if (url) {
        // #ifdef H5
        if (isNotInUni()) {
          (this as any).$router?.push?.(url);
          return;
        }
        // #endif

        const linkType = this.linkType || 'navigateTo';

        if (linkType === 'navigateTo'
            && getCurrentPages().length > 9
        ) {
          uni.redirectTo({ url });
        } else {
          uni[linkType]({ url });
        }
      }
    },
  },
};
