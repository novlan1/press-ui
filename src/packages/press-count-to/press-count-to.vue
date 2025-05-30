<template>
  <span
    class="press-count-to"
  >
    <slot v-if="useSlot" />

    <span
      v-else
      class="press-count-to__number"
      :style="countToStyle"
    >
      {{ displayValue }}
    </span>
  </span>
</template>

<script>
import { getVirtualHostOptions } from '../common/component-handler/press-component';
import { addUnit } from '../common/utils/add-unit';
import style from '../common/utils/style';

import props from './computed';


export default {
  name: 'PressCountTo',
  options: {
    ...getVirtualHostOptions(true, false),
    styleIsolation: 'shared',
  },
  mixins: [props],
  emits: [
    'change',
    'end',
  ],
  data() {
    return {
      localStartVal: this.startValue,
      displayValue: this.formatNumber(this.startValue),
      printVal: null,
      paused: false, // 是否暂停
      localDuration: Number(this.duration),

      startTime: null, // 开始的时间
      timestamp: null, // 时间戳
      remaining: null, // 停留的时间
      rAF: null,
      lastTime: 0, // 上一次的时间
    };
  },
  computed: {
    countToStyle() {
      const { customStyle, fontSize, bold, color } = this;

      return style([
        customStyle,
        {
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color,
        },
      ]);
    },
    countDown() {
      return this.startValue > this.endValue;
    },
  },
  watch: {
    startValue() {
      this.autoplay && this.start();
    },
    endValue() {
      this.autoplay && this.start();
    },
  },
  mounted() {
    this.autoplay && this.start();
  },
  methods: {
    addUnit,
    easingFn(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
    requestAnimationFrame(callback) {
      const currTime = new Date().getTime();
      // 为了使setTimeout的尽可能的接近每秒60帧的效果
      const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      this.lastTime = currTime + timeToCall;
      return id;
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
    // 开始滚动数字
    start() {
      this.localStartVal = this.startValue;
      this.startTime = null;
      this.localDuration = this.duration;
      this.paused = false;
      this.rAF = this.requestAnimationFrame(this.count);
    },
    // 暂定状态，重新再开始滚动；或者滚动状态下，暂停
    reStart() {
      if (this.paused) {
        this.resume();
        this.paused = false;
      } else {
        this.stop();
        this.paused = true;
      }
    },
    // 暂停
    stop() {
      this.cancelAnimationFrame(this.rAF);
    },
    // 重新开始(暂停的情况下)
    resume() {
      if (!this.remaining) return;
      this.startTime = 0;
      this.localDuration = this.remaining;
      this.localStartVal = this.printVal;
      this.requestAnimationFrame(this.count);
    },
    // 重置
    reset() {
      this.startTime = null;
      this.cancelAnimationFrame(this.rAF);
      this.displayValue = this.formatNumber(this.startValue);

      this.$emit('change', this.displayValue);
    },
    count(timestamp) {
      if (!this.startTime) this.startTime = timestamp;

      this.timestamp = timestamp;
      const progress = timestamp - this.startTime;
      this.remaining = this.localDuration - progress;
      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(
            progress,
            0,
            this.localStartVal - this.endValue,
            this.localDuration,
          );
        } else {
          this.printVal = this.easingFn(
            progress,
            this.localStartVal,
            this.endValue - this.localStartVal,
            this.localDuration,
          );
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - (this.localStartVal - this.endValue) * (progress / this.localDuration);
        } else {
          this.printVal = this.localStartVal + (this.endValue - this.localStartVal) * (progress / this.localDuration);
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endValue ? this.endValue : this.printVal;
      } else {
        this.printVal = this.printVal > this.endValue ? this.endValue : this.printVal;
      }
      this.displayValue = this.formatNumber(this.printVal) || 0;
      this.$emit('change', this.displayValue);


      if (progress < this.localDuration) {
        this.rAF = this.requestAnimationFrame(this.count);
      } else {
        this.$emit('end');
      }
    },
    // 判断是否数字
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    formatNumber(num) {
      // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
      num = Number(num);
      num = num.toFixed(Number(this.decimals));
      num += '';
      const x = num.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? this.decimal + x[1] : '';

      const rgx = /(\d+)(\d{3})/;
      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, `$1${this.separator}$2`);
        }
      }
      return x1 + x2;
    },
    destroyed() {
      this.cancelAnimationFrame(this.rAF);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
