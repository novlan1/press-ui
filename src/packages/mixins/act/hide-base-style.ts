import { hyphenate } from '../../common/format/string';

export function getHideBaseStyleMixin() {
  return {
    props: {
      hideBaseStyle: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      hideBaseStyle: {
        handler(value: boolean) {
          // @ts-ignore
          const { name } = this.$options;
          if (!name) return;

          const tClass = `${hyphenate(name)}--hidden`;

          // #ifdef H5
          if (value) {
            document.body.classList.add(tClass);
          } else {
            document.body.classList.remove(tClass);
          }
          // #endif
        },
        immediate: true,
      },
    },
  };
}
