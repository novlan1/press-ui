<template>
  <div class="press-tabbar-item-index">
    <div
      :class="[
        utils.bem2('tabbar-item', { active }),
        customClass
      ]"
      :style="'color: '+(active ? activeColor : inactiveColor)"
      @click="onClick"
    >
      <div class="press-tabbar-item__icon">
        <PressIcon
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
        <PressInfo
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
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { PARENT_TABBAR  as PARENT } from '../common/constant/parent-map';
import utils from '../common/utils/utils';

import { ChildrenMixin } from '../mixins/basic/relation';

import PressIcon from '../press-icon/press-icon.vue';
import PressInfo from '../press-info/press-info.vue';


export default {
  name: 'PressTabbarItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
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
      default: 'press-icon',
    },
    ...defaultProps,
  },
  emits: ['click'],
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
<style scoped lang="scss" src="./css/index.scss">
</style>
