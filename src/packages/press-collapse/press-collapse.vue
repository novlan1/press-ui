<template>
  <div :class="customClass + ' press-collapse ' + (border ? 'press-hairline--top-bottom' : '')">
    <slot />
  </div>
</template>

<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_COLLAPSE as PARENT } from '../common/constant/parent-map';
import { ParentMixin } from '../mixins/basic/relation';


export default {
  name: 'PressCollapse',
  options: {
    ...defaultOptions,
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    value: {
      type: [Array, String],
      default: () => [],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 240,
    },
    ...defaultProps,
  },
  watch: {
    value: {
      handler() {
        this.updateExpanded();
      },
    },
    accordion: {
      handler() {
        this.updateExpanded();
      },
    },
  },
  created() {
    this.children = [];
  },
  methods: {
    updateExpanded() {
      this.children.forEach((child) => {
        child.updateExpanded();
      });
    },
    switch(name, expanded) {
      const { accordion, value } = this;
      const changeItem = name;
      if (!accordion) {
        name = expanded
          ? (value || []).concat(name)
          : (value || []).filter(activeName => activeName !== name);
      } else {
        name = expanded ? name : '';
      }
      if (expanded) {
        this.$emit('open', changeItem);
      } else {
        this.$emit('close', changeItem);
      }
      this.$emit('change', name);
      this.$emit('input', name);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
