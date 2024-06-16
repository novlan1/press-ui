import PressNotifyHandler from '../../press-notify';
import { setClipboardData } from '../../common/clipboard/clipboard';


export const CLIPBOARD_MIXIN = {
  data() {
    let offsetTop = 0;

    // #ifdef H5
    offsetTop = 44;
    // #endif

    return {
      offsetTop,
    };
  },
  methods: {
    copyIconTag(tag) {
      const that = this;

      setClipboardData(tag).then(() => {
        PressNotifyHandler({
          type: 'success',
          duration: 1500,
          message: `${that.t('copied')}：${tag}`,
          top: that.offsetTop,
        });
      });
    },
  },
};
