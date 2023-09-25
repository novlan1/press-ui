<template>
  <div
    v-if="showWrapper"
    :class="true ? utils.bem2('dropdown-item', direction) : ''"
    :style="wrapperStyle"
  >
    <press-popup
      :show="showPopup"
      :custom-style="'position: absolute;'+(popupStyle)"
      overlay-style="position: absolute;"
      :overlay="overlay"
      :position="direction === 'down' ? 'top' : 'bottom'"
      :duration="transition ? duration : 0"
      :close-on-click-overlay="closeOnClickOverlay"
      @enter="onOpen"
      @leave="onClose"
      @close="toggle"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <press-cell
        v-for="(item, index) in (options)"
        :key="index"
        :class="true ? utils.bem2('dropdown-item__option', { active: item.value === innerValue } ) : ''"
        clickable
        :icon="item.icon"
        @click="onOptionTap(item)"
      >
        <template #title>
          <div
            class="press-dropdown-item__title"
            :style="item.value === innerValue ? 'color:' + activeColor : ''"
          >
            {{ item.text }}
          </div>
        </template>

        <press-icon-plus
          v-if="item.value === innerValue"
          name="success"
          class="press-dropdown-item__icon"
          :color="activeColor"
        />
      </press-cell>

      <slot />
    </press-popup>
  </div>
</template>
<script>
import PressPopup from '../press-popup-plus/press-popup-plus.vue';
import PressCell from '../press-cell/press-cell.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import utils from '../common/utils/utils';

import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_DROPDOWN_MENU as PARENT } from '../common/constant/parent-map';


export default {
  name: 'PressDropdownItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressCell,
    PressIconPlus,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    titleClass: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    popupStyle: { type: String, default: '' },
    ...defaultProps,
  },
  emits: ['open', 'opened', 'close', 'closed', 'change'],
  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
      displayTitle: '',

      utils,
      innerValue: this.value,

      direction: 'down',
      closeOnClickOverlay: true,
      activeColor: '',
      duration: 200,
      overlay: true,
      wrapperStyle: '',
    };
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val;
        this.rerender();
      },
    },
    title: {
      handler() {
        this.rerender();
      },
    },
    titleClass: {
      handler() {
        this.rerender();
      },
    },
    options: {
      handler() {
        this.rerender();
      },
    },
  },
  mounted() {
    this.rerender();
    this.updateDataFromParent();
  },
  methods: {
    rerender() {
      this.$nextTick(() => {
        this[PARENT]?.updateItemListData();
      });
    },
    updateDataFromParent() {
      if (this[PARENT]) {
        const { overlay, duration, activeColor, closeOnClickOverlay, direction } = this[PARENT];
        this.overlay = overlay;
        this.duration = duration;
        this.activeColor = activeColor;
        this.closeOnClickOverlay = closeOnClickOverlay;
        this.direction = direction;
      }
    },
    onOpen() {
      this.$emit('open');
    },
    onOpened() {
      this.$emit('opened');
    },
    onClose() {
      this.$emit('close');
    },
    onClosed() {
      this.$emit('closed');
      this.showWrapper = false;
    },
    onOptionTap(option) {
      const { value } = option;
      const shouldEmitChange = this.innerValue !== value;
      this.showPopup = false;
      this.innerValue = value;

      this.$emit('close');
      this.rerender();
      if (shouldEmitChange) {
        this.$emit('change', value);
      }
    },
    toggle(show, options = {}) {
      const { showPopup } = this;
      if (typeof show !== 'boolean') {
        show = !showPopup;
      }
      if (show === showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;
      if (show) {
        this[PARENT]?.getChildWrapperStyle().then((wrapperStyle) => {
          this.wrapperStyle = wrapperStyle;
          this.showWrapper = true;
          this.rerender();
        });
      } else {
        this.rerender();
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-dropdown-item {
  position: fixed;
  right: 0;
  left: 0;
  overflow: hidden;

  &__option {
    text-align: left;

    &--active {
      .press-dropdown-item__title,
      .press-dropdown-item__icon {
        color: var(
          --dropdown-menu-option-active-color,
          $dropdown-menu-option-active-color
        );
      }
    }
  }

  &--up {
    top: 0;
  }

  &--down {
    bottom: 0;
  }

  &__icon {
    display: block;
    line-height: inherit;
  }
}
</style>
