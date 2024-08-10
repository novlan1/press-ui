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
<style scoped lang="scss" src="./css/index.scss">
</style>
<style scoped lang="scss" src="./css/h5.scss">
</style>
