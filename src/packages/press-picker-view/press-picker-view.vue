<template>
  <div
    class="press-picker-view"
    :class="hasTip ? 'press-picker-view__tip' : ''"
    @mousedown.stop.prevent="mouseDown"
    @mouseup.stop.prevent="mouseUp"
    @touchstart.stop.prevent="handleStart"
    @touchmove.stop.prevent="handleMove"
    @touchend.stop.prevent="handleEnd"
  >
    <div
      ref="dropListMask"
      class="press-picker-view--mask"
    />
    <div
      ref="dropListIndicator"
      class="press-picker-view--indicator"
    />
    <div
      ref="DropListContent"
      class="press-picker-view--content"
      :style="transformStyle"
    >
      <!-- 选中添加类名drop-list-item-active -->
      <div
        v-for="(item, index) in data"
        :id="index"
        :key="index"
        :data-index="index"
        class="press-picker-view--item"
        :class="[index == currentIndex ? 'press-picker-view--item__active':'']"
        @mousedown="itemDown"
        @mousemove="itemMove"
        @mouseup="itemUp"
        @touchstart="itemDown"
        @touchmove="itemMove"
        @touchend="itemUp"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { getRect } from '../common/dom/rect';

function getTouch(e) {
  if (e.changedTouches && e.changedTouches[0]) {
    return e.changedTouches[0];
  }
  if (e.touches && e.touches[0]) {
    return e.touches[0];
  }
  return e;
}

export default {
  props: {
    // 列表数据
    // [{label: '文本', value: '值'}]
    data: {
      type: Array,
      default: () => ([
        {
          label: 'test',
        },
        {
          label: 'test',
        },
        {
          label: 'test',
        },
        {
          label: 'test',
        },
        {
          label: 'test',
        },
        {
          label: 'test',
        },
      ]),
      required: true,
    },
    current: {
      type: Object,
      default: null,
      required: false,
    },
    hasTip: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
      currentIndex: 0, // 当前选中
      currentScroll: 0, // 当前滚动距离
      start: 0, // 滑动的开始位置
      startScroll: 0, // 开始移动时的滚动位置
      move: 0, // 手指滑动距离
      itemHeight: 56, // 一栏的高度
      downX: 0, // item的点下位置x
      downY: 0, // item的点下位置y
      upX: 0, // item的松开位置x
      upY: 0, // item的松开位置y
      lastMove: 0, // 上一次滚动距离，用于计算滑动距离
      lastTime: 0, // 上一次滚动回调时间，用于计算滑动距离
      speed: 0, // 当前滑动速度
      hasClick: false, // 记录是否触发item点击，已触发不走最后的滚动逻辑

      slideLimitNum: 10,
      slideTimeThreshold: 300,
    };
  },
  computed: {
    transformStyle() {
      const res = `transform: translate3d(0, ${this.currentScroll}px, 0);`;
      return res;
    },
    slideLimitDistance() {
      return this.slideLimitNum * this.itemHeight;
    },
  },
  watch: {
    data(newVal) {
      this.updateCurrent();
      return newVal;
    },
    current(newVal) {
      this.updateCurrent();
      return newVal;
    },
    currentIndex: {
      handler(newVal) {
        this.$emit('currentIndexChanged', newVal);
      },
      deep: true,
    },
  },
  created() {
  },
  mounted() {
    getRect(this, '.press-picker-view--item__active').then((rect) => {
      this.itemHeight = rect.height;
      this.updateCurrent();
    });
    this.updateCurrent();

    // #ifdef H5
    document.addEventListener('mouseup', this.mouseUp);
    // #endif
  },
  beforeDestroy() {
    // #ifdef H5
    document.removeEventListener('mouseup', this.mouseUp);
    // #endif
  },
  methods: {
    // 开始点击
    mouseDown(e) {
      document.addEventListener('mousemove', this.mouseMove);
      this.handleStart(e);
    },
    // 鼠标移动
    mouseMove(e) {
      this.handleMove(e);
    },
    // 鼠标松开
    mouseUp() {
      document.removeEventListener('mousemove', this.mouseMove);
      this.handleEnd();
    },
    // 开始
    handleStart(e) {
      // 记录开始点击的位置和当前滚动距离
      const touch = getTouch(e);
      this.start = touch?.clientY;
      this.startScroll = this.currentScroll;
      this.lastMove = 0;
      this.lastTime = new Date().getTime();
    },
    // 移动
    handleMove(e) {
      // 计算滑动距离，更新当前滚动位置，计算当前选中的index
      const touch = getTouch(e);
      this.move = touch?.clientY - this.start;
      let scroll = this.startScroll + this.move;
      scroll = Math.min(0, scroll);
      scroll = Math.max(-(this.data.length - 1) * this.itemHeight, scroll);
      this.currentScroll = scroll;
      const index = Math.round(this.currentScroll / this.itemHeight);
      this.currentIndex = -index;
      this.time = new Date().getTime();
      this.speed = (this.move - this.lastMove) / (this.time - this.lastTime);
      this.lastMove = this.move;
      this.lastTime = this.time;
    },
    // 结束
    handleEnd() {
      if (this.hasClick) {
        this.hasClick = false;
        return;
      }
      let slideDistance = 0;
      // 结束前一小段时间内有速度，需要加上滑动距离
      if (new Date().getTime() - this.lastTime < this.slideTimeThreshold) {
        slideDistance = this.speed * this.slideTimeThreshold / 2;
        slideDistance = Math.min(this.slideLimitDistance, slideDistance);
        slideDistance = Math.max(-this.slideLimitDistance, slideDistance);
      }
      let scroll = this.currentScroll + slideDistance;
      scroll = Math.min(0, scroll);
      scroll = Math.max(-(this.data.length - 1) * this.itemHeight, scroll);
      // 确保最终状态是选中其中一个
      const index = Math.round(scroll / this.itemHeight);
      this.currentScroll = index * this.itemHeight;
      this.currentIndex = -index;
    },
    getCurrentItem() {
      return this.data[this.currentIndex];
    },
    // 更新传入的选中
    updateCurrent() {
      if (this.current) {
        const item = this.data.find(i => i.value == this.current.value);
        this.currentIndex = this.data.indexOf(item);
        this.currentScroll = -this.currentIndex * this.itemHeight;
      }
    },
    itemDown(e) {
      const touch = getTouch(e);
      this.downX = touch?.clientX;
      this.downY = touch?.clientY;
      this.upX = touch?.clientX;
      this.upY = touch?.clientY;
    },
    itemMove(e) {
      const touch = getTouch(e);
      this.upX = touch?.clientX;
      this.upY = touch?.clientY;
    },
    itemUp(e) {
      const distance = this.twoPointDistance(
        { x: this.downX, y: this.downY },
        { x: this.upX, y: this.upY },
      );
      if (distance < 10) {
        this.currentIndex = e.currentTarget.dataset.index;
        this.currentScroll = -this.currentIndex * this.itemHeight;
        this.hasClick = true;
      }
    },
    twoPointDistance(p1, p2) {
      const dep = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
      return dep;
    },
    getElementIndex(element) {
      return parseInt(element.id, 10);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
