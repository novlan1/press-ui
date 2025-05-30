<template>
  <div
    class="press-section"
    :class="[
      {'press-section--active': active},
      {'press-section--clickable': clickable},
    ]"
    :style="wrapStyle"
  >
    <div
      class="press-section-header"
      :style="headerStyle"
      @click="onClick"
    >
      <div
        v-if="type"
        class="press-section-header__decoration"
        :class="[type, {
          ['press-section-header__decoration--active']: active
        }]"
      />
      <slot
        v-else
        name="decoration"
      />

      <div class="press-section-header__content">
        <span
          :style="{'font-size':titleFontSize,'color':titleColor}"
          class="press-section__content-title"
          :class="{'distraction':!subTitle}"
        >
          {{ title }}
        </span>
        <span
          v-if="subTitle"
          :style="{'font-size':subTitleFontSize,'color':subTitleColor}"
          class="press-section-header__content-sub"
        >
          {{ subTitle }}
        </span>
      </div>

      <div class="press-section-header__slot-right">
        <slot name="right" />
      </div>
    </div>

    <div
      class="press-section-content"
      :style="{padding: innerPadding}"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { style } from '../common/utils/style';


export default {
  name: 'PressSection',
  props: {
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    titleFontSize: {
      type: String,
      default: '14px',
    },
    titleColor: {
      type: String,
      default: '#333',
    },
    subTitle: {
      type: String,
      default: '',
    },
    subTitleFontSize: {
      type: String,
      default: '12px',
    },
    subTitleColor: {
      type: String,
      default: '#999',
    },
    padding: {
      type: [Boolean, String],
      default: false,
    },
    headerStyle: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: ['click'],
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
    innerPadding() {
      if (typeof this.padding === 'string') {
        return this.padding;
      }

      return this.padding ? '10px' : '';
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss" src="./css/index.scss">
</style>
