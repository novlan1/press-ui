export function getHideHeaderMixin() {
  return {
    data() {
      const horizontal = false;
      // #ifdef H5
      // horizontal = document.documentElement.clientHeight < 420;
      // #endif

      return {
        showHeader: !horizontal,
      };
    },
    mounted(this: any) {
      if (!this.showHeader) {
        this.setHeaderStyle('none');
      }
    },
    methods: {
      onToggleShowHeader(this: any) {
        this.showHeader = !this.showHeader;
        let style = 'none';
        if (this.showHeader) {
          style = 'block';
        }

        this.setHeaderStyle(style);
      },
      setHeaderStyle(this: any, style) {
        // #ifdef H5
        const header = document.querySelector('uni-page-head')
         || document.querySelector('.uni-page-head-wrap');
        if (header) {
          // @ts-ignore
          header.style.display = style;
        }
        // #endif
      },
    },
  };
}
