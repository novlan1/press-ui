<template>
  <div
    v-if="info !== null && info !== '' || dot"
    :class="infoClass"
    :style="customStyle"
  >
    {{ dot ? '' : info }}
  </div>
</template>
<script>
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
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    infoClass() {
      const { dot, customClass } = this;
      return `press-info ${utils.bem2('info', { dot })} ${customClass}`;
    },
  },
};
</script>
<style lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";
@import "../press-badge/common.scss";

.press-info {
  position: absolute;
  top: 0;
  right: 0;

  transform: translate(50%, -50%);
  transform-origin: 100%;

  @include pressBadgeInfo();

  &--dot {
    @include pressBadgeInfoDot();
  }
}
</style>
