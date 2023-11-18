<template>
  <div class="press-circle-index">
    <div class="press-circle">
      <!-- #ifdef H5 || APP-PLUS -->
      <canvas
        :id="canvasId"
        class="press-circle__canvas"
        :type="type"
        :style="circleStyle"
        :canvas-id="canvasId"
      />
      <!-- #endif -->

      <!-- #ifndef H5 || APP-PLUS -->
      <!-- 小程序中动态canvasId不生效，相同问题: https://ask.dcloud.net.cn/question/67534 -->
      <canvas
        :id="canvasId"
        class="press-circle__canvas"
        :type="type"
        :style="circleStyle"
        canvas-id="press-circle"
      />
      <!-- #endif -->

      <div
        v-if="(!text)"
        class="press-circle__text"
      >
        <slot />
      </div>
      <template v-else>
        <div
          v-if="isNotInUni"
          class="press-circle__text"
        >
          {{ text }}
        </div>
        <cover-view
          v-else
          class="press-circle__text"
        >
          {{ text }}
        </cover-view>
      </template>
    </div>
  </div>
</template>
<script>

import { BLUE, WHITE } from '../common/constant/color';
import { getSystemInfoSync } from '../common/utils/system';
import { isObj } from '../common/utils/validator';
import { canIUseCanvas2d } from '../common/utils/version';
import { adaptor } from './canvas';
import utils, { isNotInUni } from '../common/utils/utils';

let id = 0;

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;


export default {
  name: 'PressCircle',
  props: {
    text: { type: String, default: '' },
    lineCap: {
      type: String,
      default: 'round',
    },
    value: {
      type: Number,
      default: 0,
    },
    speed: {
      type: Number,
      default: 50,
    },
    size: {
      type: Number,
      default: 100,
    },
    fill: { type: String, default: '' },
    layerColor: {
      type: String,
      default: WHITE,
    },
    color: {
      type: null,
      default: BLUE,
    },
    type: {
      type: String,
      default: '',
    },
    strokeWidth: {
      type: Number,
      default: 4,
    },
    clockwise: {
      type: Boolean,
      default: true,
    },
  },
  emits: [],
  data() {
    return {
      hoverColor: BLUE,
      id: 1,
      isNotInUni: isNotInUni(),
    };
  },
  computed: {
    circleStyle() {
      const { size } = this;
      return `width: ${utils.addUnit(size)};height: ${utils.addUnit(size)}`;
    },
    canvasId() {
      let result =  `press-circle-${this.id}`;
      // #ifndef H5 || APP-PLUS
      result = 'press-circle';
      // #endif

      return result;
    },
  },
  watch: {
    value: {
      handler() {
        this.reRender();
      },
    },
    size: {
      handler() {
        this.drawCircle(this.currentValue);
      },
    },
    color: {
      handler() {
        this.setHoverColor().then(() => {
          this.drawCircle(this.currentValue);
        });
      },
    },

  },
  created() {
    id += 1;
    this.id = id;
  },
  mounted() {
    this.currentValue = this.value;
    this.setHoverColor().then(() => {
      this.drawCircle(this.currentValue);
    });
  },
  destroyed() {
    this.onDestroyed();
  },
  unmounted() {
    this.onDestroyed();
  },
  methods: {
    onDestroyed() {
      this.clearMockInterval();
    },
    getContext() {
      const { type, size } = this;
      if (isNotInUni()) {
        const dpr = window.devicePixelRatio;
        const canvas = document.getElementById(this.canvasId);
        const ctx = canvas.getContext('2d');
        if (!this.inited) {
          this.inited = true;
          canvas.width = size * dpr;
          canvas.height = size * dpr;
          ctx.scale(dpr, dpr);
        }
        return Promise.resolve(adaptor(ctx));
      }
      if (type === '' || !canIUseCanvas2d()) {
        const ctx = uni.createCanvasContext(this.canvasId, this);
        return Promise.resolve(ctx);
      }

      const dpr = getSystemInfoSync().pixelRatio;
      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)
          .select(`#${this.canvasId}`)
          .node()
          .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext(type);
            if (!this.inited) {
              this.inited = true;
              canvas.width = size * dpr;
              canvas.height = size * dpr;
              ctx.scale(dpr, dpr);
            }
            resolve(adaptor(ctx));
          });
      });
    },
    setHoverColor() {
      const { color, size } = this;
      if (isObj(color)) {
        return this.getContext().then((context) => {
          const LinearColor = context.createLinearGradient(size, 0, 0, 0);
          Object.keys(color)
            .sort((a, b) => parseFloat(a) - parseFloat(b))
            .map(key => LinearColor.addColorStop(parseFloat(key) / 100, color[key]));
          this.hoverColor = LinearColor;
        });
      }
      this.hoverColor = color;
      return Promise.resolve();
    },
    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const { strokeWidth, lineCap, clockwise, size } = this;
      const position = size / 2;
      const radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();
      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },
    renderLayerCircle(context) {
      const { layerColor, fill } = this;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },
    renderHoverCircle(context, formatValue) {
      const { clockwise } = this;
      // 结束角度
      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
    },
    drawCircle(currentValue) {
      const { size } = this;
      this.getContext().then((context) => {
        context.clearRect(0, 0, size, size);
        this.renderLayerCircle(context);
        const formatValue = format(currentValue);
        if (formatValue !== 0) {
          this.renderHoverCircle(context, formatValue);
        }
        context.draw();
      });
    },
    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const { value, speed } = this;
      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }
      this.clearMockInterval();
      this.currentValue = this.currentValue || 0;
      const run = () => {
        this.interval = setTimeout(() => {
          if (this.currentValue !== value) {
            if (Math.abs(this.currentValue - value) < STEP) {
              this.currentValue = value;
            } else if (this.currentValue < value) {
              this.currentValue += STEP;
            } else {
              this.currentValue -= STEP;
            }
            this.drawCircle(this.currentValue);
            run();
          } else {
            this.clearMockInterval();
          }
        }, 1000 / speed);
      };
      run();
    },
    clearMockInterval() {
      if (this.interval) {
        clearTimeout(this.interval);
        this.interval = null;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-circle {
  position: relative;
  display: inline-block;
  text-align: center;

  &__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    color: var(--circle-text-color, $circle-text-color);
  }
}
</style>
