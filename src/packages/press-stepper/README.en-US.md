---
url : pages/press/stepper/stepper
---

## Stepper 

The stepper consists of an increase button, a decrease button and an input box, which are used to input and adjust numbers within a certain range.

## Code Demo

### Basic usage

Set the input value through `value`, and you can listen to the change of the input value through the `change` event.

```html
<press-stepper :value="1" @change="onChange" />
```

```js
export default {
   methods: {
     onChange(val) {
       console. log(val);
     },
   }
};
```

### Step size setting

Use the `step` attribute to set the value that changes each time the increase or decrease button is clicked, and the default is `1`.

```html
<press-stepper :value="1" step="2" />
```

### Limit input range

Limit the range of input values via the `min` and `max` attributes.

```html
<press-stepper :value="5" min="5" max="8" />
```

### Restrict input to integers

After setting the `integer` attribute, the input box will be limited to only integers.

```html
<press-stepper :value="1" integer />
```

### Disabled state

Disable the stepper by setting the `disabled` attribute. In the disabled state, you cannot click the button or modify the input box.

```html
<press-stepper :value="1" disabled />
```

### Disable long press

By setting the `long-press` attribute to determine whether the stepper enables the long press gesture.

```html
<press-stepper :value="1" :long-press="false" />
```

### Fixed decimal places

A fixed number of decimal places can be preserved by setting the `decimal-length` property.

```html
<press-stepper :value="1" step="0.2" :decimal-length="1" />
```

### Asynchronous changes

If you need to modify the value of the input box asynchronously, you can set the `async-change` attribute and manually modify `value` in the `change` event.

```html
<press-stepper :value="value" async-change @change="onChange" />
```

```js
export default {
   data() {
     return {
       value: 1,
     }
   },
   methods: {
     onChange(value) {
       setTimeout(() => {
         this.value = value;
       }, 500);
     }
   },
};
```

### Custom size

Set the width of the input box through the `input-width` attribute, and set the size of the button and the height of the input box through the `button-size` attribute.

```html
<press-stepper :value="1" input-width="40px" button-size="32px" />
```

## API

### Props

| Parameter      | Description                                                                                                                                              | Type               | Default       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------- |
| name           | Identifier when submitted within the form                                                                                                                | _string_           | -             |
| value          | input value                                                                                                                                              | _string \| number_ | minimum value |
| min            | minimum value                                                                                                                                            | _string \| number_ | `1`           |
| max            | maximum value                                                                                                                                            | _string \| number_ | -             |
| step           | step size                                                                                                                                                | _string \| number_ | `1`           |
| integer        | whether only integers are allowed                                                                                                                        | _boolean_          | `false`       |
| disabled       | Whether to disable                                                                                                                                       | _boolean_          | `false`       |
| disable-input  | Whether to disable the input box                                                                                                                         | _boolean_          | `false`       |
| async-change   | Whether to enable asynchronous change, after enabling it, you need to manually control the input value                                                   | _boolean_          | `false`       |
| input-width    | input box width, the default unit is `px`                                                                                                                | _string \| number_ | `32px`        |
| button-size    | The button size, the default unit is `px`, the height of the input box will be consistent with the button size                                           | _string \| number_ | `28px`        |
| show-plus      | Whether to show the add button                                                                                                                           | _boolean_          | `true`        |
| show-minus     | Whether to show the minus button                                                                                                                         | _boolean_          | `true`        |
| decimal-length | fixed number of decimal places                                                                                                                           | _number_           | -             |
| theme          | Style style, optional value is `round`                                                                                                                   | _string_           | -             |
| disable-plus   | Whether to disable the add button                                                                                                                        | _boolean_          | -             |
| disable-minus  | Whether to disable the minus button                                                                                                                      | _boolean_          | -             |
| long-press     | Whether to enable long press gestures                                                                                                                    | _boolean_          | `true`        |
| always-embed   | Force the input to be in the same layer state, and the input will switch to a non-same layer state when it is in focus by default (only valid under iOS) | _boolean_          | `false`       |

### Events

| Event Name | Description                                     | Callback Parameters                   |
| ---------- | ----------------------------------------------- | ------------------------------------- |
| @change    | Event triggered when the bound value changes    | event.detail: the current input value |
| @overlimit | Triggered when an unavailable button is clicked | -                                     |
| @plus      | Fired when the add button is clicked            | -                                     |
| @minus     | Fired when the minus button is clicked          | -                                     |
| @focus     | Triggered when the input box is focused         | -                                     |
| @blur      | Triggered when the input box is out of focus    | -                                     |

### Slot

| Name  | Description  |
| ----- | ------------ |
| plus  | plus button  |
| minus | minus button |

### External style classes

| class name   | description              |
| ------------ | ------------------------ |
| custom-class | root node style class    |
| input-class  | input box style class    |
| plus-class   | plus button style class  |
| minus-class  | Minus button style class |

## Theme customization

<theme-config />