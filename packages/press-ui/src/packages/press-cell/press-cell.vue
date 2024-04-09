<template>
  <div
    :class="cellClass"
    :hover-class="['press-cell--hover', hoverClass]"
    hover-stay-time="70"
    :style="customStyle"
    @click.stop="onClick"
  >
    <PressIconPlus
      v-if="icon"
      :name="icon"
      :class="[leftIconBaseClass]"
      :custom-class="leftIconCustomClass"
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
      class="press-cell__value"
      :class="valueClass"
    >
      <template v-if="value || value === 0">
        {{ value }}
      </template>
      <slot v-else />
    </div>

    <PressIconPlus
      v-if="isLink"
      :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
      :class="[rightIconBaseClass]"
      :custom-class="rightIconCustomClass"
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
import { getEventDetail } from '../common/dom/event';


export default {
  name: 'PressCell',
  components: {
    PressIconPlus,
  },
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
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
    type: {
      type: String,
      default: '',
    },
    titleStyle: { type: String, default: '' },
    ...defaultProps,
  },
  emits: ['click'],
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
        type,
      } = this;
      return `${customClass} ${utils.bem2('cell', [
        size,
        {
          center,
          required,
          borderless: !border,
          clickable: isLink || clickable,
          'e-sport': type === 'e-sport',
        },
      ])}`;
    },
    cTitleStyle() {
      const {  titleWidth, titleStyle } = this;
      return computed.titleStyle({ titleWidth, titleStyle });
    },
    leftIconBaseClass() {
      return 'press-cell__left-icon';
    },
    leftIconCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.leftIconBaseClass}`;
      // #endif
      return result;
    },
    rightIconBaseClass() {
      return 'press-cell__right-icon';
    },
    rightIconCustomClass() {
      let result = this.rightIconClass;
      // #ifdef MP-ALIPAY
      result = `${result} ${this.rightIconBaseClass}`;
      // #endif
      return result;
    },
  },
  mounted() {
  },
  methods: {
    onClick(event) {
      this.$emit('click', getEventDetail(event));
      this.jumpLink();
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";
@import "../common/style/press/mixins/hairline.scss";

.press-cell--e-sport {
  --cell-background-color: rgba(255, 255, 255, 0.85);
  --cell-active-color: #f5f6fa;
  --cell-height: 1.12rem;
  --cell-line-height: unset;

  --cell-vertical-padding: 0.32rem;
  --cell-horizontal-padding: 0.32rem;

  --cell-text-color: #09134e;
  --cell-font-size: 0.32rem;

  --cell-value-font-size: 0.28rem;
  --cell-value-color: #9299c6;

  --cell-label-font-size: 0.2rem;
  --cell-label-color: #9299c6;
  --cell-label-margin-top: 0;

  --cell-icon-size: 0.24rem;
  --cell-right-icon-color: #9299c6;
}
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

  /* #ifdef MP-ALIPAY */
  ::v-deep .press-cell__left-icon,
  ::v-deep .press-cell__right-icon,
  /* #endif */
  &__left-icon,
  &__right-icon {
    display: flex;
    align-items: center;
    height: var(--cell-line-height, $cell-line-height);
    font-size: var(--cell-icon-size, $cell-icon-size);
  }

  /* #ifdef MP-ALIPAY */
  ::v-deep .press-cell__left-icon,
  /* #endif */
  &__left-icon {
    margin-right: var(--padding-base, $padding-base);
    vertical-align: middle;
    line-height: var(--cell-line-height, $cell-line-height);
  }

  /* #ifdef MP-ALIPAY */
  ::v-deep .press-cell__right-icon,
  /* #endif */
  &__right-icon {
    margin-left: var(--padding-base, $padding-base);
    color: var(--cell-right-icon-color, $cell-right-icon-color);
    line-height: var(--cell-line-height, $cell-line-height);
  }

  // 【修改点】 &--clickable&--hover不能用
  &--clickable.press-cell--hover,
  &--clickable:active {
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
