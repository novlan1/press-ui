<template>
  <PressTransition
    mode="fade"
    :custom-style="backTopStyle"
    :show="show"
  >
    <div
      v-if="!$slots.default && !$slots.$default"
      class="press-back-top"
      :style="contentStyle"
      @click="backToTop"
    >
      <PressIcon
        :name="icon"
        :custom-style="innerIconStyle"
      />
      <span
        v-if="text"
        class="press-back-top__text"
      >
        {{ text }}
      </span>
    </div>
    <slot v-else />
  </PressTransition>
</template>

<script>
import { addUnit, getPx } from '../common/utils/add-unit';
import { style } from '../common/utils/style';
import { errorTip } from '../common/utils/validator';

import PressIcon from '../press-icon/press-icon.vue';
import PressTransition from '../press-transition/press-transition.vue';

import props from './props.js';


// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif


export default {
  name: 'PressBackTop',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
    PressTransition,
  },
  mixins: [props],
  emits: [
    'click',
  ],
  computed: {
    backTopStyle() {
      // 动画组件样式
      const result = {
        bottom: addUnit(this.bottom),
        right: addUnit(this.right),
        width: addUnit(this.size),
        height: addUnit(this.size),
        position: 'fixed',
        zIndex: this.zIndex,
      };
      return style(result);
    },
    show() {
      return getPx(this.scrollTop) > getPx(this.top);
    },
    innerIconStyle() {
      return style([{
        color: '#909399',
        fontSize: '19px',
      }, this.iconStyle]);
    },
    contentStyle() {
      const result = {};
      let radius = 0;
      // 是否圆形
      if (this.mode === 'circle') {
        radius = '100px';
      } else {
        radius = '4px';
      }
      // 为了兼容安卓nvue，只能这么分开写
      result.borderTopLeftRadius = radius;
      result.borderTopRightRadius = radius;
      result.borderBottomLeftRadius = radius;
      result.borderBottomRightRadius = radius;
      return style([result, this.customStyle]);
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
