<template>
  <div class="press-q-r-code">
    <!-- #ifdef H5 -->
    <!-- #ifdef VUE2 -->
    <PressQRCodeWeb
      v-if="value"
      :value="value"
      v-bind="h5Attr"
    />
    <!-- #endif -->

    <!-- #ifdef VUE3 -->
    <!-- 使用 vue-qrcode -->
    <VueQRCode
      v-if="value && (useVueQrcodeInVue3 || globalUseVueQrcodeInVue3)"
      :value="value"
      v-bind="h5Attr"
      type="image/png"
      :color="color"
    />
    <!-- 使用 qrcode.vue，不使用 vueImage -->
    <PressQRCodeWeb
      v-else-if="value && !innerVue3Image"
      :value="value"
      v-bind="h5Attr"
    />
    <!-- #endif -->
    <!-- #endif -->


    <template v-if="!codeImg">
      <!-- #ifdef H5 -->
      <!-- #ifdef VUE3 -->
      <PressQRCodeWeb
        v-if="value && innerVue3Image"
        :id="canvasId"
        :value="value"
      />
      <!-- #endif -->
      <!-- #endif -->


      <!-- #ifdef MP-WEIXIN -->
      <canvas
        :id="wxCanvasId"
        :style="style"
        type="2d"
      />
      <!-- #endif -->

      <!-- #ifdef MP-QQ || MP-ALIPAY -->
      <canvas
        :id="canvasId"
        :style="style"
        :canvas-id="canvasId"
      />
      <!-- #endif -->
    </template>

    <!-- APP 端：canvas 上已经画好二维码，直接展示它即可。
         这里不做 canvas -> 临时图片 的切换，原因有两点：
         1. <img> 是 HTML 标签，加载不了 APP 的本地临时路径（_doc/uniapp_temp_.../xxx.png），
            会触发 error，之前的「一闪就没 / 反复闪烁」正是它造成的；
         2. 展示 canvas 本身就够了，转图只是为了长按保存等附加能力。
         若外部需要图片路径，仍会通过 result 事件抛出。 -->
    <!-- #ifdef APP-PLUS || APP -->
    <canvas
      :id="canvasId"
      :style="style"
      :canvas-id="canvasId"
    />
    <!-- #endif -->

    <!-- #ifndef APP-PLUS || APP -->
    <img
      v-if="codeImg"
      :src="codeImg"
      :style="style"
      :show-menu-by-longpress="true"
      @longpress="onLongPressImage"
    >
    <!-- #endif -->
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
// #ifdef MP-QQ || MP-ALIPAY || APP-PLUS || APP
import UQRCode from 'uqrcodejs';
// #endif

// #ifdef H5
import VueQRCode from 'vue-qrcode';
// #endif

// #ifdef MP-WEIXIN
import drawWxQRcode from 'weapp-qrcode-canvas-2d';
// #endif

// #ifdef H5
import PressQRCodeWeb from '../common/vue3/q-r-code';
// #endif


