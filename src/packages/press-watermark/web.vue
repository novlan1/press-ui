<template>
  <div
    class="press-watermark"
    :class="{
      'press-watermark--full': fullPage,
    }"
    :style="computedStyle"
  >
    <div
      ref="svgElRef"
      class="press-watermark__wrapper"
    >
      <svg
        v-if="image && !$slots.content"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        :width="svgWidth"
        :height="svgHeight"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :style="
          styles({
            padding: `0 ${gapX}px ${gapY}px 0`,
            opacity: opacity,
          })
        "
        v-html="imageHtml"
      />

      <svg
        v-else
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        :width="svgWidth"
        :height="svgHeight"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :style="
          styles({
            padding: `0 ${gapX}px ${gapY}px 0`,
            opacity: opacity,
          })
        "
      >
        <foreignObject
          x="0"
          y="0"
          :width="width"
          :height="height"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            :style="rotateStyle"
          >
            <slot name="content">
              <span :style="`color: ${textColor}`">{{ content }}</span>
            </slot>
          </div>
        </foreignObject>
      </svg>
    </div>
  </div>
</template>
<script>
import styles from '../common/utils/style';

import { WATERMARK_PROPS } from './props';
import { makeImageToBase64, makeSvgToBlobUrl } from './utils';

export default {
  name: 'PressWatermarkWeb',
  props: {
    ...WATERMARK_PROPS,
  },
  data() {
    return {
      imageBase64: '',
      watermarkUrl: '',
    };
  },
  computed: {
    computedStyle() {
      return styles({
        backgroundImage: `url(${this.watermarkUrl})`,
        zIndex: this.zIndex,
      });
    },
    rotateStyle() {
      return styles({
        transformOrigin: 'center',
        transform: `rotate(${this.rotate}deg)`,
      });
    },
    svgWidth() {
      return this.width + this.gapX;
    },
    svgHeight() {
      return this.height + this.gapY;
    },
    imageHtml() {
      const { imageBase64, width, height, rotateStyle } = this;
      return `<image
          href="${imageBase64}"
          xlink:href="${imageBase64}"
          x="0"
          y="0"
          width="${width}"
          height="${height}"
          style="${rotateStyle}"
        />`;
    },
  },
  watch: {
    image: {
      handler() {
        makeImageToBase64(this.image).then((res) => {
          this.imageBase64 = res;
        });
      },
      immediate: true,
    },
    imageBase64() {
      setTimeout(() => {
        this.generateWatermarkUrl();
      });
    },
    content: 'generateWatermarkUrl',
    textColor: 'generateWatermarkUrl',
    height: 'generateWatermarkUrl',
    width: 'generateWatermarkUrl',
    rotate: 'generateWatermarkUrl',
    gapX: 'generateWatermarkUrl',
    gapY: 'generateWatermarkUrl',
  },
  mounted() {
    console.log('slots', this.$slots);
    setTimeout(() => {
      this.generateWatermarkUrl();
    });
  },
  methods: {
    styles,
    generateWatermarkUrl()  {
      /**
       * The path is the actual HTML rendered by renderWatermark
       * => convert the SVG string to a blob image
       * => put it in background-image.
       */
      if (this.$refs.svgElRef) {
        this.revokeWatermarkUrl();
        this.watermarkUrl = makeSvgToBlobUrl(this.$refs.svgElRef.innerHTML);
      }
    },
    revokeWatermarkUrl() {
      if (this.watermarkUrl) {
        URL.revokeObjectURL(this.watermarkUrl);
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
