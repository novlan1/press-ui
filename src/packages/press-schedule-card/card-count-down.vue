<template>
  <!-- 倒计时 -->
  <div>
    <press-count-down
      v-if="showUnit"
      use-slot
      :time="countdownTime"
      @change="onChange"
      @finish="finish"
    >
      <div class="press-card-count-down">
        <template v-if="isContainDays">
          <div class="press-card-count-down__bundle">
            <p class="press-card-count-down__bundle-top">
              <span class="press-card-count-down__num">{{
                timeData.days < 10 ? `0${timeData.days}` : timeData.days
              }}</span>
            </p>
            <em class="press-card-count-down__unit">天</em>
          </div>
          <div class="press-card-count-down__colon" />
        </template>

        <div class="press-card-count-down__bundle">
          <p class="press-card-count-down__bundle-top">
            <span class="press-card-count-down__num">{{
              timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours
            }}</span>
          </p>
          <em class="press-card-count-down__unit">时</em>
        </div>
        <div class="press-card-count-down__colon" />

        <div class="press-card-count-down__bundle">
          <p class="press-card-count-down__bundle-top">
            <span class="press-card-count-down__num">{{
              timeData.minutes < 10
                ? `0${timeData.minutes}`
                : timeData.minutes
            }}</span>
          </p>
          <em class="press-card-count-down__unit">分</em>
        </div>
        <div class="press-card-count-down__colon" />
        <div class="press-card-count-down__bundle">
          <p class="press-card-count-down__bundle-top">
            <span class="press-card-count-down__num">{{
              timeData.seconds < 10
                ? `0${timeData.seconds}`
                : timeData.seconds
            }}</span>
          </p>
          <em class="press-card-count-down__unit">秒</em>
        </div>
      </div>
    </press-count-down>

    <press-count-down
      v-else
      use-slot
      :time="countdownTime"
      @change="onChange"
      @finish="finish"
    >
      <div class="press-card-count-down-simple">
        <div class="press-card-count-down-simple__wrap">
          <template v-if="isContainDays">
            <p class="press-card-count-down-simple__box">
              <span class="press-card-count-down-simple__num">{{
                timeData.days < 10 ? `0${timeData.days}` : timeData.days
              }}</span>
            </p>
            <div class="press-card-count-down-simple__colon" />
          </template>

          <p class="press-card-count-down-simple__box">
            <span class="press-card-count-down-simple__num">{{
              timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours
            }}</span>
          </p>
          <div class="press-card-count-down-simple__colon" />

          <p class="press-card-count-down-simple__box">
            <span class="press-card-count-down-simple__num">{{
              timeData.minutes < 10
                ? `0${timeData.minutes}`
                : timeData.minutes
            }}</span>
          </p>
          <div class="press-card-count-down-simple__colon" />

          <p class="press-card-count-down-simple__box">
            <span class="press-card-count-down-simple__num">{{
              timeData.seconds < 10
                ? `0${timeData.seconds}`
                : timeData.seconds
            }}</span>
          </p>
        </div>
      </div>
    </press-count-down>
  </div>
</template>

<script>
import PressCountDown from '../press-count-down/press-count-down';

export default {
  name: 'PressScheduleCardCountDown',
  components: {
    PressCountDown,
  },
  props: {
    countdownTime: {
      type: Number,
      default: 0,
      required: true,
    },
    forceShowDay: {
      type: Boolean,
      default: false,
    },
    showUnit: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'change',
    'finish',
  ],
  data() {
    return {
      timeData: {},
    };
  },
  computed: {
    isContainDays() {
      if (this.forceShowDay) return true;

      return this.countdownTime > 24 * 60 * 60 * 1000;
    },
  },
  methods: {
    onChange(val) {
      this.timeData = val;
      this.$emit('change', val);
    },
    finish() {
      // 如果一开始传入的就是 0，则不触发
      if (this.countdownTime <= 0) return;
      this.$emit('finish');
    },
  },
};
</script>

<style lang="scss" scoped src="./css/card-count-down.scss"></style>
