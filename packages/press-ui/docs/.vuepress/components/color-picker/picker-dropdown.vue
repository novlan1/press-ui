<template>
  <div class="press-color-wrap">
    <div class="press-color-upper">
      <SvPanel :color="color" />
      <HueSlider :color="color" />
    </div>
    <div class="press-color-buttons">
      <div class="press-color-input">
        <input
          v-model="customInput"
          class="press-input"
          @keyup.enter="handleConfirm"
          @blur="handleConfirm"
        >
      </div>
      <div>
        <button
          class="press-button press-button--text press-button--mini"
          @click="$emit('clear')"
        >
          清空
        </button>
        <button
          class="press-button press-button--primary press-button--mini"
          @click="confirmValue"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import HueSlider from './hue-slider.vue';
import SvPanel from './sv-panel.vue';

export default {
  components: {
    HueSlider,
    SvPanel,
  },
  props: {
    color: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      customInput: '',
      showPopper: false,
    };
  },

  computed: {
    currentColor() {
      const parent = this.$parent;
      return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
    },
  },
  watch: {
    showPopper(val) {
      if (val === true) {
        this.$nextTick(() => {
          const { sl, hue, alpha } = this.$refs;
          sl && sl.update();
          hue && hue.update();
          alpha && alpha.update();
        });
      }
    },

    currentColor: {
      immediate: true,
      handler(val) {
        this.customInput = val;
      },
    },
  },
  mounted() {
    this.popperElm = this.$el;
    this.$parent.popperElm = this.popperElm;
    this.referenceElm = this.$parent.$el;
  },
  methods: {
    confirmValue() {
      this.$emit('pick');
    },

    handleConfirm() {
      this.color.fromString(this.customInput);
    },
  },
};
</script>
<style scoped>
.press-color-wrap {
  padding: 6px;
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  width: 300px;
  position: absolute;
  z-index: 2;
  right: 0;
}

.press-color-upper {
  display: flex;
  justify-content: space-between;
}

.press-color-buttons {
  display: flex;
  margin-top: 6px;
  justify-content: space-between;
}

.press-color-input {
  line-height: 26px;
  font-size: 12px;
  color: #000;
  width: 160px;
}

.press-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  height: 28px;
  line-height: 28px;
}
</style>

<style lang="stylus" scoped>
@require '../../theme/styles/button.styl';
</style>
