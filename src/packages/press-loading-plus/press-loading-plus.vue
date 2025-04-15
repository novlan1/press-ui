<template>
  <div class="press-loading-index">
    <div
      :class="loadingClass"
      :style="customStyle"
    >
      <div
        :class="'press-loading__spinner press-loading__spinner--'+(type)"
        :style="spinnerStyle"
      >
        <template
          v-if="type === 'spinner'"
        >
          <div
            v-for="(item,index) in (array12)"
            :key="index"
            class="press-loading__dot"
          />
        </template>
      </div>

      <div
        class="press-loading__text"
        :style="textStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../common/utils/utils';
import computed from './index';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { TDESIGN_BRAND_COLOR } from './config';


export default {
  name: 'PressLoadingPlus',
  options: {
    ...defaultOptions,
  },
  props: {
    ...defaultProps,
    customStyle: { type: String, default: '' },
    color: { type: String, default: '' },
    vertical: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'circular',
    },
    size: { type: String, default: '' },
    textSize: { type: String, default: '' },
  },
  emits: [],
  data() {
    return {
      array12: Array.from({ length: 12 }),
    };
  },
  computed: {
    innerColor() {
      const { color, type } = this;
      if (type === 'circular-tdesign' && !color) {
        return TDESIGN_BRAND_COLOR;
      }
      return color;
    },
    loadingClass() {
      const { vertical, customClass, type } = this;
      return `${customClass} ${utils.bem2('loading', [type, { vertical }])}`;
    },
    spinnerStyle() {
      const { size, innerColor  } = this;
      return computed.spinnerStyle({ color: innerColor, size });
    },
    textStyle() {
      const { textSize } = this;
      return computed.textStyle({ textSize });
    },
  },
};

</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
