<template>
  <div
    class="press-barcode"
    :style="wrapStyle"
  >
    <!-- #ifdef H5 -->
    <VueBarcode
      v-if="!errorMessage"
      :value="value"
      :width="width"
      :height="height"
      :format="format"
      :font-size="fontSize"
    />
    <!-- #endif -->

    <!-- APP 端：直接展示 canvas 本身。
         原实现把 canvas 用 CSS 移到屏幕外「离屏绘制」，再用 <image> 展示
         canvasToTempFilePath 生成的临时图。但 APP 端这条链路不可靠
         （临时路径加载、层级遮挡都会出问题），而 canvas 上其实已经画好了条码。
         因此这里让 APP 直接显示 canvas，转图仅用于对外抛 result 事件。
         与 press-q-r-code 的处理保持一致。

         注意：这里必须是**扁平的平级条件编译**，不要写成
         `#ifndef H5` 里再嵌套 `#ifdef APP`。uni 对嵌套 ifdef 支持不可靠，
         整块可能被直接剔除，导致条形码完全不渲染。 -->
    <!-- #ifdef APP-PLUS || APP -->
    <canvas
      v-show="!errorMessage"
      :id="cid"
      class="press-barcode-canvas--visible"
      :canvas-id="cid"
      :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"
    />
    <!-- #endif -->

    <!-- 小程序端：离屏 canvas 绘制 + image 展示结果 -->
    <!-- #ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
    <canvas
      :id="cid"
      class="press-barcode-canvas"
      :canvas-id="cid"
      :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"
    />
    <image
      v-show="show"
      :src="result"
      :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"
    />
    <!-- #endif -->

    <!-- 编码失败提示（如输入中文）。一维码规范只支持 ASCII，
         不给提示的话用户只会看到一片空白，不知道发生了什么。 -->
    <div
      v-if="errorMessage"
      class="press-barcode__error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { style } from '../common/utils/style';

// #ifdef H5
import VueBarcode from '../common/vue3/bar-code';
// #endif

// #ifndef H5
import Barcode from './barcode.js';
// #endif


const DEFAULT_OPTIONS = {
  format: 'CODE128', // 选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
  width: 1, // 设置条之间的宽度
  height: 35, // 高度
  displayValue: true, // 是否在条形码下方显示文字
  textAlign: 'center', // 设置文本的水平对齐方式
  textPosition: 'bottom', // 设置文本的垂直位置
  textMargin: 2, // 设置条形码和文本之间的间距
  fontSize: 12, // 设置文本的大小
  fontColor: '#000000', // 设置文本的颜色
  lineColor: '#000000', // 设置条形码的颜色
  background: '#FFFFFF', // 设置条形码的背景色
  margin: 3, // 设置条形码周围的空白边距
  marginTop: undefined, // 设置条形码周围的上边距
  marginBottom: undefined, // 设置条形码周围的下边距
  marginLeft: undefined, // 设置条形码周围的左边距
  marginRight: undefined, // 设置条形码周围的右边距
};

export default {
  name: 'PressBarcode',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    // #ifdef H5
    VueBarcode,
    // #endif
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    cid: {
      type: String,
      default: 'press-barcode-canvas',
    },
    value: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'CODE128',
    },
    width: {
      type: Number,
      default: 0.6,
    },
    height: {
      type: Number,
      default: 35,
    },
    fontSize: {
      type: Number,
      default: 10,
    },
    options: {
      type: Object,
      default: () => (DEFAULT_OPTIONS),
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: [
    'result',
    'error',
  ],
  data() {
    return {
      result: '',
      // 给一个非 0 的初始尺寸：canvas 的绘图区由 style 宽高决定，
      // 若初始为 0，首次 mounted 绘制时画布还是零尺寸，内容画不出来
      // （表现为「首次进页面空白，删掉重新输入才显示」）。
      // 真实尺寸会在编码完成后由 cbCanvasSize 回调覆盖。
      canvasWidth: 300,
      canvasHeight: 100,
      // 编码失败时的提示文案（如输入中文），为空表示正常
      errorMessage: '',

      innerOptions: {
        ...DEFAULT_OPTIONS,
        ...this.options,
      },
    };
  },
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
  },
  onUnload() {
  },
  watch: {
    value(n, o) {
      this.innerClearCode();
      if (n != o && !this.testEmpty(n)) {
        setTimeout(() => {
          this.innerMakeCode();
        }, 0);
      }
    },
  },
  mounted() {
    this.innerClearCode();
    if (!this.testEmpty(this.value)) {
      setTimeout(() => {
        this.innerMakeCode();
      }, 0);
    }
  },
  methods: {
    innerMakeCode() {
      const that = this;
      this.getInnerOptions();
      // 每次重新生成前清掉上一次的错误提示
      this.errorMessage = '';

      // 一维码（CODE128 / CODE39 / EAN / UPC 等）规范上只支持 ASCII 字符，
      // 传中文会让编码器抛 RangeError。这里在所有端统一提前拦截，
      // 保证 H5 / APP / 小程序表现一致（H5 走的是 VueBarcode，不经过下面的 Barcode）。
      // eslint-disable-next-line no-control-regex
      if (/[^\x00-\x7F]/.test(String(this.value))) {
        this.errorMessage = `${this.format} 只支持 ASCII 字符，无法编码「${this.value}」`;
        // 注意：这里不要把 canvasWidth/Height 置 0。
        // canvas 由 errorMessage 控制隐藏即可，置 0 会让下次成功绘制时
        // 又落回「零尺寸画布」的竞态，导致首次不显示。
        this.setResult('');
        this.$emit('error', {
          type: 'INVALID_CHARACTER',
          message: this.errorMessage,
          text: this.value,
        });
        return;
      }

      // #ifndef H5
      new Barcode(
        that,
        that.cid,
        that.innerOptions,
        ((res) => { // 生成条形码款高回调
          that.canvasWidth = res.width;
          that.canvasHeight = res.height;
        }),
        ((res) => { // 生成条形码的回调
          that.setResult(res);
        }),
        ((err) => { // 编码失败回调（如输入了中文等非 ASCII 字符）
          that.errorMessage = err && err.message ? err.message : '条形码生成失败';
          that.setResult('');
          that.$emit('error', err);
        }),
      );
      // #endif
    },
    innerClearCode() {
      this.setResult('');
    },
    saveCode() {
      const that = this;
      if (this.result != '') {
        uni.saveImageToPhotosAlbum({
          filePath: that.result,
          success() {
            uni.showToast({
              title: '条形码保存成功',
              icon: 'success',
              duration: 2000,
            });
          },
        });
      }
    },
    setResult(res) {
      this.result = res;
      this.$emit('result', res);
    },

    testEmpty(v) {
      const tp = typeof v;
      let rt = false;
      if (tp == 'number' && String(v) == '') {
        rt = true;
      } else if (tp == 'undefined') {
        rt = true;
      } else if (tp == 'object') {
        if (JSON.stringify(v) == '{}' || JSON.stringify(v) == '[]' || v == null) rt = true;
      } else if (tp == 'string') {
        if (v == '' || v == 'undefined' || v == 'null' || v == '{}' || v == '[]') rt = true;
      } else if (tp == 'function') {
        rt = false;
      }
      return rt;
    },
    getInnerOptions() {
      const {
        width,
        height,
        fontSize,
        format,
        value,
        options,
      } = this;

      this.innerOptions = {
        ...DEFAULT_OPTIONS,
        ...(options || {}),
        width,
        height,
        fontSize,
        format,
        text: value,
      };
      return this.innerOptions;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
