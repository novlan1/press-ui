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
    const { windowHeight } = getWindowWidth();
    this.windowHeight = windowHeight;
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
        const offset = direction === 'down' ? bottom : this.windowHeight - top;
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
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-dropdown-menu {
  display: flex;
  box-shadow: var(--dropdown-menu-box-shadow, $dropdown-menu-box-shadow);
  user-select: none;
  height: var(--dropdown-menu-height, $dropdown-menu-height);
  background-color: var(
    --dropdown-menu-background-color,
    $dropdown-menu-background-color
  );

  &__item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 0; // hack for flex ellipsis

    &:active {
      opacity: 0.7;
    }

    &--disabled {
      &:active {
        opacity: 1;
      }

      .press-dropdown-menu__title {
        color: var(
          --dropdown-menu-title-disabled-text-color,
          $dropdown-menu-title-disabled-text-color
        );
      }
    }
  }

  &__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: var(--dropdown-menu-title-padding, $dropdown-menu-title-padding);
    color: var(
      --dropdown-menu-title-text-color,
      $dropdown-menu-title-text-color
    );
    font-size: var(
      --dropdown-menu-title-font-size,
      $dropdown-menu-title-font-size
    );
    line-height: var(
      --dropdown-menu-title-line-height,
      $dropdown-menu-title-line-height
    );

    &::after {
      position: absolute;
      top: 50%;
      right: -4px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent currentColor currentColor;
      transform: rotate(-45deg);
      opacity: 0.8;
      content: "";
    }

    &--active {
      color: var(
        --dropdown-menu-title-active-text-color,
        $dropdown-menu-title-active-text-color
      );
    }

    &--down {
      &::after {
        margin-top: -1px;
        transform: rotate(135deg);
      }
    }
  }
}
</style>
