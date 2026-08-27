<template>
  <div
    v-if="info !== null && info !== '' || dot"
    :class="infoClass"
    :style="wrapStyle"
  >
    {{ dot ? '' : info }}
  </div>
</template>
<script>
import { style } from '../common/utils/style';
import utils from '../common/utils/utils';


export default {
  name: 'PressInfo',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    dot: {
      type: Boolean,
      default: false,
    },
    info: {
      type: [String, Number, null],
      default: '',
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
    infoClass() {
      const { dot, customClass } = this;
      return `press-info ${utils.bem2('info', { dot })} ${customClass}`;
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
