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
      <!-- #ifdef H5 -->
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
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <!-- 注意：这里不要用 .prevent / .stop 修饰符。
           APP 端 uni 的事件对象缺少 preventDefault，Vue 编译出的 withModifiers
           会先调 e.preventDefault() 而抛 TypeError，导致 touchMove 里的绘制
           代码根本不执行（表现为签名板画不出任何笔迹）。
           改为在方法内部手动调用，并做存在性判断。 -->
      <canvas
        v-if="isRenderCanvas"
        :id="canvasId"
        ref="canvasRef"
        type="2d"
        :canvas-id="canvasId"
        :disable-scroll="true"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      />
      <!-- #endif -->
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
import { getRect, getRealPageYOrClientY } from '../common/dom/rect';
import { isNotInUni } from '../common/utils/utils';
import { IN_BROWSER } from '../common/utils/validator';

import { canIUseCanvas2d, getWindowInfo } from '../common/utils/version';
import { t } from '../locale';

import PressButton from '../press-button/press-button.vue';
import { adaptor } from '../press-circle/canvas';

import { calcBethelLine, distance } from './utils';


const hasCanvasSupport = () => {
  const canvas = document.createElement('canvas');
  return !!canvas.getContext?.('2d');
};


let id = 0;
let globalCanvas = null;

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
      // 只有 H5（或非 uni 环境）才能走原生 DOM 路径。
      // 注意：APP 端不能走这里 —— uni APP 的 JS 跑在独立逻辑层，
      // 没有 window / document，访问 window.devicePixelRatio 会直接抛
      // 「undefined is not an object」，导致 ctx 初始化失败、签名板不可用。
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
    /**
     * 安全地阻止默认行为。
     * APP 端 uni 的事件对象可能没有 preventDefault，直接调用会抛 TypeError
     * 并中断整个 handler，所以必须先判断类型。
     */
    safePreventDefault(event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
    },
    touchStart(event) {
      if (!this.ctx) {
        return false;
      }

      if (this.useRawCanvas) {
        this.ctx.beginPath();
        this.ctx.setLineWidth(this.lineWidth);
        this.ctx.setStrokeStyle(this.penColor);
      } else {
        // 起笔半径按线宽重置（默认 radius 为 1，对应基准线宽 3），
        // 否则上一笔的收笔半径会带到新笔画上，改线宽后首笔粗细也不对
        this.radius = Math.max((Number(this.lineWidth) || 3) / 3, 0.1);
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
        // 起笔半径也随线宽缩放（radius 初值为 1，对应基准线宽 3）
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
      // uni（小程序 / APP）的 touch 点在 changedTouches 上，带 x / y 字段
      const touch = (event.changedTouches && event.changedTouches[0])
        || (event.touches && event.touches[0]);
      if (!touch) {
        console.warn('[press-signature] 拿不到 touch 点', event);
        return;
      }
      const point = {
        x: touch.x != null ? touch.x : touch.clientX,
        y: touch.y != null ? touch.y : touch.clientY,
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
        // APP 端部分场景 touches 为空，需回退到 changedTouches
        const touch = (event.touches && event.touches[0])
          || (event.changedTouches && event.changedTouches[0]);
        if (!touch) {
          console.warn('[press-signature] touchMove 拿不到 touch 点', event);
          return;
        }
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
          let { canvas } = this;
          // #ifdef MP-WEIXIN
          // https://developers.weixin.qq.com/community/develop/article/doc/000c02aa4d4530f96402a06a761413
          canvas = globalCanvas;
          // #endif

          const options = {
            canvasId: this.canvasId,
            fileType: this.fileType,
            quality: 1, // 图片质量
            // APP 端不传宽高时，导出区域可能为 0，显式带上更稳妥
            x: 0,
            y: 0,
            width: this.canvasWidth,
            height: this.canvasHeight,
            success: (res) => {
              const url = res.tempFilePath;

              that.base64(url, 'jpg')
                .then((base64) => {
                  that.$emit('submit', {
                    image: base64,
                    canvas: that.canvas,
                    width: that.canvasWidth,
                    height: that.canvasHeight,
                  });
                })
                .catch((err) => {
                  // 转 base64 失败时，退回直接抛出临时文件路径，
                  // 至少保证调用方能拿到图片，而不是什么都收不到
                  console.warn('[press-signature] 转 base64 失败，改用临时路径', err);
                  that.$emit('submit', {
                    image: url,
                    canvas: that.canvas,
                    width: that.canvasWidth,
                    height: that.canvasHeight,
                  });
                });
            },
            fail(error) {
              console.warn('[canvasToTempFilePath] error: ', error);
            },
          };

          // canvas 字段只有 canvas 2d 模式才需要传（小程序）。
          // APP 端走的是旧版 createCanvasContext 路径，globalCanvas 从未被赋值，
          // 传一个 undefined 进去反而会让 canvasToTempFilePath 失败。
          if (canvas) {
            options.canvas = canvas;
          }

          uni.canvasToTempFilePath(options, this);
        };

        cb();
      }
    },
    /**
     * 把本地文件路径读成 base64 dataURL。
     *
     * 注意：uni.getFileSystemManager 是**小程序专有 API**，APP 端不存在，
     * 直接调用会抛 TypeError，导致 submit 静默失败、拿不到图片。
     * 因此 APP 端改用 plus.io 读取。
     */
    base64(url, type) {
      const mime = `data:image/${String(type).toLocaleLowerCase()};base64,`;
      let result = Promise.resolve({});

      // #ifdef APP-PLUS || APP
      result = new Promise((resolve, reject) => {
        if (typeof plus === 'undefined' || !plus.io) {
          reject(new Error('plus.io 不可用'));
          return;
        }
        plus.io.resolveLocalFileSystemURL(url, (entry) => {
          entry.file((file) => {
            const reader = new plus.io.FileReader();
            reader.onloadend = (e) => {
              // plus 读出来的已经是 dataURL（含 data:image/...;base64, 前缀）
              const result = e.target.result || '';
              resolve(result.indexOf('base64,') > -1 ? result : mime + result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }, reject);
        }, reject);
      });
      // #endif

      // #ifndef APP-PLUS || APP
      result = new Promise((resolve, reject) => {
        if (!uni.getFileSystemManager) {
          reject(new Error('getFileSystemManager 不可用'));
          return;
        }
        uni.getFileSystemManager().readFile({
          filePath: url,
          encoding: 'base64',
          success(res) {
            resolve(mime + res.data);
          },
          fail(err) {
            reject(err);
          },
        });
      });
      // #endif

      return result;
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
        this.getContext()
          .then((context) => {
            this.ctx = context;
            this.innerClear();
          })
          .catch((err) => {
            // 原先没有 catch，初始化失败会完全静默，签名板看起来就是「不生效」
            console.warn('[press-signature] 初始化失败', err);
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
        // 该分支只在 H5 / 非 uni 环境走。APP 逻辑层没有 window / document，
        // 这里仍做一次防御，避免任何情况下再抛
        // 「undefined is not an object (evaluating 'window.devicePixelRatio')」
        if (typeof window === 'undefined' || typeof document === 'undefined') {
          console.warn('[press-signature] 当前环境没有 window/document，无法走 DOM 路径');
          return Promise.reject(new Error('no window/document'));
        }
        const dpr = window.devicePixelRatio || 1;
        let canvas = document.getElementById(this.canvasId);
        if (!canvas) {
          const refEl = this.$refs.canvasRef;
          canvas = refEl && (refEl.$el || refEl);
          // ref 可能拿到的是包装元素，向内找真正的 canvas
          if (canvas && canvas.tagName !== 'CANVAS' && canvas.querySelector) {
            canvas = canvas.querySelector('canvas') || canvas;
          }
        }
        if (!canvas || typeof canvas.getContext !== 'function') {
          console.warn('[press-signature] 未获取到 canvas 元素', this.canvasId);
          return Promise.reject(new Error('canvas not found'));
        }
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

      // dpr 必须在分支之前取：原先它声明在下方 canvas2d 分支处，
      // 而上面的旧版 createCanvasContext 分支也用到了它，构成同作用域 TDZ，
      // 一旦走进旧版分支就会抛 ReferenceError（APP 端 SDKVersion 为空时必然触发），
      // 表现为签名板完全画不出东西。
      const dpr = getWindowInfo().pixelRatio || 1;

      if (!canIUseCanvas2d()) {
        const ctx = uni.createCanvasContext(this.canvasId, this);
        this.inited = true;
        ctx.scale(dpr, dpr);
        return Promise.resolve(ctx);
      }

      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)
          .select(`#${this.canvasId}`)
          // .fields({ node: true })
          .node()
          .exec((res) => {
            const canvas = res[0].node;
            this.canvas = canvas;
            globalCanvas = canvas;

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
