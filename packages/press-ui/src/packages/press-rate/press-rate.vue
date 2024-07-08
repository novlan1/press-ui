<template>
  <div class="press-rate-index">
    <div
      :class="[
        utils.bem2('rate'),
        customClass
      ]"
      @touchmove="onTouchMove"
    >
      <div
        v-for="(item,index) in (innerCountArray)"
        :key="index"
        :class="[utils.bem2('rate__item')]"
        :style="'' + style({ paddingRight: index !== count - 1 ? utils.addUnit(gutter) : null })"
      >
        <press-icon-plus
          :name="index + 1 <= innerValue ? icon : voidIcon"
          :class="[getIconBaseClass(index)]"
          :style="'' + iconStyle"
          :custom-class="getIconBaseCustomClass(index)"
          :custom-style="iconCustomStyle"
          :data-score="index"
          :color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor"
          @click="onSelect(index)"
        />

        <press-icon-plus
          v-if="allowHalf"
          :name="index + 0.5 <= innerValue ? icon : voidIcon"
          :class="[getIconHalfClass(index)]"
          :style="'' + iconStyle"
          :custom-class="getIconHalfCustomClass(index)"
          :custom-style="iconCustomStyle"
          :data-score="index - 0.5"
          :color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
          @click="onSelect(index - 0.5)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { getAllRect } from '../common/dom/rect';
import utils from '../common/utils/utils';
import { style } from '../common/utils/style';

export default {
  name: 'PressRate',
  components: {
    PressIconPlus,
  },
  field: true,
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
    customClass: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: '',
    },
  },
  emits: ['input', 'change'],
  data() {
    return {
      innerValue: 0,
      innerCountArray: Array.from({ length: 5 }),

      utils,
      style,
    };
  },
  computed: {
    iconStyle() {
      return style({ fontSize: utils.addUnit(this.size) });
    },
    iconCustomStyle() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = this.iconStyle;
      // #endif
      return result;
    },
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
        this.$nextTick(() => {
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
    getIconBaseClass(index) {
      const { disabled, innerValue } = this;
      return utils.bem2('rate__icon', [{ disabled, full: index + 1 <= innerValue }]);
    },
    getIconHalfClass(index) {
      const { disabled, innerValue } = this;
      return utils.bem2('rate__icon', ['half', { disabled, full: index + 0.5 <= innerValue }]);
    },
    getIconBaseCustomClass(index) {
      let result = this.iconClass;
      // #ifdef MP-ALIPAY
      result += ` ${this.getIconBaseClass(index)}`;
      // #endif
      return result;
    },
    getIconHalfCustomClass(index) {
      let result = this.iconClass;
      // #ifdef MP-ALIPAY
      result += ` ${this.getIconHalfClass(index)}`;
      // #endif
      return result;
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
