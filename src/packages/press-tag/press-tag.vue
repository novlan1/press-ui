<template>
  <div
    :class="tagClass"
    :style="tagStyle"
  >
    <slot />
    <PressIcon
      v-if="closeable"
      name="cross"
      custom-class="press-tag__close"
      class="press-tag__close-in-tag"
      @click="onClose"
    />
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';

import PressIcon from '../press-icon/press-icon.vue';

import computed from './computed';


export default {
  name: 'PressTag',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
  },
  props: {
    size: { type: String, default: '' },
    mark: Boolean,
    color: { type: String, default: '' },
    plain: Boolean,
    round: Boolean,
    textColor: { type: String, default: '' },
    type: {
      type: String,
      default: 'default',
    },
    closeable: Boolean,
    ...defaultProps,
  },
  computed: {
    tagClass() {
      const { type, size, mark, plain, round, customClass } = this;
      return `${customClass} ${utils.bem2('tag', [type, size, { mark, plain, round }])}`;
    },
    tagStyle() {
      const { plain, color, textColor } = this;
      return computed.rootStyle({ plain, color, textColor });
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
