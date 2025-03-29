<template>
  <div
    class="press-signature"
    :class="customClass"
  >
    <div
      :id="wrapId"
      ref="wrapRef"
      class="press-signature__content"
    >
      <!-- #ifndef MP-QQ -->
      <Canvas
        v-if="isRenderCanvas"
        :id="canvasId"
        ref="canvasRef"
        type="2d"
        :canvas-id="canvasId"
        @touchstart.passive="touchStart"
        @touchmove.prevent.stop="touchMove"
        @touchend.prevent.stop="touchEnd"
      />
      <p v-else>
        {{ tips }}
      </p>
      <!-- #endif -->

      <!-- #ifdef MP-QQ -->
      <canvas
        :id="canvasId"
        canvas-id="press-signature"
        @touchstart="touchStart"
        @touchmove.prevent="touchMove"
        @touchend.prevent.stop="touchEnd"
      />
      <!-- #endif -->
    </div>
    <div class="press-signature__footer">
      <PressButton
        custom-class="press-signature__button press-signature__button--clear"
        size="small"
        @click="clear"
      >
        {{ clearButtonText || t('clear') }}
      </PressButton>
      <PressButton
        custom-class="press-signature__button press-signature__submit"
        type="primary"
        size="small"
        @click="submit"
      >
        {{ confirmButtonText || t('confirm') }}
      </PressButton>
    </div>
  </div>
</template>
<script>
import PressButton from '../press-button/press-button.vue';
import { IN_BROWSER } from '../common/utils/validator';
import { t } from '../locale';
import { isNotInUni } from '../common/utils/utils';
import { canIUseCanvas2d, getWindowInfo } from '../common/utils/version';
import { adaptor } from '../press-circle/canvas';
import { calcBethelLine, distance } from './utils';
import { getRect, getRealPageYOrClientY } from '../common/dom/rect';


const hasCanvasSupport = () => {
  const canvas = document.createElement('canvas');
  return !!canvas.getContext?.('2d');
};


let id = 0;

