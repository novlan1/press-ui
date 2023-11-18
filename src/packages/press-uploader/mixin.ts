export default {
  watch: {
    // 监听accept的变化，判断是否符合个平台要求
    // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
    accept: {
      immediate: true,
      handler(val) {
        // #ifndef MP-WEIXIN
        if (val === 'all' || val === 'media') {
          console.warn('只有微信小程序才支持把 accept 配置为 all、media 之一');
        }
        // #endif
        // #ifndef H5 || MP-WEIXIN
        if (val === 'file') {
          console.warn('只有微信小程序和H5才支持把 accept 配置为 file');
        }
        // #endif
      },
    },
  },
};
