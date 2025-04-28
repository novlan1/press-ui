<template>
  <div
    :class="`press-grid ${customClass} `+(border && !gutter ? 'press-hairline--top' : '')"
    :style="true ? computed.rootStyle({ customStyle, gutter }) : ''"
  >
    <slot />
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_GRID as PARENT } from '../common/constant/parent-map';
import { ParentMixin } from '../mixins/relation';

import computed from './computed';


export default {
  name: 'PressGrid',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    square: {
      type: Boolean,
    },
    gutter: {
      type: [Number, null],
      default: 0,
    },
    clickable: {
      type: Boolean,
    },
    columnNum: {
      type: Number,
      default: 4,
    },
    center: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: '',
    },
    iconSize: {
      type: String,
      default: '',
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      computed,
    };
  },
  watch: {
    square: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    gutter: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    clickable: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    columnNum: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    center: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    border: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    direction: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    iconSize: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    reverse: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
  },
  created() {
    this.children = [];
  },
  methods: {
    updateChildren() {
      if (!this.children) return;
      this.children.forEach((child) => {
        child.updateStyle();
      });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
