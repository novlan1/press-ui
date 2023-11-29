<template>
  <div
    class="press-tree-select"
    :style="'height: '+(utils.addUnit(height))"
  >
    <scroll-view
      scroll-y
      class="press-tree-select__nav"
    >
      <press-sidebar
        :active-key="mainActiveIndex"
        custom-class="press-tree-select__nav__inner"
        @change="onClickNav"
      >
        <press-sidebar-item
          v-for="(item, index) in (items)"
          :key="index"
          custom-class="main-item-class"
          active-class="main-active-class"
          disabled-class="main-disabled-class"
          :badge="item.badge"
          :dot="item.dot"
          :title="item.text"
          :disabled="item.disabled"
        />
      </press-sidebar>
    </scroll-view>
    <scroll-view
      scroll-y
      class="press-tree-select__content"
    >
      <slot name="content" />
      <div
        v-for="(item) in (subItems)"
        :key="item.id"
        :class="'' + treeSelectItemClass(item)"
        @click="onSelectItem(item)"
      >
        {{ item.text }}
        <press-icon-plus
          v-if="isActive(activeId, item.id)"
          :name="selectedIcon"
          size="16px"
          class="press-tree-select__selected"
        />
      </div>
    </scroll-view>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressSidebar from '../press-sidebar/press-sidebar.vue';
import PressSidebarItem from '../press-sidebar-item/press-sidebar-item.vue';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import utils from '../common/utils/utils';
import { isActive } from './computed';

export default {
  name: 'PressTreeSelect',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressSidebar,
    PressSidebarItem,
  },
  classes: [
    'main-item-class',
    'content-item-class',
    'main-active-class',
    'content-active-class',
    'main-disabled-class',
    'content-disabled-class',
  ],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    activeId: {
      type: [Number, String, null, Array],
      default: '',
    },
    mainActiveIndex: {
      type: [Number, String, Array, null],
      default: 0,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    selectedIcon: {
      type: String,
      default: 'success',
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
      const { activeId } = this;
      return `press-ellipsis content-item-class ${utils.bem2('tree-select__item', { active: isActive(activeId, item.id), disabled: item.disabled })} ${isActive(activeId, item.id) ? 'content-active-class' : ''} ${item.disabled ? 'content-disabled-class' : ''}`;
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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-tree-select {
  position: relative;
  display: flex;
  user-select: none;
  font-size: var(--tree-select-font-size, $tree-select-font-size);

  ::v-deep &__nav {
    flex: 1;
    background-color: var(
      --tree-select-nav-background-color,
      $tree-select-nav-background-color
    );

    &__inner {
      width: 100% !important;
      height: 100%;
    }

    --sidebar-padding: 12px 8px 12px 12px;
    // --sidebar-padding: $tree-select-nav-item-padding;
  }

  ::v-deep &__content {
    flex: 2;
    background-color: var(
      --tree-select-content-background-color,
      $tree-select-content-background-color
    );
  }

  ::v-deep &__item {
    position: relative;
    // 【修改点】font-weight改成正常
    font-weight: normal;
    padding: 0 32px 0 var(--padding-md, $padding-md);
    line-height: var(--tree-select-item-height, $tree-select-item-height);

    &--active {
      color: var(
        --tree-select-item-active-color,
        $tree-select-item-active-color
      );
    }

    &--disabled {
      color: var(
        --tree-select-item-disabled-color,
        $tree-select-item-disabled-color
      );
    }
  }

  ::v-deep &__selected {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--padding-md, $padding-md);
  }
}
</style>
