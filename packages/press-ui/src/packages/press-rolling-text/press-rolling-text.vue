<template>
  <div
    class="press-rolling-text"
    :class="customClass"
  >
    <PressRollingTextItem
      v-for="(item, i) of targetNumArr"
      :key="i"

      :figure-arr="isCustomType ? getTextArrByIdx(i) : getFigureArr(i)"
      :duration="duration"
      :direction="direction"

      :is-start="rolling"
      :height="height"
      :delay="getDelay(i, itemLength)"

      :custom-class="itemCustomClass"
    />
  </div>
</template>
<script>
import { padZero } from '../press-count-down/utils';
import PressRollingTextItem from '../press-rolling-text-item/press-rolling-text-item.vue';


const CIRCLE_NUM = 2;


export default {
  name: 'PressRollingText',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressRollingTextItem,
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    itemCustomClass: {
      type: String,
      default: '',
    },

    startNum: {
      type: Number,
      default: 0,
    },
    targetNum: {
      type: Number,
      default: 0,
    },
    textList: {
      type: Array,
      default: () => ([]),
    },
    duration: {
      type: Number,
      default: 2,
    },
    direction: {
      type: String,
      default: 'down',
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
    stopOrder: {
      type: String,
      default: 'ltr',
    },
    height: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      rolling: this.autoStart,
    };
  },
  computed: {
    isCustomType() {
      return Array.isArray(this.textList) && this.textList.length;
    },
    itemLength() {
      if (this.isCustomType) return this.textList[0].length;
      return `${Math.max(this.startNum, this.targetNum)}`.length;
    },
    targetNumArr() {
      if (this.isCustomType) return new Array(this.itemLength).fill('');
      return padZero(this.targetNum, this.itemLength).split('');
    },
    startNumArr() {
      return padZero(this.startNum, this.itemLength).split('');
    },
  },
  watch: {
    autoStart: {
      handler(val) {
        if (val) {
          this.start();
        }
      },
    },
  },
  mounted() {
  },
  methods: {
    getTextArrByIdx(idx) {
      const result = [];
      for (let i = 0; i < this.textList.length; i++) {
        result.push(this.textList[i][idx]);
      }
      return result;
    },
    getFigureArr(i) {
      const start = +this.startNumArr[i];
      const target = +this.targetNumArr[i];
      const result = [];
      for (let i = start; i <= 9; i++) {
        result.push(i);
      }
      for (let i = 0; i <= CIRCLE_NUM; i++) {
        for (let j = 0; j <= 9; j++) {
          result.push(j);
        }
      }
      for (let i = 0; i <= target; i++) {
        result.push(i);
      }
      return result;
    },
    getDelay(i, len)  {
      if (this.stopOrder === 'ltr') return 0.2 * i;
      return 0.2 * (len - 1 - i);
    },
    start() {
      this.rolling = true;
    },
    reset() {
      this.rolling = false;
      if (this.autoStart) {
        setTimeout(() => {
          this.start();
        }, 300);
      }
    },

  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
