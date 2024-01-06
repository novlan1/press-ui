<template>
  <div>
    <div class="press-color-picker">
      <div
        class="press-color-picker__trigger"
        :style="{
          backgroundColor: displayedColor
        }"
        @click.stop="handleTrigger"
      />
    </div>
    <PickerDropdown
      v-show="showPicker"
      ref="dropdown"
      :color="color"
      @pick="confirmValue"
      @clear="clearValue"
    />
  </div>
</template>
<script>
import PickerDropdown from './picker-dropdown.vue';
import Color from './color';
import Emitter from './emitter';

export default {
  components: {
    PickerDropdown,
  },
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    const color = new Color({
      // enableAlpha: false,
      // format: this.colorFormat
    });
    return {
      color,
      showPicker: false,
      showPanelColor: false,
    };
  },
  computed: {
    displayedColor() {
      if (!this.value && !this.showPanelColor) {
        return 'transparent';
      }

      return this.displayedRgb(this.color, this.showAlpha);
    },
  },
  watch: {
    value(val) {
      if (!val) {
        this.showPanelColor = false;
      } else if (val && val !== this.color.value) {
        this.color.fromString(val);
      }
    },
    color: {
      deep: true,
      handler() {
        this.showPanelColor = true;
      },
    },
    displayedColor(val) {
      if (!this.showPicker) return;
      const currentValueColor = new Color({
        enableAlpha: this.showAlpha,
        format: this.colorFormat,
      });
      currentValueColor.fromString(this.value);

      const currentValueColorRgb = this.displayedRgb(currentValueColor, this.showAlpha);
      if (val !== currentValueColorRgb) {
        this.$emit('active-change', val);
      }
    },
  },
  mounted() {
    const { value } = this;
    if (value) {
      this.color.fromString(value);
    }
    this.popperElm = this.$refs.dropdown.$el;
    document.addEventListener('click', this.onDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  },
  methods: {
    onDocumentClick(event) {
      if (!this.$el.contains(event.target)) {
        this.showPicker = false;
      }
    },
    handleTrigger() {
      if (this.colorDisabled) return;
      this.showPicker = !this.showPicker;
    },
    confirmValue() {
      const { value } = this.color;
      this.$emit('input', value);
      this.$emit('change', value);
      this.dispatch('ElFormItem', 'el.form.change', value);
      this.showPicker = false;
    },
    clearValue() {
      this.$emit('input', null);
      this.$emit('change', null);
      if (this.value !== null) {
        this.dispatch('ElFormItem', 'el.form.change', null);
      }
      this.showPanelColor = false;
      this.showPicker = false;
      this.resetColor();
    },
    hide() {
      this.showPicker = false;
      this.resetColor();
    },
    resetColor() {
      this.$nextTick(() => {
        if (this.value) {
          this.color.fromString(this.value);
        } else {
          this.showPanelColor = false;
        }
      });
    },
    displayedRgb(color, showAlpha) {
      if (!(color instanceof Color)) {
        throw Error('color should be instance of Color Class');
      }

      const { r, g, b } = color.toRgb();
      return showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
        : `rgb(${r}, ${g}, ${b})`;
    },
  },
};
</script>
<style scoped>
.press-color-picker {
  display: inline-block;
  position: relative;
  line-height: normal;
  height: 40px;
}

.press-color-picker__trigger {
  display: inline-block;
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  padding: 4px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 0;
  position: relative;
  cursor: pointer;
}
</style>
