<template>
  <div
    class="press-tree-select"
    :style="'height: '+(utils.addUnit(height))"
  >
    <scroll-view
      scroll-y
      class="press-tree-select__nav"
    >
      <PressSidebar
        :active-key="mainActiveIndex"
        custom-class="press-tree-select__nav__inner"
        @change="onClickNav"
      >
        <PressSidebarItem
          v-for="(item, index) in (items)"
          :key="index"
          :custom-class="mainItemClass"
          :active-class="mainActiveClass"
          :disabled-class="mainDisabledClass"
          :badge="item.badge"
          :dot="item.dot"
          :title="item.text"
          :disabled="item.disabled"
        />
      </PressSidebar>
    </scroll-view>
    <scroll-view
      scroll-y
      class="press-tree-select__content"
    >
      <slot name="content" />
      <div
        v-for="(item) in (subItems)"
        :key="item.id"
        :class="[treeSelectItemClass(item)]"
        @click="onSelectItem(item)"
      >
        {{ item.text }}
        <PressIcon
          v-if="isActive(activeId, item.id)"
          :name="selectedIcon"
          size="16px"
          :class="[selectedIconClass]"
          :custom-class="selectedIconCustomClass"
        />
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';
import PressIcon from '../press-icon/press-icon.vue';
import PressSidebarItem from '../press-sidebar-item/press-sidebar-item.vue';
import PressSidebar from '../press-sidebar/press-sidebar.vue';


import { isActive } from './computed';


export default {
  name: 'PressTreeSelect',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
    PressSidebar,
    PressSidebarItem,
  },
  mixins: [ScrollViewPureMixin],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    activeId: {
      type: [Number, String, Array],
      default: '',
    },
    mainActiveIndex: {
      type: [Number, String, Array],
      default: 0,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
    max: {
      type: [Number, String],
      default: Infinity,
    },
    selectedIcon: {
      type: String,
      default: 'success',
    },
    mainItemClass: {
      type: String,
      default: '',
    },
    mainActiveClass: {
      type: String,
      default: '',
    },
    mainDisabledClass: {
      type: String,
      default: '',
    },
    contentItemClass: {
      type: String,
      default: '',
    },
    contentActiveClass: {
      type: String,
      default: '',
    },
    contentDisabledClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: ['click-item', 'click-nav'],
  data() {
    return {
      subItems: [],

      utils,
      isActive,
    };
  },
  computed: {
    selectedIconClass() {
      return 'press-tree-select__selected';
    },
    selectedIconCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.selectedIconClass}`;
      // #endif
      return result;
    },
  },
  watch: {
    items: {
      handler() {
        this.updateSubItems();
      },
    },
    mainActiveIndex: {
      handler() {
        this.updateSubItems();
      },
    },
  },
  mounted() {
    this.updateSubItems();
  },
  methods: {
    treeSelectItemClass(item) {
      const { activeId, contentItemClass, contentActiveClass, contentDisabledClass } = this;

      return `press-ellipsis ${contentItemClass} ${utils.bem2('tree-select__item', {
        active: isActive(activeId, item.id),
        disabled: item.disabled,
      })} ${isActive(activeId, item.id) ? contentActiveClass : ''} ${item.disabled ? contentDisabledClass : ''}`;
    },
    // 当一个子项被选择时
    onSelectItem(item) {
      const isArray = Array.isArray(this.activeId);

      // 判断有没有超出右侧选择的最大数
      const isOverMax = isArray && this.activeId.length >= this.max;

      // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
      const isSelected = isArray
        ? this.activeId.indexOf(item.id) > -1
        : this.activeId === item.id;

      if (!item.disabled && (!isOverMax || isSelected)) {
        this.$emit('click-item', item);
      }
    },
    // 当一个导航被点击时
    onClickNav(index) {
      const item = this.items[index];
      if (!item.disabled) {
        this.$emit('click-nav', +index);
      }
    },
    // 更新子项列表
    updateSubItems() {
      const { items, mainActiveIndex } = this;
      const { children = [] } = items[mainActiveIndex] || {};
      this.subItems = children;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
