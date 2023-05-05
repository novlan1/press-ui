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
        if (this.linkType === 'navigateTo'
                    && getCurrentPages().length > 9) {
          uni.redirectTo({ url });
        } else {
          uni[this.linkType]({ url });
        }
      }
    },
  },
};
