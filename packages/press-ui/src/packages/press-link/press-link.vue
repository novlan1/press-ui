<template>
  <span
    class="press-link"
    :style="linkStyle"
    @click.stop="openLink"
  >
    {{ text }}
  </span>
</template>

<script>
import props from './props.js';
import { addUnit, getPx } from '../common/utils/add-unit';
import { style as styleUtil } from '../common/utils/style';
import { nextTick } from '../common/utils/system';


export default {
  name: 'PressLink',
  mixins: [props],
  emits: [
    'click',
  ],
  computed: {
    linkStyle() {
      const style = {
        color: this.color,
        fontSize: addUnit(this.fontSize),
        // line-height 设置为比字体大小多 2px
        lineHeight: addUnit(getPx(this.fontSize) + 2),
        textDecoration: this.underline ? 'underline' : 'none',
      };
      return styleUtil([style, this.customStyle]);
    },
  },
  methods: {
    openLink() {
      // #ifdef APP-PLUS
      plus.runtime.openURL(this.href);
      // #endif

      // #ifdef H5
      window.open(this.href);
      // #endif

      // #ifdef MP
      uni.setClipboardData({
        data: this.href,
        success: () => {
          uni.hideToast();
          nextTick(() => {
            uni.showToast({
              title: this.mpTips,
              icon: 'none',
            });
          });
        },
      });
      // #endif
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
