---
url: pages/press/code-input/code-input
---

## CodeInput


## Introduction

```ts
import PressCodeInput from 'press-ui/press-code-input/press-code-input';

export default {
   components: {
     PressCodeInput,
   }
}
```

## Code Demo

### Basic usage

```html
<PressCodeInput
   v-model="value"
   @change="change"
   @finish="finish"
/>
```

```ts
export default {
   data() {
     return {
       value: ''
     }
   },
   methods: {
     change(value) {
       console.log('change', value);
     },
     finish() {
       console.log('finish');
     },
   },
}
```

### model

Through `mode`, the mode can be set. The optional values are `mode` and `line`, and the default is `mode`.

```html
<PressCodeInput
   v-model="value"
   mode="line"
/>
```

### Custom length

With `max-length`, the length can be customized.

```html
<PressCodeInput
   v-model="value"
   :max-length="4"
/>
```

### Custom spacing

With `space`, the spacing can be customized.

```html
<PressCodeInput
   v-model="value"
   :space="0"
/>
```

### Thin border

Set `hairline` to `true` to display a thin border.


```html
<PressCodeInput
   v-model="value"
   hairline
/>
```

### Custom style

Through `color`, `border-color`, the style can be customized.


```html
<PressCodeInput
   v-model="value"
   color="#f56c6c"
   border-color="#f56c6c"
/>
```

### Hide input content

Set `dot` to `true` to hide the input content.

```html
<PressCodeInput
   v-model="value"
   dot
/>
```

### Automatically get focus

Set `focus` to `true` to automatically obtain focus.

```html
<PressCodeInput
   v-model="value"
   focus
/>
```



##API

### Props

| Parameters        | Description                                                              | Type               | Default value |
| ----------------- | ------------------------------------------------------------------------ | ------------------ | ------------- |
| adjust-position   | Whether to automatically push the page up when the keyboard is popped up | _boolean_          | `true`        |
| max-length        | Maximum input length                                                     | _number_           | `6`           |
| dot               | Whether to fill with dots                                                | _boolean_          | `false`       |
| mode              | display mode, `box` - box mode, `line` - bottom horizontal line mode     | _string_           | `box`         |
| hairline          | Whether to have thin borders                                             | _boolean_          | `false`       |
| space             | distance between characters                                              | _number_           | `10`          |
| value             | preset value                                                             | _string_           | -             |
| focus             | Whether to automatically obtain focus                                    | _boolean_          | `false`       |
| bold              | Whether the font is bold                                                 | _boolean_          | `false`       |
| color             | font color                                                               | _string_           | `#606266`     |
| border-color      | Border and line color                                                    | _string_           | `#c9cacc`     |
| font-size         | font size                                                                | _string \| number_ | `18`          |
| size              | The size of the input box, width equals height                           | _number_           | `35`          |
| disabled-keyboard | Whether to hide the native keyboard and use a custom keyboard            | _boolean_          | `false`       |
| disabled-dot      | Whether to disable the input of `.` symbols                              | _boolean_          | `false`       |



### Events

| Event name | Description                                                                 | Parameters |
| ---------- | --------------------------------------------------------------------------- | ---------- |
| change     | Triggered when the input content changes                                    | `value`    |
| input      | Triggered when the input content changes                                    | `value`    |
| finish     | Triggered when the number of input characters reaches the `maxlength` value | `value`    |