<template>
  <div
    :class="cellClass"
    hover-class="press-cell--hover hover-class"
    hover-stay-time="70"
    :style="customStyle"
    @click.stop="onClick"
  >
    <press-icon-plus
      v-if="icon"
      :name="icon"
      class="press-cell__left-icon-wrap"
      custom-class="press-cell__left-icon"
    />
    <slot
      v-else
      name="icon"
    />

    <!-- 【修改点】:empty在小程序下失效，用$slots判断 -->
    <!-- v-if="title || useTitleSlot || label || useLabelSlot" -->
    <div
      :style="cTitleStyle"
      class="press-cell__title"
      :class="titleClass"
    >
      <template v-if="title">
        {{ title }}
      </template>
      <!-- v-else-if="useTitleSlot" -->
      <slot
        v-else
        name="title"
      />

      <div
        v-if="label || useLabelSlot"
        class="press-cell__label"
        :class="labelClass"
      >
        <slot
          v-if="useLabelSlot"
          name="label"
        />
        <template v-else-if="label">
          {{ label }}
        </template>
      </div>
    </div>

    <div
      v-if="value || value === 0 || $slots.default"
      class="press-cell__value"
      :class="valueClass"
    >
      <template v-if="value || value === 0">
        {{ value }}
      </template>
      <slot v-else />
    </div>

    <press-icon-plus
      v-if="isLink"
      :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
      class="press-cell__right-icon-wrap"
      :custom-class="`press-cell__right-icon ${rightIconClass}`"
    />
    <slot
      v-else
      name="right-icon"
    />

    <slot name="extra" />
  </div>
</template>
<script>

import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { link } from '../mixins/link';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  components: {
    PressIconPlus,
  },
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  // classes: [
  //   'title-class',
  //   'label-class',
  //   'value-class',
  //   'right-icon-class',
  //   'hover-class',
  // ],
  mixins: [link],
  props: {
    titleClass: { type: String, default: '' },
    labelClass: { type: String, default: '' },
    valueClass: { type: String, default: '' },
    rightIconClass: { type: String, default: '' },
    hoverClass: { type: String, default: '' },

    title: { type: String, default: '' },
    value: { type: String, default: '' },
    icon: { type: String, default: '' },
    size: { type: String, default: '' },
    label: { type: String, default: '' },
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: { type: String, default: '' },
    customStyle: { type: String, default: '' },
    arrowDirection: { type: String, default: '' },
    useTitleSlot: Boolean, // 【修改点】新增，使用title-slot，必须同时设置为true
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    titleStyle: { type: String, default: '' },
    ...defaultProps,
  },
  computed: {
    cellClass() {
      const {
        size,
        center,
        required,
        border,
        isLink,
        clickable,
        customClass,
      } = this;
      return `${customClass} ${utils.bem2('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])}`;
    },
    cTitleStyle() {
      const {  titleWidth, titleStyle } = this;
      return computed.titleStyle({ titleWidth, titleStyle });
    },
  },
  mounted() {
  },
  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
  },
};

</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";
@import "../common/style/mixins/hairline.scss";

.press-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--cell-vertical-padding, $cell-vertical-padding)
    var(--cell-horizontal-padding, $cell-horizontal-padding);
  font-size: var(--cell-font-size, $cell-font-size);
  line-height: var(--cell-line-height, $cell-line-height);
  // 【修改点】增加height，默认为auto
  height: var(--cell-height, $cell-height);
  color: var(--cell-text-color, $cell-text-color);
  background-color: var(--cell-background-color, $cell-background-color);

  &::after {
    @include hairline-bottom($border-color, $padding-md, $padding-md);
  }

  &--borderless::after {
    display: none;
  }

  &-group {
    background-color: var(--cell-background-color, $cell-background-color);
  }

  &__label {
    margin-top: var(--cell-label-margin-top, $cell-label-margin-top);
    font-size: var(--cell-label-font-size, $cell-label-font-size);
    line-height: var(--cell-label-line-height, $cell-label-line-height);
    color: var(--cell-label-color, $cell-label-color);
  }

  &__value {
    overflow: hidden;
    text-align: right;
    vertical-align: middle;
    color: var(--cell-value-color, $cell-value-color);
    // 【修改点】增加value的font-size设置
    font-size: var(--cell-value-font-size, $cell-value-font-size);
  }

  &__title,
  &__value {
    flex: 1;
    // 【修改点】增加line-height，默认24px，否则h5下不会垂直居中
    line-height: var(--cell-line-height, $cell-line-height);

    &:empty {
      display: none;
    }
  }

  &__left-icon-wrap,
  &__right-icon-wrap {
    display: flex;
    align-items: center;
    height: var(--cell-line-height, $cell-line-height);
    font-size: var(--cell-icon-size, $cell-icon-size);
  }

  &__left-icon-wrap {
    margin-right: var(--padding-base, $padding-base);
  }

  &__right-icon-wrap {
    margin-left: var(--padding-base, $padding-base);
    color: var(--cell-right-icon-color, $cell-right-icon-color);
  }

  &__left-icon {
    vertical-align: middle;
    line-height: var(--cell-line-height, $cell-line-height);
  }

  &__right-icon {
    line-height: var(--cell-line-height, $cell-line-height);
  }

  // 【修改点】 &--clickable&--hover不能用
  &--clickable.press-cell--hover {
    background-color: var(--cell-active-color, $cell-active-color);
  }

  &--required {
    overflow: visible;

    &::before {
      position: absolute;
      content: "*";
      left: var(--padding-xs, $padding-xs);
      font-size: var(--cell-font-size, $cell-font-size);
      color: var(--cell-required-color, $cell-required-color);
    }
  }

  &--center {
    align-items: center;
  }

  &--large {
    padding-top: var(
      --cell-large-vertical-padding,
      $cell-large-vertical-padding
    );
    padding-bottom: var(
      --cell-large-vertical-padding,
      $cell-large-vertical-padding
    );

    .press-cell__title {
      font-size: var(--cell-large-title-font-size, $cell-large-title-font-size);
    }

    .press-cell__value {
      font-size: var(--cell-large-value-font-size, $cell-large-value-font-size);
    }

    .press-cell__label {
      font-size: var(--cell-large-label-font-size, $cell-large-label-font-size);
    }
  }
}
</style>
