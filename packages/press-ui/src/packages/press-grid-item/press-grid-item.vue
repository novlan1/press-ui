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
          <PressIconPlus
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

<style scoped lang="scss" src="./css/index.scss">
</style>
