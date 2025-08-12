<template>
  <div class="demo-wrap">
    <demo-block :title="t('textWatermark')">
      <div class="demo-watermark-wrapper">
        <PressWatermark
          content="Press"
          :full-page="false"
        />
      </div>
    </demo-block>

    <demo-block :title="t('imageWatermark')">
      <div class="demo-watermark-wrapper">
        <PressWatermark
          :image="image"
          opacity="0.2"
          :full-page="false"
        />
      </div>
    </demo-block>

    <demo-block :title="t('customGap')">
      <div class="demo-watermark-wrapper">
        <PressWatermark
          :image="image"
          :gap-x="30"
          :gap-y="10"
          opacity="0.2"
          :full-page="false"
        />
      </div>
    </demo-block>

    <demo-block :title="t('customRotate')">
      <div class="demo-watermark-wrapper">
        <PressWatermark
          :image="image"
          rotate="22"
          opacity="0.2"
          :full-page="false"
        />
      </div>
    </demo-block>

    <demo-block :title="t('displayRange')">
      <div class="demo-watermark-wrapper">
        <PressButton
          type="primary"
          @click="fullPage = !fullPage"
        >
          {{ t('switch') }}
        </PressButton>
        <PressWatermark
          :full-page="fullPage"
          opacity="0.2"
          :image="image"
        />
      </div>
    </demo-block>

    <demo-block :title="t('htmlWatermark')">
      <div class="demo-watermark-wrapper">
        <PressWatermark
          :width="150"
          :full-page="false"
          :watermark="watermark"
        >
          <template #content>
            <div
              style="background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);"
            >
              <p style="mix-blend-mode: difference; color: #fff">
                Press watermark
              </p>
            </div>
          </template>
        </PressWatermark>
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressWatermark from 'press-ui/press-watermark/press-watermark.vue';


export default {
  i18n: {
    'zh-CN': {
      switch: '切换',
      customOpacity: '自定义透明度',
      customGap: '自定义间隔',
      customImage: '自定义图片',
      customRotate: '自定义倾斜角度',
      displayRange: '显示范围',
      htmlWatermark: 'HTML 水印',
      textWatermark: '文字水印',
      imageWatermark: '图片水印',
    },
    'en-US': {
      switch: 'Switch',
      customOpacity: 'Custom opacity',
      customGap: 'Custom Gap',
      customRotate: 'Custom Rotate',
      displayRange: 'Display Range',
      htmlWatermark: 'HTML Watermark',
      textWatermark: 'Text Watermark',
      imageWatermark: 'Image Watermark',
    },
  },
  components: {
    PressWatermark,
    PressButton,
  },
  data() {
    return {
      fullPage: false,
      image: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png',
      watermark: `<div
              style="background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);"
            >
              <p style="mix-blend-mode: difference; color: #fff">
                Press watermark
              </p>
            </div>`,
    };
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.demo-watermark-wrapper {
  position: relative;
  height: 150px;
  background-color: #fff;
  padding: 16px;
}
</style>
