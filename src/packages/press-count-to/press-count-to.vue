<template>
  <span class="press-count-to">
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
import { style } from '../common/utils/style';

import props from './computed';
import { CountTo } from './count-to';


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
      countToInstance: null,
      displayValue: this.formatNumber(this.startValue),
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
    this.initCountTo();
    this.autoplay && this.start();
  },
  beforeDestroy() {
    this.countToInstance?.destroy();
  },
  methods: {
    addUnit,
    getConfig() {
      return {
        startValue: this.startValue,
        endValue: this.endValue,
        duration: this.duration,
        autoplay: this.autoplay,
        decimals: this.decimals,
        decimal: this.decimal,
        separator: this.separator,
        useEasing: this.useEasing,
        onChange: (value) => {
          this.displayValue = value;
          this.$emit('change', value);
        },
        onEnd: () => {
          this.$emit('end');
        },
      };
    },
    formatNumber(num) {
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
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    initCountTo() {
      this.countToInstance = new CountTo({
        ...this.getConfig(),
      });
    },
    start() {
      this.countToInstance?.start(this.getConfig());
    },
    stop() {
      this.countToInstance?.stop();
    },
    reset() {
      this.countToInstance?.reset();
    },
    reStart() {
      this.countToInstance?.reStart();
    },
    resume() {
      this.countToInstance?.resume();
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
