---
url : pages/press/color-picker/color-picker
---

## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

组件实现参考了 [TDesign](https://tdesign.tencent.com/vue/components/color-picker)。

## 引入

```ts
import PressColorPicker from 'press-ui/press-color-picker/press-color-picker.vue';

export default {
  components: {
    PressColorPicker,
  }
}
```

## 代码演示

### 基础用法

```html
<press-color-picker />
```

### 带色板

`type` 设置为 `multiple` 时，带色板。

```html
<press-color-picker type="multiple"/>
```

### 自定义格式

通过 `format` 可以指定格式。

通过 `enable-alpha` 可以开启透明通道。

```html
<press-color-picker enable-alpha format="CSS" />
```

### 显示预览

通过 `show-preview` 可以显示预览。

```html
<press-color-picker type="multiple"/>
```

## API

### Props

| 参数          | 说明                                                                                                                                  | 类型      | 默认值  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| enable-alpha  | 是否开启透明通道                                                                                                                      | _boolean_ | `false` |
| format        | 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效。可选项：`RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS`                    | _string_  | `RGB`   |
| swatch-colors | 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色。TS 类型：`Array<string> \| null` | _array_   | -       |
| type          | 颜色选择器类型。（`base` 表示仅展示系统预设内容; `multiple` 表示展示色板和系统预设内容。可选项：`base/multiple`。                     | _string_  | `base`  |
| value         | 色值                                                                                                                                  | _string_  | -       |
| default-value | 色值。非受控属性                                                                                                                      | _string_  | -       |
| show-preview  | 是否展示颜色选择条右侧的颜色预览区域                                                                                                  | _boolean_ | `false` |

### Events


| 事件名           | 说明                                                                                                                                                                                                                                                        | 参数                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| change           | 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源。<br/>`type ColorPickerChangeTrigger = 'palette-hue-bar' \| 'palette-alpha-bar' \| 'preset' `<br/>            | `(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger })` |
| paletteBarChange | 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/> | `(color: ColorObject)`                                                                |




## 在线调试

<debug-online />
