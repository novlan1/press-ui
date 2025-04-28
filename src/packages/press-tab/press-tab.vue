<template>
  <div :class="[bem3('tab__pane-wrapper')]">
    <div
      :class="tabClass"
      :style="shouldShow ? '' : 'display: none;'"
    >
      <slot v-if="shouldRender" />
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_TABS as PARENT } from '../common/constant/parent-map';
import { requestAnimationFrame, nextTick } from '../common/utils/system';

import utils from '../common/utils/utils';
import { ChildrenMixin } from '../mixins/relation';


export default {
  name: 'PressTab',
  mixins: [
    ChildrenMixin(PARENT),
  ],
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
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
    sortIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: [],
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
        requestAnimationFrame(() => {
          this[PARENT].resize();
        });
      }
    },
    destroyCallback() {
      this[PARENT].updateTabs();
      nextTick(() => {
        this[PARENT].resize();
      });
    },
  },
};
</script>
<style lang="scss" src="./css/index.scss">
</style>
