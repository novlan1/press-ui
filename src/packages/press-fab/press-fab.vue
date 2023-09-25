<template>
  <div class="uni-cursor-point">
    <div
      v-if="popMenu && (leftBottom || rightBottom || leftTop || rightTop) && content.length > 0"
      class="uni-fab"
      :style="{
        right: `${btnSwitchPos.x}px`,
        bottom: `${btnSwitchPos.y}px`
      }"
    >
      <div
        :class="{
          'uni-fab__content--left': horizontal === 'left',
          'uni-fab__content--right': horizontal === 'right',
          'uni-fab__content--flexDirection': direction === 'vertical',
          'uni-fab__content--flexDirectionStart': flexDirectionStart,
          'uni-fab__content--flexDirectionEnd': flexDirectionEnd,
          'uni-fab__content--other-platform': !isAndroidNvue
        }"
        :style="{ width: boxWidth, height: boxHeight, backgroundColor: styles.backgroundColor }"
        class="uni-fab__content"
        elevation="5"
      >
        <div
          v-if="flexDirectionStart || horizontalLeft"
          class="uni-fab__item uni-fab__item--first"
        />
        <div
          v-for="(item, index) in content"
          :key="index"
          :class="{ 'uni-fab__item--active': isShow }"
          class="uni-fab__item"
          @click="onItemClick(index, item)"
        >
          <img
            :src="item.active ? item.selectedIconPath : item.iconPath"
            class="uni-fab__item-image"
            mode="aspectFit"
          >
          <span
            class="uni-fab__item-text"
            :style="{ color: item.active ? styles.selectedColor : styles.color }"
          >
            {{ item.text }}
          </span>
        </div>
        <div
          v-if="flexDirectionEnd || horizontalRight"
          class="uni-fab__item uni-fab__item--first"
        />
      </div>
    </div>
    <div
      :class="{
        'uni-fab__content--other-platform': !isAndroidNvue
      }"
      class="uni-fab__circle uni-fab__plus"
      :style="{ 'background-color': styles.buttonColor,
                right: `${btnSwitchPos.x}px`,
                bottom: `${btnSwitchPos.y}px`
      }"
      @click="onClick"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @touchmove.stop.prevent="onTouchMove"
    >
      <press-icon-plus
        name="cross"
        :color="styles.iconColor"
        size="32"
        class="fab-circle-icon"
        :class="{'uni-fab__plus--active': isShow && content.length > 0}"
      />
    </div>
  </div>
</template>

<script>
import { getRect, getWindowWidth } from '../common/dom/rect';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

let platform = 'other';
// #ifdef APP-NVUE
platform = uni.getSystemInfoSync().platform;
// #endif

const switchPos = {
  hasMoved: false, // exclude click event
  x: 0, // right
  y: 0, // bottom
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};


