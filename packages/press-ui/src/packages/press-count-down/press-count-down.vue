<template>
  <div class="press-count-down">
    <slot
      v-if="useSlot"
      :time-data="timeData"
    >
      <span>
        {{ formattedTime }}
      </span>
    </slot>

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
  name: 'PressCountDown',
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
  emits: ['change', 'finish'],
  data() {
    return {
      // timeData: parseTimeData(0),
      formattedTime: '0',
      remain: 0,
    };
  },
  computed: {
    timeData() {
      const res =  parseTimeData(this.remain);
      return res;
    },
  },
  watch: {
    time: {
      handler(value) {
        const { remain, millisecond } = this;
        if (!millisecond
          && (Math.floor(value / 1000) === Math.floor(remain / 1000)
          || Math.round(value / 1000) === Math.round(remain / 1000))
        ) {
          return;
        }
        this.reset();
      },
      immediate: true,
    },
  },
  destroyed() {
    this.onDestroyed();
  },
  unmounted() {
    this.onDestroyed();
  },
  methods: {
    onDestroyed() {
      clearTimeout(this.tid);
      this.tid = null;
    },
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
<style scoped lang="scss" src="./css/index.scss">
</style>
