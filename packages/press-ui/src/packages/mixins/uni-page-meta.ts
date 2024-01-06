
export const uniSystemInfoMixin = {
  data() {
    return {
      mixinRootFontSize: 50,
    };
  },
  computed: {
  },
  mounted() {
    (this as any).onSetFontSize();
  },
  beforeDestroy() {
  },
  methods: {
    onSetFontSize() {
      // 宽度 375 时（iphone6），rootFontSize为50，则一份为 375/50=7.5
      const screenNumber = 7.5;
      const that = this as any;

      if (that.mpType === 'page') {
        try {
          // 窗体改变大小触发事件
          uni.onWindowResize((res) => {
            if (res?.size?.windowWidth) {
              that.mixinRootFontSize = parseFloat(`${res?.size?.windowWidth}`) / screenNumber;
            }
          });

          // 打开获取屏幕大小
          uni.getSystemInfo({
            success(res) {
              const fontsize = res.screenWidth / screenNumber;
              that.mixinRootFontSize = fontsize;
            },
          });
        } catch (err) {
          console.log('err', err);
        }
      }
    },
  },
};


