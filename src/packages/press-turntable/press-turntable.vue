<template>
  <div
    class="press-turntable"
    :class="customClass"
    :style="customStyle"
  >
    <div class="press-turntable__center">
      <p
        class="press-turntable__arrow"
        :style="rotateStyle"
      />
      <p
        class="press-turntable__button"
        @click.stop="startRotation"
      >
        抽奖
      </p>
      <p class="press-turntable__tip">
        剩余<span>{{ number }}</span>次
      </p>
    </div>
    <ul class="press-turntable__list">
      <li
        v-for="(item, index) of list"
        :key="index"
        class="press-turntable__prize"
        :class="[`press-turntable__prize-num${index+1}`]"
      >
        <img
          v-if="item.img"
          :src="item.img"
          class="press-turntable__prize__img"
        >
        <p
          v-if="item.name"
          class="press-turntable__prize__name"
        >
          {{ item.name }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import { getRotateAngle } from '../common/turntable/turntable';


export default {
  name: 'PressTurntable',
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    number: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prizeIndex: {
      type: Number,
      default: 0,
    },
    // homing: {
    //   type: Boolean,
    //   default: false,
    // },
    startAngle: {
      type: Number,
      default: 0,
    },
    laps: {
      type: Number,
      default: 3,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    customStyle: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerStartAngle: this.startAngle,
      rotateTransition: '',
      isLocking: false,
    };
  },
  computed: {
    prizeTotal() {
      return this.list.length;
    },
    rotateAngle() {
      return `rotate(${this.innerStartAngle}deg)`;
    },
    rotateStyle() {
      const { rotateTransition, rotateAngle } = this;
      return `transition: ${rotateTransition};transform: ${rotateAngle};`;
    },
  },
  watch: {
    startAngle: {
      handler(value) {
        this.innerStartAngle = value;
      },
    },
  },
  mounted() {
  },
  methods: {
    startRotation() {
      if (!this.canBeRotated()) {
        return false;
      }
      this.isLocking = true;
      this.rotate(this.prizeIndex);
      this.$emit('start');
    },
    // 已经转动完转盘触发的函数
    endRotation() {
      // 提示显示中奖弹框
      this.isLocking = false;
    },
    // 判断是否可以转动
    canBeRotated() {
      if (this.disabled || this.isLocking) {
        return false;
      }
      return true;
    },
    // 转动起来
    rotate(index) {
      const { duration } = this;
      const rotateAngle = getRotateAngle({
        prizeIndex: index,
        prizeTotal: this.prizeTotal,
        innerStartAngle: this.innerStartAngle,
      });

      this.innerStartAngle = rotateAngle;
      this.rotateTransition = `transform ${duration / 1000}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;

      setTimeout(() => {
        // if (this.homing) {
        //   this.innerStartAngle = 0;
        // }

        this.rotateTransition = 'transform 0s cubic-bezier(0.250, 0.460, 0.455, 0.995)';
        this.endRotation();
        this.$emit('end');
      }, duration);
    },
  },

};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
