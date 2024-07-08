<template>
  <div class="press-cell-group-index">
    <div
      v-if="title"
      :class="titleClass"
    >
      {{ title }}
    </div>
    <div :class="groupClass">
      <slot />
    </div>
  </div>
</template>
<script>
import utils from '../common/utils/utils';


export default {
  name: 'PressCellGroup',
  props: {
    title: { type: String, default: '' },
    border: {
      type: Boolean,
      default: true,
    },
    inset: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    titleClass() {
      const { inset } = this;
      return utils.bem2('cell-group__title', { inset });
    },
    groupClass() {
      const { inset, border, customClass } = this;
      return `${customClass} ${utils.bem2('cell-group', { inset })} ${border ? 'press-hairline--top-bottom' : ''}`;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