export default {
  name: 'PressFab',
  components: {
    PressIconPlus,
  },
  props: {
    pattern: {
      type: Object,
      default() {
        return {};
      },
    },
    horizontal: {
      type: String,
      default: 'right',
    },
    vertical: {
      type: String,
      default: 'bottom',
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    content: {
      type: Array,
      default() {
        return [];
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
    popMenu: {
      type: Boolean,
      default: true,
    },
    top: {
      type: Number,
      default: 0,
    },
  },
  emits: ['fabClick', 'trigger'],
  data() {
    return {
      fabShow: false,
      isShow: false,
      isAndroidNvue: platform === 'android',
      styles: {
        color: '#3c3e49',
        selectedColor: '#007AFF',
        backgroundColor: '#fff',
        buttonColor: '#007AFF',
        iconColor: '#fff',
      },

      btnSwitchPos: { x: 0, y: 0 },
      fabSize: { width: 55, height: 55 },
    };
  },
  computed: {
    contentWidth() {
      return `${(this.content.length + 1) * 55 + 15}px`;
    },
    contentWidthMin() {
      return '55px';
    },
    // 动态计算宽度
    boxWidth() {
      return this.getPosition(3, 'horizontal');
    },
    // 动态计算高度
    boxHeight() {
      return this.getPosition(3, 'vertical');
    },
    // 计算左下位置
    leftBottom() {
      // return false;
      return this.getPosition(0, 'left', 'bottom');
    },
    // 计算右下位置
    rightBottom() {
      // return true;
      return this.getPosition(0, 'right', 'bottom');
    },
    // 计算左上位置
    leftTop() {
      // return false;
      return this.getPosition(0, 'left', 'top');
    },
    rightTop() {
      // return false;
      return this.getPosition(0, 'right', 'top');
    },
    flexDirectionStart() {
      // return false;
      return this.getPosition(1, 'vertical', 'top');
    },
    flexDirectionEnd() {
      // return true;
      return this.getPosition(1, 'vertical', 'bottom');
    },
    horizontalLeft() {
      // return false;
      return this.getPosition(2, 'horizontal', 'left');
    },
    horizontalRight() {
      // return true;
      return this.getPosition(2, 'horizontal', 'right');
    },
  },
  watch: {
    pattern: {
      handler(val) {
        this.styles = Object.assign({}, this.styles, val);
      },
      deep: true,
    },
  },
  created() {
    this.isShow = this.show;
    if (this.top === 0) {
      this.fabShow = true;
    }
    // 初始化样式
    this.styles = Object.assign({}, this.styles, this.pattern);
    // if (this.rightBottom) {
    this.btnSwitchPos = {
      x: 15,
      y: 30,
    };
    switchPos.x = this.btnSwitchPos.x;
    switchPos.y = this.btnSwitchPos.y;
    // }
  },
  mounted() {
    getRect(this, '.uni-fab__plus').then((rect) => {
      this.fabSize.width = rect.width;
      this.fabSize.height = rect.height;
    });
  },
  methods: {
    getSwitchButtonSafeAreaXY(x, y) {
      const { fabSize, top } = this;
      const { windowWidth, windowHeight } = getWindowWidth();
      const docWidth = windowWidth;
      const docHeight = windowHeight - top;
      // check edge
      if (x + fabSize.width > docWidth) {
        x = docWidth - fabSize.width;
      }
      if (y + fabSize.height > docHeight) {
        y = docHeight - fabSize.height;
      }
      if (x < 0) {
        x = 0;
      }
      if (y < 20) {
        y = 20;
      } // safe area for iOS Home indicator
      return [x, y];
    },
    onClick() {
      this.$emit('fabClick');
      if (!this.popMenu) {
        return;
      }
      this.isShow = !this.isShow;
    },
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    /**
     * 按钮点击事件
     */
    onItemClick(index, item) {
      if (!this.isShow) {
        return;
      }
      this.$emit('trigger', {
        index,
        item,
      });
    },
    /**
     * 获取 位置信息
     */
    getPosition(types, paramA, paramB) {
      if (types === 0) {
        return this.horizontal === paramA && this.vertical === paramB;
      } if (types === 1) {
        return this.direction === paramA && this.vertical === paramB;
      } if (types === 2) {
        return this.direction === paramA && this.horizontal === paramB;
      }
      return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
    },

    onTouchStart(e) {
      switchPos.startX = e.touches[0].pageX;
      switchPos.startY = e.touches[0].pageY;
    },
    onTouchEnd() {
      if (!switchPos.hasMoved) {
        return;
      }
      switchPos.startX = 0;
      switchPos.startY = 0;
      switchPos.hasMoved = false;
      this.setSwitchPosition(switchPos.endX, switchPos.endY);
    },
    onTouchMove(e) {
      if (e.touches.length <= 0) {
        return;
      }
      const offsetX = e.touches[0].pageX - switchPos.startX;
      const offsetY = e.touches[0].pageY - switchPos.startY;
      let x = Math.floor(switchPos.x - offsetX);
      let y = Math.floor(switchPos.y - offsetY);
      [x, y] = this.getSwitchButtonSafeAreaXY(x, y);
      this.btnSwitchPos.x = x;
      this.btnSwitchPos.y = y;
      switchPos.endX = x;
      switchPos.endY = y;
      switchPos.hasMoved = true;
      e.preventDefault();
      e.stopPropagation();
    },
    setSwitchPosition(switchX, switchY) {
      [switchX, switchY] = this.getSwitchButtonSafeAreaXY(switchX, switchY);
      switchPos.x = switchX;
      switchPos.y = switchY;
      this.btnSwitchPos.x = switchX;
      this.btnSwitchPos.y = switchY;
    },
  },
};
</script>

<style lang="scss">
$uni-shadow-base: 0 1px 5px 2px
  rgba(
    $color: #000000,
    $alpha: 0.3,
  ) !default;

.uni-fab {
  position: fixed;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 45px;
  box-shadow: $uni-shadow-base;
}

.uni-cursor-point {
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.uni-fab--active {
  opacity: 1;
}

.uni-fab--leftBottom {
  left: 15px;
  bottom: 30px;
  /* #ifdef H5 */
  left: calc(15px + var(--window-left));
  bottom: calc(30px + var(--window-bottom));
  /* #endif */
  // padding: 10px;
}

.uni-fab--leftTop {
  left: 15px;
  top: 30px;
  /* #ifdef H5 */
  left: calc(15px + var(--window-left));
  top: calc(30px + var(--window-top));
  /* #endif */
  // padding: 10px;
}

.uni-fab--rightBottom {
  right: 15px;
  bottom: 30px;
  /* #ifdef H5 */
  right: calc(15px + var(--window-right));
  bottom: calc(30px + var(--window-bottom));
  /* #endif */
  // padding: 10px;
}

.uni-fab--rightTop {
  right: 15px;
  top: 30px;
  /* #ifdef H5 */
  right: calc(15px + var(--window-right));
  top: calc(30px + var(--window-top));
  /* #endif */
  // padding: 10px;
}

.uni-fab__circle {
  position: fixed;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  background-color: #3c3e49;
  border-radius: 45px;
  z-index: 11;
  // box-shadow: $uni-shadow-base;
}

.uni-fab__circle--leftBottom {
  left: 15px;
  bottom: 30px;
  /* #ifdef H5 */
  left: calc(15px + var(--window-left));
  bottom: calc(30px + var(--window-bottom));
  /* #endif */
}

.uni-fab__circle--leftTop {
  left: 15px;
  top: 30px;
  /* #ifdef H5 */
  left: calc(15px + var(--window-left));
  top: calc(30px + var(--window-top));
  /* #endif */
}

.uni-fab__circle--rightBottom {
  right: 15px;
  bottom: 30px;
  /* #ifdef H5 */
  right: calc(15px + var(--window-right));
  bottom: calc(30px + var(--window-bottom));
  /* #endif */
}

.uni-fab__circle--rightTop {
  right: 15px;
  top: 30px;
  /* #ifdef H5 */
  right: calc(15px + var(--window-right));
  top: calc(30px + var(--window-top));
  /* #endif */
}

.uni-fab__circle--left {
  left: 0;
}

.uni-fab__circle--right {
  right: 0;
}

.uni-fab__circle--top {
  top: 0;
}

.uni-fab__circle--bottom {
  bottom: 0;
}

.uni-fab__plus {
  font-weight: bold;
}

// .fab-circle-v {
// 	position: absolute;
// 	width: 2px;
// 	height: 24px;
// 	left: 0;
// 	top: 0;
// 	right: 0;
// 	bottom: 0;
// 	/* #ifndef APP-NVUE */
// 	margin: auto;
// 	/* #endif */
// 	background-color: white;
// 	transform: rotate(0deg);
// 	transition: transform 0.3s;
// }

// .fab-circle-h {
// 	position: absolute;
// 	width: 24px;
// 	height: 2px;
// 	left: 0;
// 	top: 0;
// 	right: 0;
// 	bottom: 0;
// 	/* #ifndef APP-NVUE */
// 	margin: auto;
// 	/* #endif */
// 	background-color: white;
// 	transform: rotate(0deg);
// 	transition: transform 0.3s;
// }

.fab-circle-icon {
  transform: rotate(0deg);
  transition: transform 0.3s;
  font-weight: 200;
}

.uni-fab__plus--active {
  transform: rotate(135deg);
}

.uni-fab__content {
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  display: flex;
  /* #endif */
  flex-direction: row;
  border-radius: 55px;
  overflow: hidden;
  transition-property: width, height;
  transition-duration: 0.2s;
  width: 55px;
  border-color: #dddddd;
  border-width: 1rpx;
  border-style: solid;
}

.uni-fab__content--other-platform {
  border-width: 0px;
  box-shadow: $uni-shadow-base;
}

.uni-fab__content--left {
  justify-content: flex-start;
}

.uni-fab__content--right {
  justify-content: flex-end;
}

.uni-fab__content--flexDirection {
  flex-direction: column;
  justify-content: flex-end;
}

.uni-fab__content--flexDirectionStart {
  flex-direction: column;
  justify-content: flex-start;
}

.uni-fab__content--flexDirectionEnd {
  flex-direction: column;
  justify-content: flex-end;
}

.uni-fab__item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  opacity: 0;
  transition: opacity 0.2s;
}

.uni-fab__item--active {
  opacity: 1;
}

.uni-fab__item-image {
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
}

.uni-fab__item-text {
  color: #ffffff;
  font-size: 12px;
  line-height: 12px;
  margin-top: 2px;
}

.uni-fab__item--first {
  width: 55px;
}
</style>
