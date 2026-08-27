---
url : pages/press/number-keyboard/number-keyboard
---

## NumberKeyboard

A virtual keyboard component that includes number mode (with or without decimal mark) and ID number mode, and can be used with CodeInput or Field component.

## Import

```ts
import PressNumberKeyboard from 'press-ui/press-number-keyboard/press-number-keyboard.vue';

export default {
  components: {
    PressNumberKeyboard,
  }
}
```

## Usage

### Basic Usage

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

```js
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    onChange(val) {
      console.log('change', val);
    },
    onChange() {
      console.log('backspace');
    },
    onClose() {
      this.show = false;
    }
  }
};
```

### Number Keyboard with Decimal Mark

Set `mode` prop to `accounting` to show a number keyboard wih decimal mark. Use `decimal-mark` prop to customize the decimal mark.

```html
<PressNumberKeyboard
  :mode="accounting"
  :show="show"
  :decimal-mark=","
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### ID Number Keyboard 

Set `mode` to `card` to show a keyboard for entering ID number.

```html
<PressNumberKeyboard
  :mode="card"
  :show="show"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### Keyboard with Topbar

Set `toolbar` prop to `true` to show the topbar. Use `cancel-button-text` and `confirm-button-text` to set the content of the cancel button and the confirm button.

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  :toolbar="true"
  :confirm-button-text="Done"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### Keyboard with Title

Use `title` prop to set the keyboard title.

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  :toolbar="true"
  :title="Number Keyboard"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### Random Key Order

Set `random` prop to `true` to shuffle the order of keys.

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  :random="true"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### Bind Value

Use `v-model` to bind value and use `max-length` prop to set the maximum input length.

```html
<PressNumberKeyboard
  v-model="value"
  :mode="number"
  :show="show"
  :max-length="6"
  @close="onClose"
/>
```

```js
export default {
  data() {
    return {
      value: '',
      show: true,
    }
  },
  methods: {
    onClose() {
      this.show = false;
    }
  }
};
```

## API

### Props

| Parameter              | Description                                                               | Type      | Default   |
| ---------------------- | ------------------------------------------------------------------------- | --------- | --------- |
| mode                   | Mode of the keybord, can be `number`, `accounting` or `card`              | _string_  | `number`  |
| show                   | Whether to show the keyboard                                              | _boolean_ | `false`   |
| toolbar                | Whether to show the toolbar                                               | _boolean_ | `false`   |
| cancel-button-text     | Cacncel button text                                                       | _string_  | -         |
| confirm-button-text    | Confirm button text                                                       | _string_  | `Confirm` |
| title                  | Keyboard title                                                            | _string_  | -         |
| decimal-mark           | Customize the decimal Mark                                                | _string_  | `.`       |
| random                 | Whether to shuffle the order of keys                                      | _boolean_ | `false`   |
| max-length             | Maximum input length (a negative value means no constraint)               | _number_  | `-1`      |
| z-index                | Keyboard z-index                                                          | _number_  | `100`     |
| round                  | Whether to show rounded corners (enabled by default if toolbar is `true`) | _boolean_ | -         |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation                             | _boolean_ | `true`    |

### Events

| Event     | Description                                           | Callback Parameters  |
| --------- | ----------------------------------------------------- | -------------------- |
| change    | Emitted when a key is pressed                         | val: input key value |
| backspace | Emitted when the backspace key is pressed             | -                    |
| close     | Emitted when the area outside the keyboard is pressed | -                    |
| cancel    | Emitted when the cancel button is pressed             | -                    |
| confirm   | Emitted when the confirm button is pressed            | -                    |
