<template>
  <view
    class="press-row"
    :class="customClass"
    :style="true ? computed.rootStyle({ gutter }) : ''"
  >
    <slot />
  </view>
</template>
<script>
import computed from './computed';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ParentMixin } from '../mixins/relation';
import { PARENT_ROW as PARENT } from '../common/constant/parent-map';


export default {
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
<style platform="mp-weixin" lang="scss">
.press-row {
  &::after {
    display: table;
    clear: both;
    content: "";
  }
}
</style>
