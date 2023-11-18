<template>
  <div>
    <!-- #ifdef H5 -->
    <PressQRCodeWeb
      v-if="value"
      :value="value"
    />
    <!-- #endif -->

    <template v-if="!codeImg">
      <!-- #ifdef MP-WEIXIN -->
      <canvas
        :id="wxCanvasId"
        :style="style"
        type="2d"
      />
      <!-- #endif -->

      <!-- #ifndef MP-WEIXIN || H5 -->
      <canvas
        :id="canvasId"
        :style="style"
        :canvas-id="canvasId"
      />
      <!-- #endif -->
    </template>

    <img
      v-if="codeImg"
      :src="codeImg"
      :style="style"
      :show-menu-by-longpress="true"
    >
  </div>
</template>

<script>
// #ifdef H5
import PressQRCodeWeb from 'vue-qrcode';
// #endif

// #ifdef MP-WEIXIN
import drawWxQRcode from 'weapp-qrcode-canvas-2d';
// #endif

// #ifndef MP-WEIXIN || H5
import UQRCode from 'uqrcodejs';
// #endif


export default {
  name: 'PressQRCode',
  components: {
    // #ifdef H5
    PressQRCodeWeb,
    // #endif
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
  },
  data() {
    return {
      codeImg: '',
      wxCanvasId: 'pressWxQRcode',
      canvasId: 'pressQRcode',
    };
  },
  computed: {
    style() {
      return `width: ${this.size}px; height: ${this.size}px;`;
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
  },
  mounted() {
    this.genQRCode();
  },
  methods: {
    genQRCode() {
      // #ifdef MP-WEIXIN
      this.codeMpWx();
      // #endif

      // #ifndef MP-WEIXIN || H5
      this.codeMpQQ();
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

      setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: this.canvasId,
            fileType: 'png',
            width: this.size,
            height: this.size,
            success: (res) => {
              console.log('[codeMpQQ]', res);
              this.codeImg = res.tempFilePath;

              this.$emit('result', this.codeImg);
            },
            fail: (err) => {
              console.log(err);
            },
          },
          this, // 组件内使用必传当前实例
        );
      }, 300);
    },
  },
};
</script>

<style scoped>
</style>
