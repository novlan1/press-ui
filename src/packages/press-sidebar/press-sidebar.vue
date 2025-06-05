<template>
  <div class="press-sidebar-index">
    <div
      class="press-sidebar"
      :class="customClass"
      :style="sidebarStyle"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_SIDEBAR as PARENT } from '../common/constant/parent-map';
import { style } from '../common/utils/style';
import { ParentMixin } from '../mixins/basic/relation';


export default {
  name: 'PressSidebar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    activeKey: {
      type: Number,
      default: 0,
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
    ...defaultProps,
  },
  computed: {
    sidebarStyle() {
      return style(this.customStyle);
    },
  },
  watch: {
    activeKey: {
      handler(val) {
        this.setActive(val);
      },
    },
  },
  beforeCreate() {
    this.currentActive = -1;
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.setActive(this.activeKey);
  },
  methods: {
    setActive(activeKey) {
      const { children, currentActive } = this;
      if (!children.length) {
        return Promise.resolve();
      }
      this.currentActive = activeKey;
      const stack = [];
      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }
      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }
      return Promise.all(stack);
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
