<template>
  <div
    :class="['press-progress', customClass]"
    :style="true ? computed.rootStyle({ strokeWidth, trackColor }) : ''"
  >
    <div
      class="press-progress__portion"
      :style="true ? computed.portionStyle({ percentage, inactive, color }) : ''"
    >
      <div
        v-if="showPivot && computed.pivotText(pivotText, percentage)"
        :style="true ? computed.pivotStyle({ textColor, pivotColor, inactive, color, right }) : ''"
        class="press-progress__pivot"
      >
        {{ computed.pivotText(pivotText, percentage) }}
      </div>
    </div>
  </div>
</template>
<script>
import { BLUE } from '../common/constant/color';
import { getRect } from '../common/dom/rect';
import computed from './computed';


export default {
  name: 'PressProgress',
  props: {
    inactive: Boolean,
    percentage: {
      type: Number,
      default: 0,
      observer: 'setLeft',
    },
    pivotText: { type: String, default: '' },
    pivotColor: { type: String, default: '' },
    trackColor: { type: String, default: '' },
    showPivot: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: BLUE,
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    strokeWidth: {
      type: [Number, String],
      default: 4,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  emits: [],
  data() {
    return {
      right: 0,
      computed,
    };
  },
  mounted() {
    this.setLeft();
  },
  methods: {
    setLeft() {
      Promise.all([
        getRect(this, '.press-progress'),
        getRect(this, '.press-progress__pivot'),
      ]).then(([portion, pivot]) => {
        if (portion && pivot) {
          this.right = (pivot.width * (this.percentage - 100)) / 100;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
