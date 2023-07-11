<template>
  <uni-shadow-root class="press-rate-index">
    <div
      :class="'' + (utils.bem2('rate'))+' custom-class'"
      @touchmove="onTouchMove"
    >
      <div
        v-for="(item,index) in (innerCountArray)"
        :key="index"
        :class="'' + utils.bem2('rate__item')"
        :style="'' + style({ paddingRight: index !== count - 1 ? utils.addUnit(gutter) : null })"
      >
        <press-icon-plus
          :name="index + 1 <= innerValue ? icon : voidIcon"
          :class="'' + utils.bem2('rate__icon', [{ disabled, full: index + 1 <= innerValue }])"
          :style="'' + style({ fontSize: utils.addUnit(size) })"
          custom-class="icon-class"
          :data-score="index"
          :color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor"
          @click="onSelect(index)"
        />

        <press-icon-plus
          v-if="allowHalf"
          :name="index + 0.5 <= innerValue ? icon : voidIcon"
          :class="'' + utils.bem2('rate__icon', ['half', { disabled, full: index + 0.5 <= innerValue }])"
          :style="'' + style({ fontSize: utils.addUnit(size) })"
          custom-class="icon-class"
          :data-score="index - 0.5"
          :color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
          @click="onSelect(index - 0.5)"
        />
      </div>
    </div>
  </uni-shadow-root>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { getAllRect } from '../common/dom/rect';
import utils from '../common/utils/utils';
import { style } from '../common/utils/style';

export default {
  components: {
    PressIconPlus,
  },
  field: true,
  classes: ['icon-class'],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: { type: [String, Number], default: '' },
    icon: {
      type: String,
      default: 'star',
    },
    voidIcon: {
      type: String,
      default: 'star-o',
    },
    color: { type: String, default: '' },
    voidColor: { type: String, default: '' },
    disabledColor: { type: String, default: '' },
    count: {
      type: Number,
      default: 5,
    },
    gutter: { type: [Number, String], default: '' },
    touchable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: 0,
      innerCountArray: Array.from({ length: 5 }),

      utils,
      style,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.innerValue) {
          this.innerValue = val;
        }
      },
      immediate: true,
    },
    count: {
      handler(value) {
        this.innerCountArray = Array.from({ length: value });
      },
      immediate: true,
    },
  },
  methods: {
    onSelect(score) {
      if (!this.disabled && !this.readonly) {
        this.innerValue = score + 1;
        wx.nextTick(() => {
          this.$emit('input', score + 1);
          this.$emit('change', score + 1);
        });
      }
    },
    onTouchMove(event) {
      const { touchable } = this;
      if (!touchable) return;
      const { clientX } = event.touches[0];
      getAllRect(this, '.press-rate__icon').then((list) => {
        const target = list
          // .sort((cur, next) => cur.dataset.score - next.dataset.score)
          .sort((cur, next) => cur.x - next.x)
          .find(item => clientX >= item.left && clientX <= item.right);
        const index = list.indexOf(target);
        if (target != null) {
          this.onSelect(index);
          // this.onSelect(Object.assign(Object.assign({}, event), { currentTarget: target }));
        }
      });
    },
  },
};

</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-rate {
  display: inline-flex;
  user-select: none;

  &__item {
    position: relative;
    padding: 0 var(--rate-horizontal-padding, $rate-horizontal-padding);

    &:not(:last-child) {
      padding-right: var(--rate-icon-gutter, $rate-icon-gutter);
    }
  }

  &__icon {
    display: block;
    height: 1em;
    color: var(--rate-icon-void-color, $rate-icon-void-color);
    font-size: var(--rate-icon-size, $rate-icon-size);

    &--half {
      position: absolute;
      top: 0;
      width: 0.5em;
      overflow: hidden;
      left: var(--rate-horizontal-padding, $rate-horizontal-padding);
      color: var(--rate-icon-full-color, $rate-icon-full-color);
    }

    &--full {
      color: var(--rate-icon-full-color, $rate-icon-full-color);
    }

    &--disabled {
      color: var(--rate-icon-disabled-color, $rate-icon-disabled-color);
    }
  }
}
</style>
