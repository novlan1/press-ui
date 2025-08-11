<template>
  <view
    id="wrap"
    class="press-watermark"
    :style="[{'opacity':opacity, 'z-index': zIndex}]"
    :class="{
      'press-watermark--full': fullPage,
    }"
  >
    <view
      id="mode"
      ref="mode"
      class="press-watermark__mode"
    >
      <rich-text :nodes="computedWatermark" />
    </view>
    <view class="press-watermark__content">
      <view
        v-for="(item, index) in forLength"
        :key="index"
        class="press-watermark__text"
        :style="watermarkStyle"
      >
        <rich-text :nodes="computedWatermark" />
      </view>
    </view>
  </view>
</template>

<script>
import { getRect } from '../common/dom/rect';
import { addUnit } from '../common/utils/add-unit';
import styles from '../common/utils/style';

import { WATERMARK_PROPS } from './props';


export default {
  name: 'PressWatermarkUni',
  props: {
    ...WATERMARK_PROPS,
    watermark: { // 水印文字(支持html富文本)
      type: String,
      default: '',
    },
  },
  data() {
    return {
      forLength: 0, // 水印数量

      timer: null,
    };
  },
  computed: {
    computedWatermark() {
      const { content, image, watermark, width, gapX } = this;
      if (content) {
        return `<p>${content}</p>`;
      }
      if (image) {
        return `<img src="${image}" style="width: ${addUnit(width + gapX)};"></img>`;
      }
      return watermark;
    },
    watermarkStyle() {
      const { width, height, gapX, gapY, rotate, textColor } = this;
      return styles({
        width: addUnit(width + gapX),
        height: addUnit(height + gapY),
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
        color: textColor,
        margin: `0 ${gapX}px ${gapY}px 0`,
      });
    },
  },
  watch: {
    fullPage: 'getWatermarkLength',
  },
  mounted() {
    this.getWatermarkLength();
  },
  methods: {
    getWatermarkLength() {
      let wrapRect = {};
      let watermarkRect = {};

      Promise.all([
        getRect(this, '#wrap'),
      ]).then(([wrapRectInfo]) => {
        wrapRect = {
          height: wrapRectInfo.height,
          width: wrapRectInfo.width,
        };
        watermarkRect = {
          height: this.height + this.gapY,
          width: this.width + this.gapX,
        };
      });

      this.timer = setInterval(() => {
        if (wrapRect.height && wrapRect.width) {
          clearInterval(this.timer);
          this.forLength = Math.floor(wrapRect.width / watermarkRect.width)
            * Math.floor(wrapRect.height / watermarkRect.height);
        }
      }, 500);
    },
  },
};
</script>
<style scoped lang="scss" src="./css/uni.scss">

</style>
