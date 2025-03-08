<template>
  <div
    :class="tagClass"
    :style="tagStyle"
  >
    <slot />
    <PressIconPlus
      v-if="closeable"
      name="cross"
      custom-class="press-tag__close"
      @click="onClose"
    />
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressTag',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
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
