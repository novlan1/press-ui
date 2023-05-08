<template>
  <uni-shadow-root :class="'' + bem3('tab__pane-wrapper')">
    <div
      :class="tabClass"
      :style="shouldShow ? '' : 'display: none;'"
    >
      <slot v-if="shouldRender" />
    </div>
  </uni-shadow-root>
</template>
<script>
import utils from '../common/utils/utils';

import { ChildrenMixin } from '../mixins/relation';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_TABS as PARENT } from '../common/constant/parent-map';


export default {
  mixins: [
    ChildrenMixin(PARENT),
  ],
  options: {
    ...defaultOptions,
  },
  props: {
    ...defaultProps,
    dot: {
      type: Boolean,
      default: false,
    },
    info: {
      type: [String, Number, null],
      default: '',
    },
    title: {
      type: [String, Number, null],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    titleStyle: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number, null],
      default: '',
    },
    extraClassPrefix: {
      type: String,
      // 兼容旧的class，可传入van-
      default: '',
    },
  },
  data() {
    return {
      active: false,
      shouldShow: false,
      shouldRender: false,
      initialled: false,

      utils,
    };
  },
  computed: {
    tabClass() {
      const { active, customClass = '' } = this;
      return `${this.bem3('tab__pane', { active, inactive: !active })} ${customClass}`;
    },
  },
  watch: {
    dot: {
      handler() {
        this.update();
      },
    },
    info: {
      handler() {
        this.update();
      },
    },
    title: {
      handler() {
        this.update();
      },
    },
    disabled: {
      handler() {
        this.update();
      },
    },
    titleStyle: {
      handler() {
        this.update();
      },
    },
  },
  created() {
  },
  mounted() {
    this.update();
  },
  methods: {
    bem3(name, conf) {
      return utils.bem3(name, conf, this.extraClassPrefix);
    },
    getComputedName() {
      if (this.name !== '') {
        return this.name;
      }
      return this.index;
    },
    updateRender(active, parent) {
      this.initialled = this.initialled || active;
      this.active = active;
      this.shouldRender = this.initialled || !parent.lazyRender;
      this.shouldShow = active || parent.animated;
    },
    update() {
      if (this[PARENT]) {
        this[PARENT].updateTabs();
      }
    },
    destroyCallback() {
      this[PARENT].updateTabs();
      this.$nextTick(() => {
        this[PARENT].resize();
      });
    },
  },
};
</script>
<style lang="scss">
@import "../common/style/index.scss";
.press-tab__pane-wrapper {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
}

.press-tab__pane {
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &--active {
    height: auto;
  }

  &--inactive {
    height: 0;
    overflow: visible;
  }
}
</style>
