---
url : pages/press/signature/signature
---

## Signature 签名

Component for signature scene, based on Canvas. 

## Usage


### Basic Usage

When the confirm button is clicked, the component will emit the `submit` event. The first parameter of the event is `data`, which contains the following fields:

- `image`: The image corresponding to the signature, which is in base64 string format. Returns an empty string if the signature is empty.
- `canvas`: The Canvas element.

```html
<press-signature @submit="onSubmit" @clear="onClear" />
<press-image v-if="image" :src="image" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const image = ref('');
    const onSubmit = (data) => {
      image.value = data.image;
    };
    const onClear = () => {};

    return {
      image,
      onSubmit,
      onClear,
    };
  },
};
```

### Pen Color

Use `pen-color` prop to set the color of the brush stroke.

```html
<press-signature pen-color="#ff0000" @submit="onSubmit" @clear="onClear" />
```

### Line Width

Use `line-width` prop to set the width of the line.

```html
<press-signature :line-width="6" @submit="onSubmit" @clear="onClear" />
```

### Background Color

Use `background-color` prop to set the color of the background.

```html
<press-signature background-color="#eee" @submit="onSubmit" @clear="onClear" />
```

## API

### Props

| Parameter           | Description                                    | Type     | Default   |
| ------------------- | ---------------------------------------------- | -------- | --------- |
| type                | Export image type                              | _string_ | `png`     |
| pen-color           | Color of the brush stroke, default is black    | _string_ | `#000`    |
| line-width          | Width of the line                              | _number_ | `3`       |
| background-color    | Background color                               | _string_ | -         |
| tips                | Text that appears when Canvas is not supported | _string_ | -         |
| clear-button-text   | Clear button text                              | _string_ | `Clear`   |
| confirm-button-text | Confirm button text                            | _string_ | `Confirm` |

### Events

| Event Name | Description                              | Callback Parameters                                  |
| ---------- | ---------------------------------------- | ---------------------------------------------------- |
| start      | Emitted when signing starts              | -                                                    |
| end        | Emitted when signing ends                | -                                                    |
| signing    | Emitted when signing                     | _event: TouchEvent_                                  |
| submit     | Emitted when clicking the confirm button | _data: { image: string; canvas: HTMLCanvasElement }_ |
| clear      | Emitted when clicking the cancel button  | -                                                    |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get Signature instance and call instance methods.

| Name   | Description                                                                     | Attribute | Return value |
| ------ | ------------------------------------------------------------------------------- | --------- | ------------ |
| resize | Resize Signature when container element resized or visibility changed           | -         | -            |
| clear  | Can be called to clear the signature                                            | -         | -            |
| submit | Trigger the `submit` event, which is equivalent to clicking the confirm button. | -         | -            |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. 

| Name                                 | Default Value               | Description                    |
| ------------------------------------ | --------------------------- | ------------------------------ |
| --press-signature-padding            | _var(--press-padding-xs)_   | -                              |
| --press-signature-content-height     | _200px_                     | Height of the canvas           |
| --press-signature-content-background | _var(--press-background-2)_ | Background color of the canvas |
| --press-signature-content-border     | _1px dotted #dadada_        | Border style of the canvas     |
