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
      <slot>
        <PressIcon
          name="cross"
          :color="styles.iconColor"
          :size="styles.iconFontSize"
          class="press-fab-circle-icon"
          :class="{'press-fab__plus--active': isShow && content.length > 0}"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import { getRect, getWindowWidth } from '../common/dom/rect';
import PressIcon from '../press-icon/press-icon.vue';


export default {
  name: 'PressFab',
  components: {
    PressIcon,
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
      default: 'left',
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

    const switchPos = {
      hasMoved: false, // exclude click event
      x: 0, // right
      y: 0, // bottom
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };

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

      switchPos,
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
    this.switchPos.x = this.btnSwitchPos.x;
    this.switchPos.y = this.btnSwitchPos.y;
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
      const { windowWidth, windowHeight, windowBottom } = getWindowWidth();
      const docWidth = windowWidth;
      const docHeight = windowHeight - top;

      // check edge
      if (x > docWidth - fabSize.width) {
        x = docWidth - fabSize.width;
      }
      // 无需处理 windowTop，因为 windowHeight 已经减去过了
      if (y > docHeight - fabSize.height) {
        y = docHeight - fabSize.height;
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
      this.switchPos.startX = e.touches[0].pageX;
      this.switchPos.startY = e.touches[0].pageY;
    },
    onTouchEnd() {
      if (!this.switchPos.hasMoved) {
        return;
      }
      this.switchPos.startX = 0;
      this.switchPos.startY = 0;
      this.switchPos.hasMoved = false;
      this.setSwitchPosition(this.switchPos.endX, this.switchPos.endY);
    },
    onTouchMove(e) {
      if (e.touches.length <= 0) {
        return;
      }
      const offsetX = e.touches[0].pageX - this.switchPos.startX;
      const offsetY = e.touches[0].pageY - this.switchPos.startY;
      let x = Math.floor(this.switchPos.x - offsetX);
      let y = Math.floor(this.switchPos.y - offsetY);
      [x, y] = this.getSwitchButtonSafeAreaXY(x, y);
      this.btnSwitchPos.x = x;
      this.btnSwitchPos.y = y;
      this.switchPos.endX = x;
      this.switchPos.endY = y;
      this.switchPos.hasMoved = true;
      e.preventDefault();
      e.stopPropagation();
    },
    setSwitchPosition(switchX, switchY) {
      [switchX, switchY] = this.getSwitchButtonSafeAreaXY(switchX, switchY);
      this.switchPos.x = switchX;
      this.switchPos.y = switchY;
      this.btnSwitchPos.x = switchX;
      this.btnSwitchPos.y = switchY;
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
