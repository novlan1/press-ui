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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-cell-group {
  &--inset {
    margin: var(--cell-group-inset-padding, $cell-group-inset-padding);
    border-radius: var(
      --cell-group-inset-border-radius,
      $cell-group-inset-border-radius
    );
    overflow: hidden;
  }

  &__title {
    padding: var(--cell-group-title-padding, $cell-group-title-padding);
    font-size: var(--cell-group-title-font-size, $cell-group-title-font-size);
    line-height: var(
      --cell-group-title-line-height,
      $cell-group-title-line-height
    );
    color: var(--cell-group-title-color, $cell-group-title-color);

    &--inset {
      padding: var(
        --cell-group-inset-title-padding,
        $cell-group-inset-title-padding
      );
    }
  }
}
</style>