export default {
  name: 'PressQRCode',
  components: {
    // #ifdef H5
    PressQRCodeWeb,
    VueQRCode,
    // #endif
  },
  inject: {
    globalUseVueQrcodeInVue3: {
      default: false,
    },
  },
  props: {
    value: { // 二维码url
      type: String,
      default: '',
      required: true,
    },
    size: { // 二维码尺寸，单位px
      type: Number,
      default: 287,
      required: false,
    },
    margin: {
      type: Number,
      default: 0,
    },
    initH5Attr: {
      type: Boolean,
      default: false,
    },
    /**
     * Vue3 时，是否使用 image 模式，即转为 image，这时会将 width/height 设为父元素的宽高
     */
    vue3Image: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否在 vue3 时也使用 `vue-qrcode` 三方库
     */
    useVueQrcodeInVue3: {
      type: Boolean,
      default: false,
    },
    wxMpPadding: {
      type: Number,
      default: -1,
    },
    color: {
      type: Object,
      default: () => ({
        dark: '#000000ff',
        light: '#ffffffff',
      }),
    },
  },
  emits: [
    'result',
  ],
  data() {
    return {
      codeImg: '',
      wxCanvasId: 'pressWxQRcode',
      canvasId: 'pressQRcode',
    };
  },
  computed: {
    h5Attr() {
      return this.initH5Attr ? {
        width: this.size, // vue-qrcode 二维码尺寸，单位px
        size: this.size, // qrcode.vue 二维码尺寸，单位px
        margin: this.margin, // 空白边距，单位px
      } : {};
    },
    style() {
      if (this.size === -1) {
        return '';
      }
      return `width: ${this.size}px; height: ${this.size}px;`;
    },
    innerVue3Image() {
      const { vue3Image, useVueQrcodeInVue3, globalUseVueQrcodeInVue3 } = this;

      return vue3Image && !(useVueQrcodeInVue3 || globalUseVueQrcodeInVue3);
    },
  },
  watch: {
    value: {
      handler() {
        this.codeImg = '';
        setTimeout(() => {
          this.genQRCode();
        });
      },
    },
    size: {
      handler() {
        this.codeImg = '';
        setTimeout(() => {
          this.genQRCode();
        });
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.genQRCode();
    }, 0);
  },
  methods: {
    genQRCode() {
      // #ifdef MP-WEIXIN
      this.codeMpWx();
      // #endif

      // #ifdef MP-QQ || MP-ALIPAY || APP-PLUS || APP
      this.codeMpQQ();
      // #endif

      // #ifdef H5
      // #ifdef VUE3
      if (this.innerVue3Image) {
        this.codeH5Vue3();
      }
      // #endif
      // #endif
    },
    codeMpWx() {
      const query = this.createSelectorQuery();

      query.select(`#${this.wxCanvasId}`)
        .fields({
          node: true,
          size: true,
        })
        .exec((res) => {
          const canvas = res[0].node;
          drawWxQRcode({
            canvas,
            canvasId: this.wxCanvasId,
            width: this.size,
            background: '#ffffff',
            foreground: '#000000',
            text: this.value,
            padding: this.wxMpPadding === -1 ? undefined : this.wxMpPadding,
          });

          wx.canvasToTempFilePath({
            canvasId: this.wxCanvasId,
            canvas,
            x: 0,
            y: 0,
            width: this.size,
            height: this.size,
            destWidth: this.size,
            destHeight: this.size,
            success: (res) => {
              console.log('[二维码临时路径]', res.tempFilePath);
              this.codeImg = res.tempFilePath;

              this.$emit('result', this.codeImg);
            },
            fail: (res) => {
              console.error(res);
            },
          });
        });
    },
    codeMpQQ() {
      // 获取uQRCode实例
      const qr = new UQRCode();
      // 设置二维码内容
      qr.data = this.value;
      // 设置二维码大小，必须与canvas设置的宽高一致
      qr.size = this.size;
      qr.margin = Math.round(this.size / 20);
      // 调用制作二维码方法
      qr.make();
      // 获取canvas上下文
      const canvasContext = uni.createCanvasContext(this.canvasId, this); // 如果是组件，this必须传入
      // 设置uQRCode实例的canvas上下文
      qr.canvasContext = canvasContext;
      // 调用绘制方法将二维码图案绘制到canvas上
      qr.drawCanvas();

      // 转图仅用于对外抛出图片路径（如长按保存），不参与页面展示 ——
      // 展示始终用 canvas，避免 <img> 加载不了 APP 本地临时路径而反复闪烁。
      setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: this.canvasId,
            fileType: 'png',
            width: this.size,
            height: this.size,
            success: (res) => {
              const path = res && res.tempFilePath;
              if (!path || typeof path !== 'string') {
                console.warn('[press-q-r-code] tempFilePath 无效', res);
                return;
              }
              // 注意：APP 端不要把 path 赋给 codeImg，
              // 那会切换成 <img> 展示，而 <img> 加载不了 _doc/ 临时路径。
              this.$emit('result', path);
            },
            fail: (err) => {
              // 失败也无妨：canvas 上的二维码始终在显示
              console.warn('[press-q-r-code] canvasToTempFilePath 失败', err);
            },
          },
          this, // 组件内使用必传当前实例
        );
      }, 300);
    },
    codeH5Vue3(retryCount = 0) {
      const MAX_RETRY = 5;
      const RETRY_DELAY = 100;

      const canvas = document.getElementById(this.canvasId);
      if (!canvas) {
        if (retryCount < MAX_RETRY) {
          setTimeout(() => {
            this.codeH5Vue3(retryCount + 1);
          }, RETRY_DELAY);
        } else {
          console.warn('[press-q-r-code] canvas element not found:', this.canvasId);
        }
        return;
      }
      const domImage = canvas.toDataURL('image/png');
      this.codeImg = domImage;
    },
    onLongPressImage() {
      this.$emit('longPressImage', this.codeImg);
    },
  },
};
</script>

<style scoped lang="scss" src="./css/index.scss">
</style>
