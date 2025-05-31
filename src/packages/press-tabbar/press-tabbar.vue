<template>
  <div>
    <div
      :class="[
        border ? 'press-hairline--top-bottom' : '',
        utils.bem2('tabbar', { fixed, safe: safeAreaInsetBottom }),
        customClass
      ]"
      :style="zIndex ? 'z-index: ' + zIndex : ''"
    >
      <slot />
    </div>

    <div
      v-if="fixed && placeholder"
      :style="'height: '+(height)+'px;'"
    />
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_TABBAR  as PARENT } from '../common/constant/parent-map';
import { getRect } from '../common/dom/rect';

import { nextTick } from '../common/utils/system';
import utils from '../common/utils/utils';

import { ParentMixin } from '../mixins/basic/relation';


export default {
  name: 'PressTabbar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    active: {
      type: [String, Number],
      default: '',
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
      type: String,
      default: '',
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: Boolean,
    },
    border: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
  },
  emits: ['change'],
  data() {
    return {
      height: 50,
      utils,
    };
  },
  watch: {
    active: {
      handler() {
        this.updateChildren();
      },
    },
    activeColor: {
      handler() {
        this.updateChildren();
      },
    },
    inactiveColor: {
      handler() {
        this.updateChildren();
      },
    },
    fixed: {
      handler() {
        this.setHeight();
      },
    },
    placeholder: {
      handler() {
        this.setHeight();
      },
    },
  },
  created() {
    this.children = [];
  },
  methods: {
    updateChildren() {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return;
      }
      children.forEach(child => child.updateFromParent());
    },
    setHeight() {
      if (!this.fixed || !this.placeholder) {
        return;
      }
      nextTick(() => {
        getRect(this, '.press-tabbar').then((res) => {
          this.height = res.height;
        });
      });
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
