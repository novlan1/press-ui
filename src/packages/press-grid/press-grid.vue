<template>
  <div
    :class="`press-grid ${customClass} `+(border && !gutter ? 'press-hairline--top' : '')"
    :style="true ? computed.rootStyle({ gutter }) : ''"
  >
    <slot />
  </div>
</template>
<script>
import computed from './computed';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ParentMixin } from '../mixins/relation';
import { PARENT_GRID as PARENT } from '../common/constant/parent-map';


export default {
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
    ...defaultProps,
  },
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
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
.press-grid {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
</style>
