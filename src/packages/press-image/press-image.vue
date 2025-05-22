<template>
  <PressTransition
    mode="fade"
    :show="show"
    :duration="fade ? durationTime : 0"
    :custom-style="`display: inline-block;${transitionStyle}`"
  >
    <div
      class="press-image"
      :style="wrapStyle"
      @click.stop="onClick"
    >
      <template v-if="!isError">
        <!-- #ifdef H5 -->
        <InnerImage
          v-if="isNotInUni"
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
        <!-- #endif -->

        <image
          v-if="!isNotInUni"
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
      </template>


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
import { getVirtualHostOptions } from '../common/component-handler/press-component';
import { addUnit } from '../common/utils/add-unit';
import styleUtil from '../common/utils/style';
import { isNotInUni } from '../common/utils/utils';

// #ifdef H5
import InnerImage from '../image/index.vue';
// #endif
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressTransition from '../press-transition/press-transition.vue';

import props from './computed';


export default {
  name: 'PressImage',
  options: {
    ...getVirtualHostOptions(true, false),
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressTransition,
    // #ifdef H5
    InnerImage,
    // #endif
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

      isNotInUni: isNotInUni(),
    };
  },
  computed: {
    wrapStyle() {
      const style = {};
      style.width = addUnit(this.width);
      style.height = addUnit(this.height);

      // 如果是显示圆形，设置一个很多的半径值即可
      style.borderRadius = this.round ? '10000px' : addUnit(this.radius);

      // 如果设置圆角，必须要有 hidden，否则可能圆角无效
      style.overflow = this.radius > 0 ? 'hidden' : 'visible';

      const res = styleUtil([
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

<style lang="scss" scoped src="./css/index.scss">
</style>
