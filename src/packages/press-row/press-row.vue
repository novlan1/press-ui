<template>
  <div
    class="press-row"
    :class="customClass"
    :style="true ? computed.rootStyle({ gutter }) : ''"
  >
    <slot />
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_ROW as PARENT } from '../common/constant/parent-map';
import { ParentMixin } from '../mixins/relation';

import computed from './computed';


export default {
  name: 'PressRow',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    gutter: {
      type: Number,
      default: 0,
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
    gutter: {
      handler() {
        this.setGutter();
      },
      immediate: true,
    },
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.setGutter();
  },
  methods: {
    setGutter() {
      if (this.children) {
        this.children.forEach((col) => {
          col.gutter = this.gutter;
        });
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
