<template>
  <div
    :class="`${customClass} `+ (utils.bem2('grid-item', { square }))"
    :style="true ? computed.wrapperStyle({ square, gutter, columnNum, index }) : ''"
    @click="onClick"
  >
    <div
      :class="gridContentClass"
      :style="true ? computed.contentStyle({ square, gutter }) : ''"
    >
      <template v-if="useSlot">
        <slot />
      </template>
      <template v-else>
        <div class="press-grid-item__icon">
          <press-icon-plus
            v-if="icon"
            :name="icon"
            :color="iconColor"
            :class-prefix="iconPrefix"
            :dot="dot"
            :info="badge || info"
            :size="iconSize"
          />
          <slot
            v-else
            name="icon"
          />
        </div>

        <div class="press-grid-item__text">
          <span v-if="text">
            {{ text }}
          </span>

          <slot
            v-else
            name="text"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { link } from '../mixins/link';
import utils from '../common/utils/utils';
import computed from './computed';

import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_GRID as PARENT } from '../common/constant/parent-map';


export default {
  name: 'PressGridItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
    virtualHost: true,
  },
  components: {
    PressIconPlus,
  },
  mixins: [ChildrenMixin(PARENT), link],
  props: {
    icon: { type: String, default: '' },
    iconColor: { type: String, default: '' },
    iconPrefix: {
      type: String,
      default: 'press-icon-plus',
    },
    dot: Boolean,
    info: { type: String, default: '' },
    badge: { type: String, default: '' },
    text: { type: String, default: '' },
    useSlot: Boolean,
    ...defaultProps,
  },
  emits: ['click'],
  data() {
    return {
      viewStyle: '',
      computed,
      utils,

      square: false,
      gutter: 0,
      clickable: false,
      columnNum: 4,
      center: true,
      border: true,
      direction: '',
      iconSize: '',
      reverse: false,
    };
  },
  computed: {
    gridContentClass() {
      const {
        direction,
        center,
        square,
        reverse,
        clickable,
        border,
        gutter,
      } = this;
      return `${utils.bem2('grid-item__content', [direction, { center, square, reverse, clickable, surround: border && gutter }])} ${border ? 'press-hairline--surround' : ''}`;
    },
  },
  mounted() {
    this.updateStyle();
  },
  methods: {
    updateStyle() {
      if (!this[PARENT]) {
        return;
      }
      const {
        columnNum,
        border,
        square,
        gutter,
        clickable,
        center,
        direction,
        reverse,
        iconSize,

      } = this[PARENT];

      this.center = center;
      this.border = border;
      this.square = square;
      this.gutter = gutter;
      this.clickable = clickable;
      this.direction = direction;
      this.reverse = reverse;
      this.iconSize = iconSize;
      this.columnNum = columnNum;
    },
    onClick() {
      this.$emit('click');
      this.jumpLink();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-grid-item {
  position: relative;
  float: left;
  box-sizing: border-box;

  &__icon {
    display: flex;
    align-items: center;
    font-size: var(--grid-item-icon-size, $grid-item-icon-size);
    height: var(--grid-item-icon-size, $grid-item-icon-size);
  }

  &__text {
    word-wrap: break-word;
    color: var(--grid-item-text-color, $grid-item-text-color);
    font-size: var(--grid-item-text-font-size, $grid-item-text-font-size);
  }

  &__icon + &__text {
    margin-top: 8px;
  }

  &--square {
    height: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: var(--grid-item-content-padding, $grid-item-content-padding);
    background-color: var(
      --grid-item-content-background-color,
      $grid-item-content-background-color
    );

    &::after {
      z-index: 1;
      border-width: 0 $border-width-base $border-width-base 0;
    }

    &--surround {
      &::after {
        border-width: $border-width-base;
      }
    }

    &--center {
      align-items: center;
      justify-content: center;
    }

    &--square {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }

    &--horizontal {
      flex-direction: row;

      .press-grid-item__text {
        margin: 0 0 0 $padding-xs;
      }
    }

    &--reverse {
      flex-direction: column-reverse;

      .press-grid-item__text {
        margin: 0 0 $padding-xs;
      }
    }

    &--horizontal.press-grid-item--reverse {
      flex-direction: row-reverse;

      .press-grid-item__text {
        margin: 0 $padding-xs 0 0;
      }
    }

    &--clickable:active {
      background-color: var(
        --grid-item-content-active-color,
        $grid-item-content-active-color
      );
    }
  }
}
</style>
