<template>
  <div class="press-tabbar-item-index">
    <div
      :class="'' + (utils.bem2('tabbar-item', { active }))+' custom-class'"
      :style="'color: '+(active ? activeColor : inactiveColor)"
      @click="onClick"
    >
      <div class="press-tabbar-item__icon">
        <press-icon-plus
          v-if="icon"
          :name="icon"
          :class-prefix="iconPrefix"
          custom-class="press-tabbar-item__icon__inner"
        />
        <template v-else>
          <slot
            v-if="active"
            name="icon-active"
          />
          <slot
            v-else
            name="icon"
          />
        </template>
        <press-info
          :dot="dot"
          :info="info"
          custom-class="press-tabbar-item__info"
        />
      </div>
      <div class="press-tabbar-item__text">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressInfo from '../press-info/press-info.vue';
import utils from '../common/utils/utils';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_TABBAR  as PARENT } from '../common/constant/parent-map';


export default {
  name: 'PressTabbarItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressInfo,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  props: {
    info: { type: [String, Number], default: '' },
    name: { type: [String, Number], default: '' },
    icon: { type: String, default: '' },
    dot: Boolean,
    iconPrefix: {
      type: String,
      default: 'press-icon-plus',
    },
    ...defaultProps,
  },
  data() {
    return {
      utils,
      active: false,
      activeColor: '',
      inactiveColor: '',
    };
  },
  mounted() {
    this.updateFromParent();
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((item) => {
        this[item] = data[item];
      });
    },
    onClick() {
      const parent = this[PARENT];
      if (parent) {
        const index = parent.children.indexOf(this);
        const active = this.name || index;
        if (active !== this.active) {
          parent.$emit('change', active);
        }
      }
      this.$emit('click');
    },
    updateFromParent() {
      const parent = this[PARENT];
      if (!parent) {
        return;
      }
      const index = parent.children.indexOf(this);
      const parentData = parent;
      const active = (this.name || index) === parentData.active;
      const patch = {};
      if (active !== this.active) {
        patch.active = active;
      }
      if (parentData.activeColor !== this.activeColor) {
        patch.activeColor = parentData.activeColor;
      }
      if (parentData.inactiveColor !== this.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }
      if (Object.keys(patch).length > 0) {
        this.setData(patch);
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-tabbar-item-index {
  flex: 1;
  height: 100%;
}

.press-tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--tabbar-item-text-color, $tabbar-item-text-color);
  font-size: var(--tabbar-item-font-size, $tabbar-item-font-size);
  line-height: var(--tabbar-item-line-height, $tabbar-item-line-height);

  &__icon {
    position: relative;
    margin-bottom: var(--tabbar-item-margin-bottom, $tabbar-item-margin-bottom);
    font-size: var(--tabbar-item-icon-size, $tabbar-item-icon-size);

    &__inner {
      display: block;
      min-width: 1em;
    }
  }

  &--active {
    color: var(--tabbar-item-active-color, $tabbar-item-active-color);
  }

  &__info {
    margin-top: 2px;
  }
}
</style>
