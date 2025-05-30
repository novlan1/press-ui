<template>
  <div class="press-divider-index">
    <div
      :class="dividerClass"
      :style="dividerStyle"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';

import computed from './computed';


export default {
  name: 'PressDivider',
  options: {
    ...defaultOptions,
  },
  props: {
    dashed: Boolean,
    hairline: Boolean,
    contentPosition: { type: String, default: '' },
    fontSize: { type: String, default: '' },
    borderColor: { type: String, default: '' },
    textColor: { type: String, default: '' },
    customStyle: { type: [String, Object], default: '' },
    ...defaultProps,
  },
  computed: {
    dividerClass() {
      const { dashed, hairline, contentPosition, customClass } = this;
      return `${customClass} ${utils.bem2('divider', [{ dashed, hairline }, contentPosition])}`;
    },
    dividerStyle() {
      const { borderColor, textColor, fontSize, customStyle } = this;
      return computed.rootStyle({ borderColor, textColor, fontSize, customStyle });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
