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
    loadingClass() {
      const { vertical, customClass } = this;
      return `${customClass} ${utils.bem2('loading', { vertical })}`;
    },
    spinnerStyle() {
      const { color, size  } = this;
      return computed.spinnerStyle({ color, size });
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
