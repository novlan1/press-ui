---
url: pages/press/image/image
---

## Image 


## Introduction

```ts
import PressImage from 'press-ui/press-image/press-image';

export default {
   components: {
     PressImage,
   }
}
```

## Code Demo

### Basic usage

The basic usage is the same as the native `img` tag, and native attributes such as `src`, `width`, and `height` can be set.

```html
<PressImage
   src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_356f9fd1f505c35fa6.jpg"
   width="100"
   height="100"
/>
```

### model

Image cropping and scaling modes can be set through the `mode` attribute.

```html
<PressImage
   width="100"
   height="100"
   mode="aspectFit"
   :src="src"
/>
```

### Circle picture

The image can be set to be rounded through the `round` attribute.

```html
<PressImage
   width="100"
   height="100"
   round
   :src="src"
/>
```
### LoadingPlus prompt

The `Image` component provides a default loading prompt and supports custom content through the `loading` slot.

```html
<PressImage :src="src">
   <template #loading>
     <PressLoading
       type="spinner"
       size="20"
     />
   </template>
</PressImage>
```

### LoadingPlus failure prompt

The `Image` component provides a default loading failure prompt and supports custom content through the `error` slot.

```html
<PressImage :src="src">
   <template #error>
     <span
       style="font-size: 14px;"
     >Loading failed</span>
   </template>
</PressImage>
```


## API

### Props

| Parameters             | Description                                                                                                             | Type               | Default value |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------- |
| src                    | Image address                                                                                                           | _string_           | -             |
| mode                   | Cropping mode, the same as [WeChat Mini Program](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) | _string_           | `scaleToFill` |
| width                  | width, unit is arbitrary, if it is a numerical value, it is in `px` unit                                                | _string \| number_ | `300`         |
| height                 | Height, the unit is arbitrary, if it is a numerical value, it is in `px` unit                                           | _string \| number_ | `225`         |
| round                  | Whether it is round                                                                                                     | _boolean_          | `false`       |
| radius                 | rounded corner value, unit is arbitrary, if it is a numerical value, it is in `px` unit                                 | _number_           | `0`           |
| lazy-load              | Whether to lazy load, only valid for WeChat mini-programs, Apps, Baidu mini-programs, and ByteDance mini-programs       | _boolean_          | `false`       |
| show-menu-by-longpress | Whether to enable the long press image to display the recognition applet code menu, only valid for WeChat applet        | _boolean_          | `false`       |
| loading-icon           | LoadingPlus icon, or small picture                                                                                          | _string_           | `photo`       |
| error-icon             | IconPlus or small picture that failed to load                                                                               | _string_           | `photo-fail`  |
| show-loading           | Whether to display loading icons or custom `slot`                                                                       | _boolean_          | `true`        |
| show-error             | Whether to display the loading error icon or a custom `slot`                                                            | _boolean_          | `true`        |
| fade                   | Whether a fade-in effect is required                                                                                    | _boolean_          | `true`        |
| webp                   | Only supports network resources and is only valid for WeChat mini programs                                              | _boolean_          | `false`       |
| duration               | Transition time with `fade` parameter, unit `ms`                                                                        | _number_           | `500`         |
| background-color       | Background color, used when loading images on dark pages, in order to blend with the background color                   | _string_           | `#f3f4f6`     |
| custom-style           | custom style                                                                                                            | _string_           | -             |



### Events

| Event name | Description                                     | Parameters |
| ---------- | ----------------------------------------------- | ---------- |
| click      | Triggered when the image is clicked             | -          |
| error      | Triggered when image loading fails              | -          |
| load       | Triggered when the image is loaded successfully | -          |