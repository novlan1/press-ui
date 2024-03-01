<template>
  <div class="press-cursor-point">
    <div
      v-if="popMenu && (leftBottom || rightBottom || leftTop || rightTop) && content.length > 0"
      class="press-fab"
      :class="{
        'press-fab--leftBottom': leftBottom,
        'press-fab--rightBottom': rightBottom,
        'press-fab--leftTop': leftTop,
        'press-fab--rightTop': rightTop,
      }"
      :style="{
        right: `${btnSwitchPos.x}px`,
        bottom: `${btnSwitchPos.y}px`
      }"
    >
      <div
        :class="{
          'press-fab__content--left': horizontal === 'left',
          'press-fab__content--right': horizontal === 'right',
          'press-fab__content--flexDirection': direction === 'vertical',
          'press-fab__content--flexDirectionStart': flexDirectionStart,
          'press-fab__content--flexDirectionEnd': flexDirectionEnd,
          'press-fab__content--other-platform': !isAndroidNVue
        }"
        :style="{ width: boxWidth, height: boxHeight, backgroundColor: styles.backgroundColor }"
        class="press-fab__content"
        elevation="5"
      >
        <div
          v-if="flexDirectionStart || horizontalLeft"
          class="press-fab__item press-fab__item--first"
        />
        <div
          v-for="(item, index) in content"
          :key="index"
          :class="{ 'press-fab__item--active': isShow }"
          class="press-fab__item"
          @click="onItemClick(index, item)"
        >
          <img
            :src="item.active ? item.selectedIconPath : item.iconPath"
            class="press-fab__item-image"
            mode="aspectFit"
          >
          <span
            class="press-fab__item-text"
            :style="{ color: item.active ? styles.selectedColor : styles.color }"
          >
            {{ item.text }}
          </span>
        </div>
        <div
          v-if="flexDirectionEnd || horizontalRight"
          class="press-fab__item press-fab__item--first"
        />
      </div>
    </div>
    <div
      :class="{
        'press-fab__content--other-platform': !isAndroidNVue
      }"
      class="press-fab__circle press-fab__plus"
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
        :size="styles.iconFontSize"
        class="press-fab-circle-icon"
        :class="{'press-fab__plus--active': isShow && content.length > 0}"
      />
    </div>
  </div>
</template>

<script>
import { getRect, getWindowWidth } from '../common/dom/rect';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';


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
    bottomThreshold: {
      type: Number,
      default: 20,
    },
    initX: {
      type: Number,
      default: 12,
    },
    initY: {
      type: Number,
      default: 62,
    },
  },
  emits: ['fabClick', 'trigger'],
  data() {
    let platform = 'other';
    // #ifdef APP-NVUE
    platform = uni.getSystemInfoSync().platform;
    // #endif

    return {
      fabShow: false,
      isShow: false,
      isAndroidNVue: platform === 'android',
      styles: {
        color: '#3c3e49',
        selectedColor: '#007AFF',
        backgroundColor: '#fff',
        buttonColor: '#007AFF',
        iconColor: '#fff',
        iconFontSize: 32,
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
      x: this.initX,
      y: this.initY,
    };
    switchPos.x = this.btnSwitchPos.x;
    switchPos.y = this.btnSwitchPos.y;
    // }
  },
  mounted() {
    getRect(this, '.press-fab__plus').then((rect) => {
      this.fabSize.width = rect.width;
      this.fabSize.height = rect.height;
    });
  },
  methods: {
    getSwitchButtonSafeAreaXY(x, y) {
      const { fabSize, top, bottomThreshold } = this;
      const { windowWidth, windowHeight, windowTop, windowBottom } = getWindowWidth();
      const docWidth = windowWidth;
      const docHeight = windowHeight - top;

      // check edge
      if (x + fabSize.width > docWidth) {
        x = docWidth - fabSize.width;
      }
      if (y + fabSize.height - windowTop > docHeight) {
        y = docHeight - fabSize.height + windowTop;
      }

      if (x < 0) {
        x = 0;
      }
      if (y < bottomThreshold + windowBottom) {
        y = bottomThreshold + windowBottom;
      }
      // safe area for iOS Home indicator
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

<style lang="scss" scoped>
$press-shadow-base: 0 1px 5px 2px
  rgba(
    $color: #000000,
    $alpha: 0.3,
  ) !default;

.press-cursor-point {
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.press-fab {
  position: fixed;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 45px;
  box-shadow: $press-shadow-base;

  &--active {
    opacity: 1;
  }

  &--leftBottom {
    left: 15px;
    bottom: 30px;
    /* #ifdef H5 */
    left: calc(15px + var(--window-left));
    bottom: calc(30px + var(--window-bottom));
    /* #endif */
    // padding: 10px;
  }

  &--leftTop {
    left: 15px;
    top: 30px;
    /* #ifdef H5 */
    left: calc(15px + var(--window-left));
    top: calc(30px + var(--window-top));
    /* #endif */
    // padding: 10px;
  }

  &--rightBottom {
    right: 15px;
    bottom: 30px;
    /* #ifdef H5 */
    right: calc(15px + var(--window-right));
    bottom: calc(30px + var(--window-bottom));
    /* #endif */
    // padding: 10px;
  }

  &--rightTop {
    right: 15px;
    top: 30px;
    /* #ifdef H5 */
    right: calc(15px + var(--window-right));
    top: calc(30px + var(--window-top));
    /* #endif */
    // padding: 10px;
  }

  &__circle {
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
    // box-shadow: $press-shadow-base;

    &--leftBottom {
      left: 15px;
      bottom: 30px;
      /* #ifdef H5 */
      left: calc(15px + var(--window-left));
      bottom: calc(30px + var(--window-bottom));
      /* #endif */
    }

    &--leftTop {
      left: 15px;
      top: 30px;
      /* #ifdef H5 */
      left: calc(15px + var(--window-left));
      top: calc(30px + var(--window-top));
      /* #endif */
    }

    &--rightBottom {
      right: 15px;
      bottom: 30px;
      /* #ifdef H5 */
      right: calc(15px + var(--window-right));
      bottom: calc(30px + var(--window-bottom));
      /* #endif */
    }

    &--rightTop {
      right: 15px;
      top: 30px;
      /* #ifdef H5 */
      right: calc(15px + var(--window-right));
      top: calc(30px + var(--window-top));
      /* #endif */
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
    }
  }

  &__plus {
    font-weight: bold;

    &--active {
      transform: rotate(135deg);
    }
  }

  .press-fab-circle-icon {
    transform: rotate(0deg);
    transition: transform 0.3s;
    font-weight: 200;
  }

  &__content {
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

    &--other-platform {
      border-width: 0px;
      box-shadow: $press-shadow-base;
    }

    &--left {
      justify-content: flex-start;
    }

    &--right {
      justify-content: flex-end;
    }

    &--flexDirection {
      flex-direction: column;
      justify-content: flex-end;
    }

    &--flexDirectionStart {
      flex-direction: column;
      justify-content: flex-start;
    }

    &--flexDirectionEnd {
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  &__item {
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

    &--active {
      opacity: 1;
    }

    &-image {
      width: 20px;
      height: 20px;
      margin-bottom: 4px;
    }

    &-text {
      color: #ffffff;
      font-size: 12px;
      line-height: 12px;
      margin-top: 2px;
    }

    &--first {
      width: 55px;
    }
  }
}
</style>
