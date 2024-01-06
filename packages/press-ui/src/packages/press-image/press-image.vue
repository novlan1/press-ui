<template>
  <PressTransition
    mode="fade"
    :show="show"
    :duration="fade ? durationTime : 0"
    custom-style="display: inline-block;"
  >
    <div
      class="press-image"
      :style="wrapStyle"
      @click.stop="onClick"
    >
      <image
        v-if="!isError"
        :src="src"
        :mode="mode"
        :show-menu-by-longpress="showMenuByLongpress"
        :lazy-load="lazyLoad"
        class="press-image__image"
        :style="{
          borderRadius: round ? '10000px' : addUnit(radius),
          width: addUnit(width),
          height: addUnit(height)
        }"
        @error="onErrorHandler"
        @load="onLoadHandler"
      />

      <div
        v-if="showLoading && loading"
        class="press-image__loading"
        :style="{
          borderRadius: round ? '50%' : addUnit(radius),
          backgroundColor: backgroundColor,
          width: addUnit(width),
          height: addUnit(height)
        }"
      >
        <slot name="loading">
          <PressIconPlus
            :name="loadingIcon"
            :width="width"
            :height="height"
          />
        </slot>
      </div>
      <div
        v-if="showError && isError && !loading"
        class="press-image__error"
        :style="{
          borderRadius: round? '50%' : addUnit(radius),
          width: addUnit(width),
          height: addUnit(height)
        }"
      >
        <slot name="error">
          <PressIconPlus
            :name="errorIcon"
            :width="width"
            :height="height"
          />
        </slot>
      </div>
    </div>
  </PressTransition>
</template>

<script>
import props from './computed';
import { addUnit } from '../common/utils/add-unit';
import styleUtil from '../common/utils/style';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressTransition from '../press-transition/press-transition.vue';


export default {
  name: 'PressImage',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressTransition,
  },
  mixins: [props],
  emits: [
    'click',
    'error',
    'load',
  ],
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {},
      // 用于fade模式的控制组件显示与否
      show: false,
    };
  },
  computed: {
    wrapStyle() {
      const style = {};
      // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
      style.width = addUnit(this.width);
      style.height = addUnit(this.height);

      // 如果是显示圆形，设置一个很多的半径值即可
      style.borderRadius = this.round ? '10000px' : addUnit(this.radius);

      // 如果设置圆角，必须要有hidden，否则可能圆角无效
      style.overflow = this.borderRadius > 0 ? 'hidden' : 'visible';
      // if (this.fade) {
      // 	style.opacity = this.opacity
      // 	// nvue下，这几个属性必须要分开写
      // 	style.transitionDuration = `${this.durationTime}ms`
      // 	style.transitionTimingFunction = 'ease-in-out'
      // 	style.transitionProperty = 'opacity'
      // }

      const res =  styleUtil([
        {
          ...style,
          ...this.backgroundStyle,
        },
        this.customStyle,
      ]);

      return res;
    },
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          // 如果传入null或者''，或者false，或者undefined，标记为错误状态
          this.isError = true;
        } else {
          this.isError = false;
          this.loading = true;
        }
      },
    },
  },
  mounted() {
    this.show = true;
  },
  methods: {
    addUnit,
    // 点击图片
    onClick() {
      this.$emit('click');
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit('error', err);
    },
    // 图片加载完成，标记loading结束
    onLoadHandler(event) {
      this.loading = false;
      this.isError = false;
      this.$emit('load', event);
      this.removeBgColor();
    },
    // 移除图片的背景色
    removeBgColor() {
      // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
      this.backgroundStyle = {
        backgroundColor: 'transparent',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "../../libs/css/components.scss";

$press-image-error-top: 0px !default;
$press-image-error-left: 0px !default;
$press-image-error-width: 100% !default;
$press-image-error-hight: 100% !default;
$press-image-error-background-color: #f3f4f6 !default;
$press-image-error-color: #909193 !default;
$press-image-error-font-size: 46rpx !default;

.press-image {
  position: relative;
  transition: opacity 0.5s ease-in-out;

  &__image {
    width: 100%;
    height: 100%;
  }

  &__loading,
  &__error {
    position: absolute;
    top: $press-image-error-top;
    left: $press-image-error-left;
    width: $press-image-error-width;
    height: $press-image-error-hight;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $press-image-error-background-color;
    color: $press-image-error-color;
    font-size: $press-image-error-font-size;
  }
}
</style>
