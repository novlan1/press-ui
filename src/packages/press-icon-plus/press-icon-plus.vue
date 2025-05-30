<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    @click="onClick"
  >
    <PressInfo
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
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import PressInfo from '../press-info/press-info.vue';

import computed from './index';


// #ifdef APP-NVUE
// nvue通过weex的dom模块引入字体，相关文档地址如下：
// https://weex.apache.org/zh/docs/modules/dom.html#addrule
const fontUrl = 'https://at.alicdn.com/t/font_2553510_5imfhdc20ag.ttf?t=1640074908811';
try {
  const domModule = weex.requireModule('dom');
  domModule.addRule('fontFace', {
    fontFamily: 'press-icon-plus',
    src: `url('${fontUrl}')`,
  });
} catch (err) {

}

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
    customStyle: { type: [String, Object], default: '' },
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

<style scoped lang="scss" src="./css/index.scss"></style>
