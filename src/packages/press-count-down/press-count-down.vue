<template>
  <div class="press-count-down">
    <slot v-if="useSlot" />
    <template v-else>
      {{ formattedTime }}
    </template>
  </div>
</template>

<script>
import { isSameSecond, parseFormat, parseTimeData } from './utils';

function simpleTick(fn) {
  return setTimeout(fn, 30);
}


export default {
  props: {
    useSlot: Boolean,
    millisecond: Boolean,
    time: {
      type: Number,
      default: 0,
      // observer: 'reset',
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timeData: parseTimeData(0),
      formattedTime: '0',
    };
  },
  watch: {
    time: {
      handler() {
        this.reset();
      },
      immediate: true,
    },
  },
  destroyed() {
    clearTimeout(this.tid);
    this.tid = null;
  },
  methods: {
    // 开始
    start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },
    // 暂停
    pause() {
      this.counting = false;
      clearTimeout(this.tid);
    },
    // 重置
    reset() {
      this.pause();
      this.remain = this.time;
      this.setRemain(this.remain);
      if (this.autoStart) {
        this.start();
      }
    },
    tick() {
      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick() {
      this.tid = simpleTick(() => {
        this.setRemain(this.getRemain());
        if (this.remain !== 0) {
          this.microTick();
        }
      });
    },
    macroTick() {
      this.tid = simpleTick(() => {
        const remain = this.getRemain();
        if (!isSameSecond(remain, this.remain) || remain === 0) {
          this.setRemain(remain);
        }
        if (this.remain !== 0) {
          this.macroTick();
        }
      });
    },
    getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setRemain(remain) {
      this.remain = remain;
      const timeData = parseTimeData(remain);
      if (this.useSlot) {
        this.$emit('change', timeData);
      }
      this.formattedTime = parseFormat(this.format, timeData);
      // this.setData({
      //   formattedTime: parseFormat(this.format, timeData),
      // });
      if (remain === 0) {
        this.pause();
        this.$emit('finish');
      }
    },
  },
};
</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-count-down {
  color: var(--count-down-text-color, $count-down-text-color);
  font-size: var(--count-down-font-size, $count-down-font-size);
  line-height: var(--count-down-line-height, $count-down-line-height);
}
</style>
