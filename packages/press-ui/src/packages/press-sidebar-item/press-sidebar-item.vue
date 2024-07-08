<template>
  <div class="press-sidebar-item-index">
    <div
      :class="sidebarItemClass"
      hover-class="press-sidebar-item--hover"
      hover-stay-time="70"
      @click="onClick"
    >
      <div class="press-sidebar-item__text">
        <press-info
          v-if="badge != null || info !== null || dot"
          :dot="dot"
          :info="badge != null ? badge : info"
        />
        <div v-if="title">
          {{ title }}
        </div>
        <slot
          v-else
          name="title"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PressInfo from '../press-info/press-info.vue';
import utils from '../common/utils/utils';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_SIDEBAR as PARENT } from '../common/constant/parent-map';


export default {
  name: 'PressSidebarItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressInfo,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  props: {
    dot: Boolean,
    badge: { type: [String, Number], default: '' },
    info: { type: [String, Number], default: '' },
    title: { type: String, default: '' },
    disabled: Boolean,
    ...defaultProps,
    activeClass: { type: String, default: '' },
    disabledClass: { type: String, default: '' },
  },
  emits: ['click', 'change'],
  data() {
    return {
      utils,

      selected: false,
    };
  },
  computed: {
    sidebarItemClass() {
      const {
        selected,
        disabled,
        customClass,
        activeClass,
        disabledClass,
      } = this;
      return `${utils.bem2('sidebar-item', { selected, disabled })} ${selected ? activeClass : ''} ${disabled ? disabledClass : ''} ${customClass}`;
    },
  },
  mounted() {

  },
  methods: {
    onClick() {
      const parent = this[PARENT];
      if (!parent || this.disabled) {
        return;
      }
      const index = parent.children.indexOf(this);
      parent.setActive(index).then(() => {
        this.$emit('click', index);
        parent.$emit('change', index);
      });
    },
    setActive(selected) {
      this.selected = selected;
    },
  },
};
</script>

<style scoped lang="scss" src="./css/index.scss">
</style>
