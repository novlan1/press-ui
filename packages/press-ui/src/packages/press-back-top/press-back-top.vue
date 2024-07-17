<template>
  <PressTransition
    mode="fade"
    :custom-style="backTopStyle"
    :show="show"
  >
    <view
      v-if="!$slots.default && !$slots.$default"
      class="press-back-top"
      :style="contentStyle"
      @click="backToTop"
    >
      <PressIconPlus
        :name="icon"
        :custom-style="innerIconStyle"
      />
      <text
        v-if="text"
        class="press-back-top__text"
      >
        {{ text }}
      </text>
    </view>
    <slot v-else />
  </PressTransition>
</template>

<script>
import props from './props.js';
import { addUnit, getPx } from '../common/utils/add-unit';
import { style as styleUtil } from '../common/utils/style';
import { errorTip } from '../common/utils/validator';

import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressTransition from '../press-transition/press-transition.vue';


// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif


export default {
  name: 'PressBackTop',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressTransition,
  },
  mixins: [props],
  emits: [
    'click',
  ],
  computed: {
    backTopStyle() {
      // 动画组件样式
      const style = {
        bottom: addUnit(this.bottom),
        right: addUnit(this.right),
        width: addUnit(this.size),
        height: addUnit(this.size),
        position: 'fixed',
        zIndex: this.zIndex,
      };
      return styleUtil(style);
    },
    show() {
      return getPx(this.scrollTop) > getPx(this.top);
    },
    innerIconStyle() {
      return styleUtil([{
        color: '#909399',
        fontSize: '19px',
      }, this.iconStyle]);
    },
    contentStyle() {
      const style = {};
      let radius = 0;
      // 是否圆形
      if (this.mode === 'circle') {
        radius = '100px';
      } else {
        radius = '4px';
      }
      // 为了兼容安卓nvue，只能这么分开写
      style.borderTopLeftRadius = radius;
      style.borderTopRightRadius = radius;
      style.borderBottomLeftRadius = radius;
      style.borderBottomRightRadius = radius;
      return styleUtil([style, this.customStyle]);
    },
  },
  methods: {
    backToTop() {
      // #ifdef APP-NVUE
      if (!this.$parent.$refs['press-back-top']) {
        errorTip('nvue 页面需要给页面最外层元素设置"ref=\'press-back-top\'');
      }
      dom.scrollToElement(this.$parent.$refs['press-back-top'], {
        offset: 0,
      });
      // #endif

      // #ifndef APP-NVUE
      if (typeof this.scrollToTop === 'function') {
        this.scrollToTop();
      } else {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: this.duration,
        });
      }

      // #endif
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
