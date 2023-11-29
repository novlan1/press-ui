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
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

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
    customStyle: { type: String, default: '' },
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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-divider {
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 0;
  margin: var(--divider-margin, $divider-margin);
  color: var(--divider-text-color, $divider-text-color);
  font-size: var(--divider-font-size, $divider-font-size);
  line-height: var(--divider-line-height, $divider-line-height);
  border-color: var(--divider-border-color, $divider-border-color);

  &::before,
  &::after {
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: 1px 0 0;
  }

  &::before {
    content: "";
  }

  &--hairline {
    &::before,
    &::after {
      transform: scaleY(0.5);
    }
  }

  &--dashed {
    border-style: dashed;
  }

  &--center,
  &--left,
  &--right {
    &::before {
      margin-right: var(--divider-content-padding, $divider-content-padding);
    }

    &::after {
      content: "";
      margin-left: var(--divider-content-padding, $divider-content-padding);
    }
  }

  &--left {
    &::before {
      max-width: var(--divider-content-left-width, $divider-content-left-width);
    }
  }

  &--right {
    &::after {
      max-width: var(
        --divider-content-right-width,
        $divider-content-right-width
      );
    }
  }
}
</style>
