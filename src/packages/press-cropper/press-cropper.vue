<template>
  <PressPopup
    :show="show"
    wrap-class="press-cropper"
    custom-class="press-cropper__popup"
    @close="onClose"
    @confirm="confirm"
    @cancel="cancel"
  >
    <PressPickerToolbar
      v-if="showTitle"
      :title="title"
      :show-toolbar="true"
      :cancel-button-text="cancelButtonText"
      :confirm-button-text="confirmButtonText"
      :custom-class="toolbarClass"
    />
    <div class="press-cropper__wrap">
      <!-- #ifdef H5 -->
      <VueCropper
        ref="cropper"
        v-bind="h5Option"
      />


      <!-- #endif -->
      <!-- #ifndef H5 -->
      <NiceCropper
        v-if="showCropper"
        ref="cropper"
        :src="src"
        :width="width"
        :height="height"
        :cut-width="cutWidth"
        :cut-height="cutHeight"
        :min-width="minWidth"
        :min-height="minHeight"
        :center="center"
        :disable-scale="disableScale"
        :disable-rotate="disableRotate"
        :disable-translate="disableTranslate"
        :disable-ctrl="disableCtrl"
        :bound-detect="boundDetect"
        :keep-ratio="keepRatio"
        :disable-preview="disablePreview"
        :show-ctrl-border="showCtrlBorder"
        :reset-cut="resetCut"
        :fit="fit"
        :image-center="imageCenter"
        :max-zoom="maxZoom"
        :min-zoom="minZoom"
        :angle="angle"
        :zoom="zoom"
        :offset="offset"
        :background="background"
        :canvas-background="canvasBackground"
        :canvas-zoom="canvasZoom"
        :file-type="fileType"
        :quality="quality"
        :mask-type="maskType"
        :circle-view="circleView"
        @cropped="cropped"
        @afterDraw="afterDraw"
        @beforeDraw="beforeDraw"
      />
      <!-- #endif -->
    </div>

    <div
      v-if="true"
      class="press-cropper__footer"
    >
      <PressButton
        class="press-cropper__button"
        custom-class="press-cropper__cancel"
        :type="isESport ? 'e-sport-border' : 'default'"
        size="small"
        @click="cancel"
      >
        取消
      </PressButton>

      <PressButton
        class="press-cropper__button"
        custom-class="press-cropper__confirm"
        :type="isESport ? 'e-sport-primary' : 'primary'"
        size="small"
        @click="confirm"
      >
        确认
      </PressButton>
    </div>
  </PressPopup>
</template>
<script>
// #ifdef H5
import 'vue-cropper/dist/index.css';
import { VueCropper } from '../common/vue3/vue-cropper';
// #endif

import PressButton from '../press-button/press-button.vue';
import PressPickerToolbar from '../press-picker-toolbar/press-picker-toolbar.vue';
import PressPopup from '../press-popup/press-popup.vue';

// #ifndef H5
import NiceCropper from './nice-cropper/cropper.vue';
// #endif
import { CROPPER_PROPS } from './props';


export default {
  name: 'PressCropper',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressButton,
    PressPickerToolbar,

    // #ifdef H5
    VueCropper,
    // #endif
    // #ifndef H5
    NiceCropper,
    // #endif
  },
  props: {
    ...CROPPER_PROPS,
    show: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: { type: String, default: '裁剪图片' },
    cancelButtonText: {
      type: String,
      default: '',
    },
    confirmButtonText: {
      type: String,
      default: '',
    },
    toolbarClass: {
      type: String,
      default: '',
    },
    isESport: {
      type: Boolean,
      default: false,
    },
    h5Option: {
      type: Object,
      default: () => ({}),
    },
    delayShow: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      showCropper: false,
      timer: null,

      lastCropped: {},
    };
  },
  watch: {
    show: {
      handler(value) {
        if (value) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.showCropper = true;
            // #ifdef H5
            // 修复 cropper-face 阻止滚轮缩放的问题
            this.$nextTick(() => {
              if (this.$refs.cropper && this.$refs.cropper.scaleImg) {
                this.$refs.cropper.scaleImg();
              }
            });
            // #endif
          }, this.delayShow);
        } else {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.showCropper = false;
          }, 300);
        }
      },
      immediate: true,
    },
  },
  mounted() {
  },
  methods: {
    afterDraw(...args) {
      this.$emit('afterDraw', ...args);
    },
    beforeDraw(...args) {
      this.$emit('beforeDraw', ...args);
    },
    cropped(imagePath, imageInfo) {
      this.$emit('cropped', imagePath, imageInfo);

      this.lastCropped = {
        imagePath,
        imageInfo,
      };
    },
    onClose() {
      this.$emit('close');
    },
    confirm() {
      // #ifdef H5
      this.$refs.cropper.getCropData((data) => {
        this.$emit('confirm', data);
      });
      // #endif

      // #ifndef H5
      this.$emit('confirm', this.lastCropped.imagePath || this.src, this.lastCropped.imageInfo);
      // #endif
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
