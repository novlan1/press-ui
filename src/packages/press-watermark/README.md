---
url : pages/press/watermark/watermark
---

## Watermark 水印

在页面上添加特定的文字或图案作为水印，可用于防止信息盗用。

## 引入

```ts
import PressWatermark from 'press-ui/press-watermark/press-watermark.vue';

export default {
  components: {
    PressWatermark,
  }
}
```

## 代码演示

### 文字水印

通过 `content` 属性来设置水印的文字。

```html
<press-watermark content="Vant" />
```

### 图片水印

通过 `image` 属性来设置水印图片，并使用 `opacity` 来调整水印的整体透明度。

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  opacity="0.2"
/>
```

### 自定义间隔

通过 `gap-x` 和 `gap-y` 属性来控制多个重复水印之间的间隔。

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  :gap-x="30"
  :gap-y="10"
  opacity="0.2"
/>
```

### 自定义倾斜角度

通过 `rotate` 属性来控制水印的倾斜角度，默认值为`-22`。

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  rotate="22"
  opacity="0.2"
/>
```

### 显示范围

通过 `full-page` 属性来控制水印的显示范围。

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  opacity="0.2"
  :full-page="true"
/>
```

### HTML 水印

H5 下通过 `content` 插槽可以直接传入 HTML 作为水印。HTML 中的样式仅支持行内样式，同时不支持传入自闭合标签。

```html
<press-watermark :width="150">
  <template #content>
    <div style="background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%)">
      <p style="mix-blend-mode: difference; color: #fff">Vant watermark</p>
    </div>
  </template>
</press-watermark>
```

非 H5 下通过 `watermark` 属性传递 `html`。

## API

### Props

| 参数       | 说明                                                        | 类型               | 默认值    |
| ---------- | ----------------------------------------------------------- | ------------------ | --------- |
| width      | 水印宽度                                                    | _number_           | `100`     |
| height     | 水印高度                                                    | _number_           | `100`     |
| z-index    | 水印的 z-index                                              | _number \| string_ | `100`     |
| content    | 文字水印的内容                                              | _string_           | -         |
| image      | 图片水印的内容，如果与 `content` 同时传入，优先使用图片水印 | _string_           | -         |
| rotate     | 水印的旋转角度                                              | _number \| string_ | `-22`     |
| full-page  | 水印是否全屏显示                                            | _boolean_          | `false`   |
| gap-x      | 水印之间的水平间隔                                          | _number_           | `0`       |
| gap-y      | 水印之间的垂直间隔                                          | _number_           | `0`       |
| text-color | 文字水印的颜色                                              | _string_           | `#dcdee0` |
| opacity    | 水印的透明度                                                | _number \| string_ | -         |

### Slots

| 名称    | 说明                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------- |
| content | HTML 水印的内容，仅支持行内样式，同时不支持传入自闭合标签，优先级高于 `content` 或 `image` 属性 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                      | 默认值 | 描述                  |
| ------------------------- | ------ | --------------------- |
| --press-watermark-z-index | _100_  | 根节点的 z-index 层级 |

## 在线调试

<debug-online />
