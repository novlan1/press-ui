<template>
  <div
    class="press-progress custom-class"
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
  },
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
<style scoped lang="scss">
@import "../common/style/index.scss";

.press-progress {
  background: var(--progress-background-color, #ebedf0);
  border-radius: var(--progress-height, 4px);
  height: var(--progress-height, 4px);
  position: relative;
}
.press-progress__portion {
  background: var(--progress-color, #1989fa);
  border-radius: inherit;
  height: 100%;
  left: 0;
  position: absolute;
}
.press-progress__pivot {
  background-color: var(--progress-pivot-background-color, #1989fa);
  border-radius: 1em;
  box-sizing: border-box;
  color: var(--progress-pivot-text-color, #fff);
  font-size: var(--progress-pivot-font-size, 10px);
  line-height: var(--progress-pivot-line-height, 1.6);
  min-width: 3.6em;
  padding: var(--progress-pivot-padding, 0 5px);
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  word-break: keep-all;
}
</style>
