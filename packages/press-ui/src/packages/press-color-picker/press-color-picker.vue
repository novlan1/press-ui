<template>
  <div class="press-color-picker__panel">
    <div
      :class="[
        'press-color-picker__body', `press-color-picker__body--${type}`
      ]"
    >
      <div
        v-if="isMultiple"
        class="press-color-picker__saturation"
        data-type="saturation"
        :style="{background: `hsl(${sliderInfo.value}, 100%, 50%)`}"
        @touchstart.stop.prevent="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend.stop.prevent="onTouchEnd"
      >
        <div
          class="press-color-picker__thumb"
          :style="true ? styleUtil(saturationThumbStyle) : ''"
        />
      </div>
      <div
        v-if="isMultiple"
        class="press-color-picker__sliders-wrapper"
      >
        <div class="press-color-picker__sliders">
          <div class="press-color-picker__slider-wrapper  press-color-picker__slider-wrapper--hue-type">
            <div
              class="press-color-picker__slider"
              data-type="hue-slider"
              @touchstart.stop.prevent="onTouchStart"
              @touchmove.stop.prevent="onTouchMove"
              @touchend.stop.prevent="onTouchEnd"
            >
              <div class="press-color-picker__rail" />
              <div
                class="press-color-picker__thumb"
                :style="true ? styleUtil(hueSliderStyle) : ''"
              />
            </div>
          </div>

          <div
            v-if="enableAlpha"
            class="press-color-picker__slider-wrapper press-color-picker__slider-wrapper--alpha-type"
          >
            <div
              class="press-color-picker__slider-padding"
              :style="sliderPaddingStyle"
            />
            <div
              class="press-color-picker__slider"
              data-type="alpha-slider"
              @touchstart.stop.prevent="onTouchStart"
              @touchmove.stop.prevent="onTouchMove"
              @touchend.stop.prevent="onTouchEnd"
            >
              <div
                class="press-color-picker__rail"
                :style="{background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${alphaSliderStyle.color})`}"
              />
              <div
                class="press-color-picker__thumb"
                :style="true ? styleUtil(alphaSliderStyle) : ''"
              />
            </div>
          </div>
        </div>

        <div
          v-if="showPreview"
          class="press-color-picker__sliders-preview press-color-picker--bg-alpha"
        >
          <div
            class="press-color-picker__sliders-preview-inner"
            :style="{background: previewColor}"
          />
        </div>
      </div>

      <div
        v-if="isMultiple"
        class="press-color-picker__format"
      >
        <div class="press-color-picker__format-item press-color-picker__format-item--first">
          {{ format }}
        </div>
        <div class="press-color-picker__format-item press-color-picker__format-item--second">
          <div class="press-color-picker__format-inputs">
            <div
              v-for="(format, formatIndex) of formatList"
              :key="getUniqueKey(format, formatIndex)"
              :class="[
                utils.bem2(
                  'color-picker__format-input',
                  [formatIndex === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base' ]
                )
              ]"
            >
              {{ format }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="innerSwatchList.length"
        class="press-color-picker__swatches-wrap"
      >
        <div class="press-color-picker__swatches">
          <div
            v-if="isMultiple"
            class="press-color-picker__swatches-title"
          >
            系统预设色彩
          </div>
          <div class="press-color-picker__swatches-items">
            <div
              v-for="(swatch) of innerSwatchList"
              :key="swatch"
              class="press-color-picker__swatches-item"
              data-value="swatch"
              @click.stop="() => clickSwatch(swatch)"
            >
              <div class="press-color-picker__swatches-color">
                <div
                  class="press-color-picker__swatches-inner"
                  :style="{backgroundColor: swatch}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import props from './props';
import {
  SATURATION_PANEL_DEFAULT_HEIGHT,
  SATURATION_PANEL_DEFAULT_WIDTH,
  SLIDER_DEFAULT_WIDTH,
  DEFAULT_COLOR,
  ALPHA_MAX,
  HUE_MAX,
} from './constants';
import { getFormatList, genSwatchList, getCoordinate } from './helper';
import { getColorObject, Color } from '../common/color-picker';
import { getRect } from '../common/dom/rect';
import utils from '../common/utils/utils';
import styleUtil from '../common/utils/style';


const COMPONENT_NAME = 'press-color-picker';

export default {
  name: 'PressColorPicker',
  props,
  data() {
    const temp = this.defaultValue || this.value;
    const color = new Color(props.defaultValue.value || props.value.value || DEFAULT_COLOR);

    return {
      panelRect: {
        width: SATURATION_PANEL_DEFAULT_WIDTH,
        height: SATURATION_PANEL_DEFAULT_HEIGHT,
      },
      sliderRect: {
        width: SLIDER_DEFAULT_WIDTH,
      },
      saturationInfo: {
        saturation: 0,
        value: 0,
      },
      saturationThumbStyle: {
        left: 0,
        top: 0,
      },
      sliderInfo: {
        value: 0, // hue
      },
      hueSliderStyle: {
        left: 0,
      },
      alphaSliderStyle: {
        left: 0,
      },
      innerValue: temp,
      previewColor: temp,
      formatList: getFormatList(this.format, color),
      innerSwatchList: genSwatchList(this.swatchColors),
      isMultiple: this.type === 'multiple',
      utils,
      color,
      styleUtil,
    };
  },
  computed: {
    sliderPaddingStyle() {
      const { alphaSliderStyle } = this;
      const result = styleUtil({
        background: `linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ${alphaSliderStyle.color} 93%, ${alphaSliderStyle.color} 100%)`,
      });
      return result;
    },
  },
  watch: {
    innerValue(value) {
      if (value !== this.formatValue()) {
        this.updateColor();
      }
    },
    format() {
      this.setCoreStyle();
    },
    swatchColors(value) {
      this.setData({
        innerSwatchList: genSwatchList(value),
      });
    },
    type(value) {
      this.setData({
        isMultiple: value === 'multiple',
      });
    },

  },
  mounted() {
    this.init();
  },
  methods: {
    setData(data, cb) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
      if (typeof cb === 'function') {
        setTimeout(() => {
          cb();
        });
      }
    },
    init() {
      this.updateColor();
      this.getRectInfo().then(() => {
        this.setCoreStyle();
      });
    },
    getRectInfo() {
      return new Promise((resolve, reject) => {
        Promise.all([
          getRect(this, `.${COMPONENT_NAME}__saturation`),
          getRect(this, `.${COMPONENT_NAME}__slider`),
        ])
          .then(([saturationRect, sliderRect]) => {
            this.setData(
              {
                panelRect: {
                  width: saturationRect.width || SATURATION_PANEL_DEFAULT_WIDTH,
                  height: saturationRect.height || SATURATION_PANEL_DEFAULT_HEIGHT,
                  top: saturationRect.top,
                  left: saturationRect.left,
                },
                sliderRect: {
                  width: sliderRect.width || SLIDER_DEFAULT_WIDTH,
                  top: sliderRect.top,
                  left: sliderRect.left,
                },
              },
              () => {
                resolve();
              },
            );
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    clickSwatch(swatch) {
      this.color.update(swatch);
      this.emitColorChange('preset');
      this.setCoreStyle();
    },
    setCoreStyle() {
      this.setData({
        sliderInfo: {
          value: this.color.hue,
        },
        hueSliderStyle: this.getSliderThumbStyle({ value: this.color.hue, maxValue: HUE_MAX }),
        alphaSliderStyle: this.getSliderThumbStyle({ value: this.color.alpha * 100, maxValue: ALPHA_MAX }),
        saturationInfo: {
          saturation: this.color.saturation,
          value: this.color.value,
        },
        saturationThumbStyle: this.getSaturationThumbStyle({
          saturation: this.color.saturation,
          value: this.color.value,
        }),
        previewColor: this.color.rgba,
        formatList: getFormatList(this.format, this.color),
      });
    },
    emitColorChange(trigger) {
      this.setData({
        innerValue: this.formatValue(),
      });
      this.$emit('change', {
        value: this.formatValue(),
        context: {
          trigger,
          color: getColorObject(this.color),
        },
      });
    },
    defaultEmptyColor() {
      return DEFAULT_COLOR;
    },
    updateColor() {
      const result = this.innerValue || this.defaultEmptyColor();
      this.color.update(result);
    },
    getSaturationAndValueByCoordinate(coordinate) {
      const { width, height } = this.panelRect;
      const { x, y } = coordinate;
      let saturation = x / width;
      let value = 1 - y / height;
      saturation = Math.min(1, Math.max(0, saturation));
      value = Math.min(1, Math.max(0, value));

      return {
        saturation,
        value,
      };
    },
    getSaturationThumbStyle({ saturation, value }) {
      const { width, height } = this.panelRect;
      const top = Math.round((1 - value) * height);
      const left = Math.round(saturation * width);
      return {
        color: this.color.rgb,
        left: `${left}px`,
        top: `${top}px`,
      };
    },
    getSliderThumbStyle({ value, maxValue }) {
      const { width } = this.sliderRect;
      if (!width) {
        return;
      }
      const left = Math.round((value / maxValue) * 100);
      return {
        left: `${left}%`,
        color: this.color.rgb,
      };
    },
    onChangeSaturation({ saturation, value }) {
      const { saturation: sat, value: val } = this.color;
      let changeTrigger = 'palette-saturation-brightness';
      if (value !== val && saturation !== sat) {
        this.color.saturation = saturation;
        this.color.value = value;
        changeTrigger = 'palette-saturation-brightness';
      } else if (saturation !== sat) {
        this.color.saturation = saturation;
        changeTrigger = 'palette-saturation';
      } else if (value !== val) {
        this.color.value = value;
        changeTrigger = 'palette-brightness';
      } else {
        return;
      }

      this.$emit('palette-bar-change', {
        color: getColorObject(this.color),
      });

      this.emitColorChange(changeTrigger);
      this.setCoreStyle();
    },
    formatValue() {
      return this.color.getFormatsColorMap()[this.format] || this.color.css;
    },
    onChangeSlider({ value, isAlpha }) {
      if (isAlpha) {
        this.color.alpha = value / 100;
      } else {
        this.color.hue = value;
      }

      this.emitColorChange(isAlpha ? 'palette-alpha-bar' : 'palette-hue-bar');

      this.setCoreStyle();
    },
    handleSaturationDrag(e) {
      const coordinate = getCoordinate(e, this.panelRect.top, this.panelRect.left);
      const { saturation, value } = this.getSaturationAndValueByCoordinate(coordinate);
      this.onChangeSaturation({ saturation, value });
    },
    handleSliderDrag(e, isAlpha = false) {
      const coordinate = getCoordinate(e, this.sliderRect.top, this.sliderRect.left);
      const { width } = this.sliderRect;
      const { x } = coordinate;
      const maxValue = isAlpha ? ALPHA_MAX : HUE_MAX;

      let value = Math.round((x / width) * maxValue * 100) / 100;
      if (value < 0) value = 0;
      if (value > maxValue) value = maxValue;
      this.onChangeSlider({ value, isAlpha });
    },
    handleDiffDrag(e) {
      // 非 uni-app 不一定有 event.currentTarget
      const dragType = e.target.dataset.type || e.currentTarget?.dataset?.type;
      switch (dragType) {
        case 'saturation':
          this.handleSaturationDrag(e);
          break;
        case 'hue-slider':
          this.handleSliderDrag(e);
          break;
        case 'alpha-slider':
          this.handleSliderDrag(e, true);
          break;
        default:
          break;
      }
    },
    onTouchStart(e) {
      this.getRectInfo().then(() => {
        this.handleDiffDrag(e);
      });
    },
    onTouchMove(e) {
      this.handleDiffDrag(e);
    },
    onTouchEnd(e) {
      setTimeout(() => {
        this.handleDiffDrag(e);
      });
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
