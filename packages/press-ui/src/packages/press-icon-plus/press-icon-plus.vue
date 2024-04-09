<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    @click="onClick"
  >
    <press-info
      v-if="info !== null || dot"
      :dot="dot"
      :info="info"
      custom-class="press-icon-plus__info"
    />
    <img
      v-if="isImage"
      :src="name"
      mode="aspectFit"
      class="press-icon-plus__image"
    >
  </div>
</template>
<script>
import computed from './index';
import PressInfo from '../press-info/press-info.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


// #ifdef APP-NVUE
// nvue通过weex的dom模块引入字体，相关文档地址如下：
// https://weex.apache.org/zh/docs/modules/dom.html#addrule
const fontUrl = 'https://at.alicdn.com/t/font_2553510_5imfhdc20ag.ttf?t=1640074908811';
const domModule = weex.requireModule('dom');
domModule.addRule('fontFace', {
  fontFamily: 'press-icon-plus',
  src: `url('${fontUrl}')`,
});
// #endif


export default {
  name: 'PressIconPlus',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressInfo,
  },
  props: {
    dot: Boolean,
    info: { type: String, default: '' },
    size: { type: [String, Number], default: '' },
    color: { type: String, default: '' },
    customStyle: { type: String, default: '' },
    classPrefix: {
      type: String,
      default: 'press-icon-plus',
    },
    name: { type: String, default: '' },
    ...defaultProps,
  },

  emits: ['click'],
  data() {
    return {

    };
  },
  computed: {
    rootClass() {
      const { classPrefix, name, customClass } = this;
      return computed.rootClass({ classPrefix, name, customClass });
    },
    rootStyle() {
      const { customStyle, color, size } = this;
      return computed.rootStyle({ customStyle, color, size });
    },
    isImage() {
      const { name } = this;
      return computed.isImage(name);
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../common/style/press/index.scss";

.press-icon-plus,
.press-icon-plus:before {
  display: inline-block;
}

.press-icon-plus {
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font: normal normal normal 14px/1 press-icon-plus;
  font-size: inherit;
  position: relative;

  // 【修改点】增加垂直水平居中
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

/* #ifndef APP-NVUE */
@font-face {
  font-display: auto;
  font-family: "press-icon-plus";
  font-style: normal;
  font-weight: 400;
  src: url("https://at.alicdn.com/t/font_2553510_5imfhdc20ag.woff2?t=1640074908811")
      format("woff2"),
    url("https://at.alicdn.com/t/font_2553510_5imfhdc20ag.woff?t=1640074908811")
      format("woff"),
    url("https://at.alicdn.com/t/font_2553510_5imfhdc20ag.ttf?t=1640074908811")
      format("truetype");
}
/* #endif */

.press-icon-plus {
  &--image {
    width: 1em;
    height: 1em;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__info {
    z-index: 1;
  }
}
</style>
<style scoped src="./icon.css">
</style>
