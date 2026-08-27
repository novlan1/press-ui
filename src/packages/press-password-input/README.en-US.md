---
url : pages/press/password-input/password-input
---

## PasswordInput 密码输入框

The PasswordInput component is usually used with [NumberKeyboard](./press-number-keyboard.html) Component.

## Usage

### Basic Usage

```html
<press-password-input
  :value="value"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<press-number-keyboard
  v-model="value"
  :show="showKeyboard"
  @blur="showKeyboard = false"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('123');
    const showKeyboard = ref(true);

    return {
      value,
      showKeyboard,
    };
  },
};
```

### Custom Length

```html
<press-password-input
  :value="value"
  :gutter="15"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Add Gutter

```html
<press-password-input
  :value="value"
  :gutter="10"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Without Mask

```html
<press-password-input
  :value="value"
  :mask="false"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Hint Error

Use `info` to set info message, use `error-info` prop to set error message.

```html
<press-password-input
  :value="value"
  info="Some tips"
  :error-info="errorInfo"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<press-number-keyboard
  v-model="value"
  :show="showKeyboard"
  @blur="showKeyboard = false"
/>
```

```js
import { ref, watch } from 'vue';

export default {
  setup() {
    const value = ref('123');
    const errorInfo = ref('');
    const showKeyboard = ref(true);

    watch(value, (newVal) => {
      if (newVal.length === 6 && newVal !== '123456') {
        errorInfo.value = 'Password Mistake';
      } else {
        errorInfo.value = '';
      }
    });

    return {
      value,
      errorInfo,
      showKeyboard,
    };
  },
};
```

## API

### Props

| Attribute  | Description                    | Type               | Default |
| ---------- | ------------------------------ | ------------------ | ------- |
| value      | Password value                 | _string_           | `''`    |
| info       | Bottom info                    | _string_           | -       |
| error-info | Bottom error info              | _string_           | -       |
| length     | Maxlength of password          | _number \| string_ | `6`     |
| gutter     | Gutter of input                | _number \| string_ | `0`     |
| mask       | Whether to mask value          | _boolean_          | `true`  |
| focused    | Whether to show focused cursor | _boolean_          | `false` |

### Events

| Event | Description                   | Arguments |
| ----- | ----------------------------- | --------- |
| focus | Emitted when input is focused | -         |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.

| Name                                    | Default Value               | Description |
| --------------------------------------- | --------------------------- | ----------- |
| --press-password-input-height           | _50px_                      | -           |
| --press-password-input-margin           | _0 var(--press-padding-md)_ | -           |
| --press-password-input-font-size        | _20px_                      | -           |
| --press-password-input-radius           | _6px_                       | -           |
| --press-password-input-background       | _var(--press-background-2)_ | -           |
| --press-password-input-info-color       | _var(--press-text-color-2)_ | -           |
| --press-password-input-info-font-size   | _var(--press-font-size-md)_ | -           |
| --press-password-input-error-info-color | _var(--press-danger-color)_ | -           |
| --press-password-input-dot-size         | _10px_                      | -           |
| --press-password-input-dot-color        | _var(--press-text-color)_   | -           |
| --press-password-input-text-color       | _var(--press-text-color)_   | -           |
| --press-password-input-cursor-color     | _var(--press-text-color)_   | -           |
| --press-password-input-cursor-width     | _1px_                       | -           |
| --press-password-input-cursor-height    | _40%_                       | -           |
| --press-password-input-cursor-duration  | _1s_                        | -           |
