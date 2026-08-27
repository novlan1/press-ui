---
url : pages/press/watermark/watermark
---

## Watermark

Add specific text or patterns on the page as watermarks, which can be used to prevent information theft.


## Usage

### Text Watermark

Use the `content` prop to set the text of the watermark.

```html
<press-watermark content="Vant" />
```

### Image Watermark

Use the `image` prop to set the watermark image, and use `opacity` prop to adjust the transparency of the watermark.

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  opacity="0.2"
/>
```

### Custom Gap

Use `gap-x` `gap-y` prop to control the gap between watermark items.

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  :gap-x="30"
  :gap-y="10"
  opacity="0.2"
/>
```

### Custom Rotate

Use `rotate` prop to control the rotate of watermark. The default value is `-22`.

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  rotate="22"
  opacity="0.2"
/>
```

### Display Range

Use the `full-page` prop to control the display range of the watermark.

```html
<press-watermark
  image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
  opacity="0.2"
  :full-page="true"
/>
```

### HTML Watermark

Use the `content` slot to pass HTML as watermark. Only supports inline styles, and self-closing tags are not supported.

```html
<press-watermark :width="150">
  <template #content>
    <div style="background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%)">
      <p style="mix-blend-mode: difference; color: #fff">Vant watermark</p>
    </div>
  </template>
</press-watermark>
```

## API

### Props

| Attribute  | Description                                                                                                    | Type               | Default   |
| ---------- | -------------------------------------------------------------------------------------------------------------- | ------------------ | --------- |
| width      | Watermark width                                                                                                | _number_           | `100`     |
| height     | Watermark height                                                                                               | _number_           | `100`     |
| z-index    | Watermark's z-index                                                                                            | _number \| string_ | `100`     |
| content    | Text watermark content                                                                                         | _string_           | -         |
| image      | Image watermark content. If `content` and `image` are passed at the same time, use the `image` watermark first | _string_           | -         |
| rotate     | Watermark rotation angle                                                                                       | _number \| string_ | `-22`     |
| full-page  | Whether to display the watermark in full screen                                                                | _boolean_          | `true`    |
| gap-x      | Horizontal spacing between watermarks                                                                          | _number_           | `0`       |
| gap-y      | Vertical spacing between watermarks                                                                            | _number_           | `0`       |
| text-color | Color of text watermark                                                                                        | _string_           | `#dcdee0` |
| opacity    | Opacity of watermark                                                                                           | _number \| string_ | -         |

### Slots

| Attribute | Description                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content   | Content of HTML watermark. Only supports inline styles, and self-closing tags are not supported. The priority is higher than `content` or `image` props |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.

| Name                      | Default Value | Description             |
| ------------------------- | ------------- | ----------------------- |
| --press-watermark-z-index | _100_         | z-index of root element |
