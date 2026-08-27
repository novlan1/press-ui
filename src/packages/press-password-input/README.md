---
url : pages/press/password-input/password-input
---

## PasswordInput 密码输入框

带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与[数字键盘](./press-number-keyboard.html)组件配合使用。

## 引入

```ts
import PressPasswordInput from 'press-ui/press-password-input/press-password-input.vue';

export default {
  components: {
    PressPasswordInput,
  }
}
```

## 代码演示

### 基础用法

搭配数字键盘组件来实现密码输入功能。

```html
<!-- 密码输入框 -->
<press-password-input
  :value="value"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<!-- 数字键盘 -->
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

### 自定义长度

通过 `length` 属性来设置密码长度。

```html
<press-password-input
  :value="value"
  :length="4"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### 格子间距

通过 `gutter` 属性来设置格子之间的间距。

```html
<press-password-input
  :value="value"
  :gutter="10"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入的内容，适用于短信验证码等场景。

```html
<press-password-input
  :value="value"
  :mask="false"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### 提示信息

通过 `info` 属性设置提示信息，通过 `error-info` 属性设置错误提示，例如当输入六位时提示密码错误。

```html
<press-password-input
  :value="value"
  info="密码为 6 位数字"
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
        errorInfo.value = '密码错误';
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

| 参数       | 说明                                                  | 类型               | 默认值  |
| ---------- | ----------------------------------------------------- | ------------------ | ------- |
| value      | 密码值                                                | _string_           | `''`    |
| info       | 输入框下方文字提示                                    | _string_           | -       |
| error-info | 输入框下方错误提示                                    | _string_           | -       |
| length     | 密码最大长度                                          | _number \| string_ | `6`     |
| gutter     | 输入框格子之间的间距，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `0`     |
| mask       | 是否隐藏密码内容                                      | _boolean_          | `true`  |
| focused    | 是否已聚焦，聚焦时会显示光标                          | _boolean_          | `false` |

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| focus  | 输入框聚焦时触发 | -        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                    | 默认值                      | 描述 |
| --------------------------------------- | --------------------------- | ---- |
| --press-password-input-height           | _50px_                      | -    |
| --press-password-input-margin           | _0 var(--press-padding-md)_ | -    |
| --press-password-input-font-size        | _20px_                      | -    |
| --press-password-input-radius           | _6px_                       | -    |
| --press-password-input-background       | _var(--press-background-2)_ | -    |
| --press-password-input-info-color       | _var(--press-text-color-2)_ | -    |
| --press-password-input-info-font-size   | _var(--press-font-size-md)_ | -    |
| --press-password-input-error-info-color | _var(--press-danger-color)_ | -    |
| --press-password-input-dot-size         | _10px_                      | -    |
| --press-password-input-dot-color        | _var(--press-text-color)_   | -    |
| --press-password-input-text-color       | _var(--press-text-color)_   | -    |
| --press-password-input-cursor-color     | _var(--press-text-color)_   | -    |
| --press-password-input-cursor-width     | _1px_                       | -    |
| --press-password-input-cursor-height    | _40%_                       | -    |
| --press-password-input-cursor-duration  | _1s_                        | -    |
