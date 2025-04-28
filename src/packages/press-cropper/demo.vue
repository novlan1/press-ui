<template>
  <div class="demo-wrap">
    <PressButton
      type="primary"
      block
      @click="selectImg"
    >
      上传图片
    </PressButton>


    <PressCropper
      :show="show"
      :src="src"
      :zoom="1"
      :angle="0"
      :cut-width="'100%'"
      :bound-detect="true"
      :disable-preview="true"
      :disable-rotate="true"
      canvas-background="black"
      :is-e-sport="isESport"
      :h5-option="h5Option"
      @cropped="cropped"
      @afterDraw="afterDraw"
      @beforeDraw="beforeDraw"
      @cancel="cancel"
      @confirm="confirm"
    />

    <PressImage
      v-if="parsedImage"
      :src="parsedImage"
      mode="aspectFit"
      transition-style="margin: 20px auto;display: flex;justify-content: center;"
      custom-style="border: 1px solid #eee;"
    />
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import { chooseImageInH5 } from 'press-ui/press-cropper/helper';
import PressCropper from 'press-ui/press-cropper/press-cropper.vue';
import PressImage from 'press-ui/press-image/press-image.vue';


export default {
  components: {
    PressCropper,
    PressButton,
    PressImage,
  },
  data() {
    return {
      src: '',
      show: false,
      isESport: false,
      h5Option: {
        autoCrop: true,
        autoCropWidth: '80%',
        autoCropHeight: '80%',
        canMove: true,
        canMoveBox: true,
        centerBox: true,
        enlarge: 2,
        fixedBox: true,
        info: false,
        infoTrue: true,
        mode: 'contain',
        outputSize: 1,
        outputType: 'jpg',
      },
      parsedImage: '',
    };
  },
  mounted() {
    this.initH5Option();
  },
  methods: {
    initH5Option() {
      // #ifdef H5
      const aspectRatio = 1;
      const cropWidth = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

      this.h5Option = {
        ...this.h5Option,
        autoCropWidth: cropWidth,
        autoCropHeight: Math.floor(cropWidth * aspectRatio),
        aspectRatio,
        mode: `${cropWidth}px auto`,
        outputType: 'png',
        centerBox: true,
      };
      // #endif
    },
    selectImg() {
      // #ifdef H5
      chooseImageInH5().then((res) => {
        this.src = res;
        this.h5Option.img = this.src;

        console.log('[src]', this.src);
        this.show = true;
      });
      // #endif
      // #ifndef H5
      uni.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const { tempFilePaths } = res;
          this.src = tempFilePaths[0];
          this.h5Option.img = this.src;

          console.log('[src]', this.src);
          this.show = true;
        },
      });
      // #endif
    },
    beforeDraw(context, transform) {
      context.setFillStyle('yellow');
      transform.zoom = 2;
    },
    afterDraw(ctx, info) {
      ctx.fillText('我是一行文字水印', 20, 20);
      console.log(`当前画布大小：${info.width}*${info.height}`);
    },
    cropped(imagePath, imageInfo) {
      console.log('[cropped]', imagePath, imageInfo);
    },
    confirm(...args) {
      console.log('[confirm]', args);
      this.show = false;
      this.parsedImage = args[0];
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding: 20px 20px;
}
</style>
