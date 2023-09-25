<template>
  <div>
    <div
      :class="(border ? 'press-hairline--top-bottom' : '')+
        ' '+(utils.bem2('tabbar', { fixed, safe: safeAreaInsetBottom }))+' custom-class'"
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
import utils from '../common/utils/utils';
import { getRect } from '../common/dom/rect';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ParentMixin } from '../mixins/relation';
import { PARENT_TABBAR  as PARENT } from '../common/constant/parent-map';


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
      this.$nextTick(() => {
        getRect(this, '.press-tabbar').then((res) => {
          this.height = res.height;
        });
      });
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-tabbar {
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: var(--tabbar-height, $tabbar-height);
  background-color: var(--tabbar-background-color, $tabbar-background-color);

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  &--safe {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  ::v-deep press-tabbar-item {
    flex: 1;
  }
}
</style>
