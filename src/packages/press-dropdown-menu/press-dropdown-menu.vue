<template>
  <div>
    <div
      class="press-dropdown-menu press-dropdown-menu--top-bottom"
      :class="customClass"
    >
      <div
        v-for="(item,index) in (itemListData)"
        :key="index"
        :class="true ? utils.bem2('dropdown-menu__item', { disabled: item.disabled }) : ''"
        @click="onTitleTap(index)"
      >
        <div
          :class="(item.titleClass)+' '
            +(utils.bem2('dropdown-menu__title',
                         { active: item.showPopup, down: item.showPopup === (direction === 'down') }))"
          :style="item.showPopup ? 'color:' + activeColor : ''"
        >
          <div class="press-ellipsis">
            {{ computed.displayTitle(item) }}
          </div>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>
<script>
import { addUnit } from '../common/format/unit';
import { getRect, getWindowWidth } from '../common/dom/rect';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ParentMixin } from '../mixins/relation';
import { PARENT_DROPDOWN_MENU as PARENT } from '../common/constant/parent-map';


let ARRAY = [];


export default {
  name: 'PressDropdownMenu',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    activeColor: {
      type: String,
      default: '',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 200,
    },
    direction: {
      type: String,
      default: 'down',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      itemListData: [],
      utils,
      computed,
    };
  },
  watch: {
    activeColor: {
      handler() {
        this.updateChildrenData();
      },
    },
    overlay: {
      handler() {
        this.updateChildrenData();
      },
    },
    duration: {
      handler() {
        this.updateChildrenData();
      },
    },
    direction: {
      handler() {
        this.updateChildrenData();
      },
    },
    closeOnClickOverlay: {
      handler() {
        this.updateChildrenData();
      },
    },
  },
  beforeCreate() {
    ARRAY.push(this);
  },
  created() {
    const { windowHeight, windowTop } = getWindowWidth();
    this.windowHeight = windowHeight;
    this.windowTop = windowTop || 0;
    this.children = [];
  },
  destroyed() {
    this.onDestroyed();
  },
  unmounted() {
    this.onDestroyed();
  },
  methods: {
    onDestroyed() {
      ARRAY = ARRAY.filter(item => item !== this);
    },
    updateItemListData() {
      this.itemListData = this.children.map((child) => {
        const { titleClass, showPopup, disabled, innerValue: value, title, text, options } = child;
        return {
          titleClass, showPopup, disabled, value, title, text, options,
        };
      });
    },
    updateChildrenData() {
      this.children.forEach((child) => {
        child.updateDataFromParent();
      });
    },
    toggleItem(active) {
      this.children.forEach((item, index) => {
        const { showPopup } = item;
        if (index === active) {
          item.toggle();
        } else if (showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    },
    close() {
      this.children.forEach((child) => {
        child.toggle(false, { immediate: true });
      });
    },
    getChildWrapperStyle() {
      const { zIndex, direction } = this;
      return getRect(this, '.press-dropdown-menu').then((rect) => {
        const { top = 0, bottom = 0 } = rect;

        // 是 fixed 元素，top 需要加上 windowTop
        const offset = direction === 'down' ? bottom + this.windowTop : this.windowHeight - top;

        let wrapperStyle = `z-index: ${zIndex};`;

        if (direction === 'down') {
          wrapperStyle += `top: ${addUnit(offset)};`;
        } else {
          wrapperStyle += `bottom: ${addUnit(offset)};`;
        }
        return wrapperStyle;
      });
    },
    onTitleTap(index) {
      const child = this.children[index];
      if (!child.disabled) {
        ARRAY.forEach((menuItem) => {
          if (menuItem
              && menuItem.closeOnClickOutside
              && menuItem !== this) {
            menuItem.close();
          }
        });
        this.toggleItem(index);
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
