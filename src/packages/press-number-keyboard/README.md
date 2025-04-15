---
url : pages/press/number-keyboard/number-keyboard
---

## Keyboard 键盘

虚拟键盘，可配合输入框或验证码输入组件使用。

## 引入

```ts
import PressNumberKeyboard from 'press-ui/press-number-keyboard/press-number-keyboard';

export default {
  components: {
    PressNumberKeyboard,
  }
}
```

## 代码演示

### 基础用法

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

### 含小数点的数字键盘

将 `mode` 设置为 `accounting` 来显示含小数点的数字键盘，同时可通过设置 `decimal-mark` 自定义小数点。

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

### 身份证号键盘

将 `mode` 设置为 `card` 来显示身份证号键盘。

```html
<PressNumberKeyboard
  :mode="card"
  :show="show"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### 顶部栏

通过 `toolbar` 属性可设置是否显示顶部栏。设置 `cancel-button-text` 和 `confirm-button-text` 来自定义取消和确认按钮文字，空则不显示。

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  :toolbar="true"
  :confirm-button-text="完成"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### 键盘标题

通过`title`属性可设置键盘标题。

```html
<PressNumberKeyboard
  :mode="number"
  :show="show"
  :toolbar="true"
  :title="数字键盘"
  @change="onChange"
  @backspace="onBackspace"
  @close="onClose"
/>
```

### 打乱按键顺序

如将 `random` 属性设置为 `true`，每次打开键盘时按键顺序都是随机的。

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

### 双向绑定

通过 `v-model` 可绑定键盘输入值，并通过 `max-length` 属性来限制最大输入长度。

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

| 参数                   | 说明                                                | 类型      | 默认值   |
| ---------------------- | --------------------------------------------------- | --------- | -------- |
| mode                   | 键盘类型，可选值为 `number`、`accounting` 和 `card` | _string_  | `number` |
| show                   | 是否显示键盘                                        | _boolean_ | `false`  | · |
| toolbar                | 是否显示顶部栏                                      | _boolean_ | `false`  |
| cancel-button-text     | 取消按钮文字，空则不展示                            | _string_  | -        |
| confirm-button-text    | 确认按钮文字，空则不展示                            | _string_  | `确认`   |
| title                  | 键盘标题                                            | _string_  | -        |
| decimal-mark           | 自定义小数点                                        | _string_  | `.`      |
| random                 | 是否打乱按键显示顺序                                | _boolean_ | `false`  |
| max-length             | 输入值最大长度，设置为负数时不限制最大长度          | _number_  | `-1`     |
| z-index                | 键盘显示层级                                        | _number_  | `100`    |
| round                  | 是否显示圆角，默认为开启顶部栏时显示圆角            | _boolean_ | -        |
| safe-area-inset-bottom | 是否开启底部安全区适配                              | _boolean_ | `true`   |

### Events

| 事件名    | 说明                 | 参数                  |
| --------- | -------------------- | --------------------- |
| change    | 点击按键输入时触发   | val: 当前输入按键的值 |
| backspace | 点击删除键时触发     | -                     |
| close     | 点击键盘外区域时触发 | -                     |
| cancel    | 点击取消按钮时触发   | -                     |
| confirm   | 点击确认按钮时触发   | -                     |

### Vue3 兼容

`value` 字段 在 Vue3 中使用的是 `model-value`，`input` 事件是 Vue3 中使用的是 `update:modelValue`，支持 `v-model`。
