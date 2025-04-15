---
url : pages/press/color-picker/color-picker
---

## ColorPicker

## Import

```ts
import PressColorPicker from 'press-ui/press-color-picker/press-color-picker';

export default {
  components: {
    PressColorPicker,
  }
}
```

## Code

### Basic usage

```html
<press-color-picker />
```

### With color palette

With color palette when `type` is set to `multiple`.

```html
<press-color-picker type="multiple"/>
```

### Custom format

The format can be specified through `format`.

The transparent channel can be enabled through `enable-alpha`.

```html
<press-color-picker enable-alpha format="CSS" />
```

## API

### Props

| Parameter     | Description                                                                                                                                                                                                                               | Type      | Default value |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------- |
| enable-alpha  | Whether to enable the alpha channel                                                                                                                                                                                                       | _boolean_ | `false`       |
| format        | Formatted color value. When `enableAlpha` is true, `RGBA/HSLA/HSVA` and other values ​​are valid. Options: `RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS`                                                                                  | _string_  | `RGB`         |
| swatch-colors | System preset color swatches. If the value is `null` or `[]`, the system color will not be displayed. If the value is `undefined`, the built-in system default color of the component will be displayed. TS Type: `Array<string> \| null` | _array_   | -             |
| type          | Color selector type. (`base` means only displaying system presets; `multiple` means displaying palettes and system presets. Options: `base/multiple`.                                                                                     | _string_  | `base`        |
| value         | Color value                                                                                                                                                                                                                               | _string_  | -             |
| default-value | Color value. Uncontrolled property                                                                                                                                                                                                        | _string_  | -             |

### Events

| Event name       | Description                                                                                                                                                                                                                                                                                                                                                | Parameters                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| change           | Triggered when the selected color value changes. The first parameter `value` indicates the new color value, `context.color` indicates the color value of the current palette controller, and `context.trigger` indicates the source of the color change. <br/>`type ColorPickerChangeTrigger = 'palette-hue-bar' \| 'palette-alpha-bar' \| 'preset' `<br/> | `(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger })` |
| paletteBarChange | Triggered when the value of the palette controller changes, `context.color` refers to the value of the palette controller. <br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/>                                     | `(color: ColorObject)`                                                                |

## Online debugging

<debug-online />