export default {
  name: 'PressSignature',
  components: {
    PressButton,
  },
  options: {
    styleIsolation: 'shared',
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    penColor: {
      type: String,
      default: '#000',
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    clearButtonText: {
      type: String,
      default: t('clear'),
    },
    confirmButtonText: {
      type: String,
      default: t('confirm'),
    },
    fileType: {
      type: String,
      default: 'jpg',
    },
  },
  emits: [
    'start',
    'signing',
    'end',
    'submit',
    'clear',
  ],
  data() {
    return {
      canvasRect: {},
      canvasWidth: 0,
      canvasHeight: 0,

      id: 1,

      inited: false,

      ctx: null,
      wrapId: 'pressSignatureWrap',

      currentLine: [],
      lastPoint: {},
      currentPoint: {},

      radius: 1,
      canvas: null,
    };
  },
  computed: {
    canvasId() {
      let result =  `press-signature-${this.id}`;
      // #ifdef MP-QQ || MP-WEIXIN
      result = 'press-signature';
      // #endif

      return result;
    },
    isRenderCanvas() {
      let result = true;
      // #ifdef H5
      result = IN_BROWSER ? hasCanvasSupport() : true;
      // #endif
      return result;
    },
    useRawCanvas() {
      let result = false;
      // #ifdef H5
      result = true;
      // #endif
      if (isNotInUni()) {
        result = true;
      }
      return result;
    },
  },
  watch: {
    windowWidth() {
      this.resize();
    },
  },
  created() {
    id += 1;
    this.id = id;
  },
  mounted() {
    this.initialize();
  },
  methods: {
    touchStart(event) {
      if (!this.ctx) {
        return false;
      }

      if (this.useRawCanvas) {
        this.ctx.beginPath();
        this.ctx.setLineWidth(this.lineWidth);
        this.ctx.setStrokeStyle(this.penColor);
      } else {
        this.updateCurrentLine(event, true);
      }


      getRect(this, `#${this.canvasId}`).then((res) => {
        this.canvasRect = res;
        this.$emit('start');
      });
    },
    pointToLine(line) {
      const result = calcBethelLine(this.ctx, line, {
        lineColor: this.penColor,
        updateRadius: (value) => {
          this.radius = value;
        },
        radius: this.radius,

        lineWidth: this.lineWidth,
        penColor: this.penColor,
      });
      if (result) {
        this.currentLine = result;
      }
      return;
    },
    updateCurrentLine(event, isInit = false) {
      const point = {
        x: event.changedTouches[0].x,
        y: event.changedTouches[0].y,
      };
      this.lastPoint = this.currentPoint;
      this.currentPoint = point;
      const { currentLine } = this;
      currentLine.unshift({
        time: new Date().getTime(),
        dis: isInit ? 0 : distance(this.currentPoint, this.lastPoint),
        x: point.x,
        y: point.y,
      });
      this.pointToLine(currentLine);
    },
    touchMove(event) {
      if (!this.ctx) {
        return false;
      }

      event.preventDefault?.();
      event.stopPropagation?.();

      if (this.useRawCanvas) {
        const touch = event.touches[0];
        const mouseX = touch.clientX  - (this.canvasRect?.left || 0);
        const mouseY = getRealPageYOrClientY(touch.clientY)  - (this.canvasRect?.top || 0);

        this.ctx.setLineCap('round');
        this.ctx.setLineJoin('round');


        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();

        if (!canIUseCanvas2d()) {
          this.ctx.draw(true);
        }
      } else {
        this.updateCurrentLine(event);
      }


      this.$emit('signing', event);
    },

    touchEnd(event) {
      event.preventDefault?.();

      this.$emit('end');

      if (!this.useRawCanvas) {
        this.updateCurrentLine(event);
        this.currentLine = [];
      }
    },
    submit()  {
      const that = this;

      if (this.useRawCanvas) {
        const canvas = this.$refs.canvasRef;
        if (!canvas) {
          return;
        }

        const isEmpty = this.isCanvasEmpty(canvas);

        const image = isEmpty
          ? ''
          : (
            {
              jpg: () => canvas.toDataURL('image/jpeg', 0.8),
              jpeg: () => canvas.toDataURL('image/jpeg', 0.8),
            }[this.type]
          )?.() || canvas.toDataURL(`image/${this.type}`);

        this.$emit('submit', {
          image,
          canvas,
          width: this.canvasWidth,
          height: this.canvasHeight,
        });
      } else {
        const cb = () => {
          uni.canvasToTempFilePath({
            canvas: this.canvas,
            canvasId: this.canvasId,
            fileType: this.fileType,
            quality: 1, // 图片质量
            success(res) {
              const url = res.tempFilePath;

              that.base64(url, 'jpg').then((res) => {
                that.$emit('submit', {
                  image: res,
                  canvas: that.canvas,
                  width: that.canvasWidth,
                  height: that.canvasHeight,
                });
              });
            },
            fail(error) {
              console.warn('[canvasToTempFilePath] error: ', error);
            },
          }, this);
        };

        cb();
      }
    },
    base64(url, type) {
      return new Promise((resolve, reject) => {
        uni.getFileSystemManager().readFile({
          filePath: url,
          encoding: 'base64',
          success(res) {
            resolve(`data:image/${type.toLocaleLowerCase()};base64,${res.data}`);
          },
          fail() {
            reject();
          },
        });
      });
    },

    innerClear() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.closePath();
        this.ctx.draw();

        this.setCanvasBgColor(this.ctx);
      }
    },
    clear()  {
      this.innerClear();
      this.$emit('clear');
    },
    initialize() {
      if (this.isRenderCanvas) {
        this.getContext().then((context) => {
          this.ctx = context;
          this.innerClear();
        });
      }
    },
    getContext() {
      const that = this;
      return new Promise((resolve, reject) => {
        getRect(this, `#${this.wrapId}`)
          .then((wrapRect) => {
            const { width, height } = wrapRect;
            that.canvasWidth = width;
            that.canvasHeight = height;
            const ctx = that.innerGetContext({
              width,
              height,
            });

            resolve(ctx);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    innerGetContext({ width, height }) {
      const getH5Ctx = () => {
        const dpr = window.devicePixelRatio;
        const canvas = document.getElementById(this.canvasId);
        const ctx = canvas.getContext('2d');
        if (!this.inited) {
          this.inited = true;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }
        return Promise.resolve(adaptor(ctx));
      };

      if (this.useRawCanvas) {
        return getH5Ctx();
      }


      if (!canIUseCanvas2d()) {
        const ctx = uni.createCanvasContext(this.canvasId, this);
        this.inited = true;
        ctx.scale(dpr, dpr);
        return Promise.resolve(ctx);
      }


      const dpr = getWindowInfo().pixelRatio;
      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)
          .select(`#${this.canvasId}`)
          // .fields({ node: true })
          .node()
          .exec((res) => {
            const canvas = res[0].node;
            this.canvas = canvas;
            const ctx = canvas.getContext('2d');
            if (!this.inited) {
              this.inited = true;
              canvas.width = width * dpr;
              canvas.height = height * dpr;
              ctx.scale(dpr, dpr);
            }
            resolve(adaptor(ctx));
          });
      });
    },
    resize() {
      if (this.ctx) {
        const data = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
        this.initialize();
        this.ctx.putImageData(data, 0, 0);
      }
    },

    isCanvasEmpty(canvas) {
      const empty = document.createElement('canvas');
      empty.width = canvas.width;
      empty.height = canvas.height;
      if (this.backgroundColor) {
        const emptyCtx = empty.getContext('2d');
        this.setCanvasBgColor(emptyCtx);
      }
      return canvas.toDataURL() === empty.toDataURL();
    },

    setCanvasBgColor(ctx) {
      if (ctx && this.backgroundColor) {
        ctx.fillStyle = this.backgroundColor;
        ctx.setFillStyle?.(this.backgroundColor);
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.draw?.();
      }
    },
    t,
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
