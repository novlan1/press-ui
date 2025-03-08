<template>
  <div
    :class="[utils.bem2('rolling-text-item',[direction]), customClass]"
    :style="rootStyle"
  >
    <div :class="true ? utils.bem2('rolling-text-item__box', { animate:isStart }) : ''">
      <div
        v-for="(figure, index) of newFigureArr"
        :key="index"
        :class="[
          utils.bem2('rolling-text-item__item', {'last': index ===newFigureArr.length-1 }),
        ]"
        :style="itemStyle"
      >
        {{ figure }}
      </div>
    </div>
  </div>
</template>
<script>
import { addUnit } from '../common/utils/add-unit';
import utils from '../common/utils/utils';
import styles from '../common/utils/style';


export default {
  name: 'PressRollingTextItem',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'down',
    },
    figureArr: {
      type: Array,
      default: () => ([]),
    },
    height: {
      type: Number,
      default: 40,
    },
    delay: {
      type: Number,
      default: 0,
    },
    isStart: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      utils,
    };
  },
  computed: {
    newFigureArr() {
      return  this.direction === 'down'
        ? this.figureArr.slice().reverse()
        : this.figureArr;
    },
    translatePx() {
      const totalHeight = this.height * (this.figureArr.length - 1);
      return `-${totalHeight}px`;
    },
    itemStyle() {
      return styles({
        lineHeight: addUnit(this.height),
      });
    },
    rootStyle() {
      return styles({
        height: addUnit(this.height),
        '--press-translate': this.translatePx,
        '--press-duration': `${this.duration}s`,
        '--press-delay': `${this.delay}s`,
      });
    },
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
