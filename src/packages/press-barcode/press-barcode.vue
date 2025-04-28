<template>
  <div
    class="press-barcode"
    :style="customStyle"
  >
    <!-- #ifdef H5 -->
    <VueBarcode
      :value="value"
      :width="width"
      :height="height"
      :format="format"
      :font-size="fontSize"
    />
    <!-- #endif -->

    <!-- #ifndef H5 -->
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
  </div>
</template>

<script>
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
      type: String,
      default: '',
    },
  },
  emits: [
    'result',
  ],
  data() {
    return {
      result: '',
      canvasWidth: 0,
      canvasHeight: 0,

      innerOptions: {
        ...DEFAULT_OPTIONS,
        ...this.options,
      },
    };
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
