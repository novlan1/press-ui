---
url : pages/press/code-input/code-input
---

## CodeInput 验证码输入


## 引入

```ts
import PressCodeInput from 'press-ui/press-code-input/press-code-input';

export default {
  components: {
    PressCodeInput,
  }
}
```

## 代码演示

### 基础用法

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

### 模式

通过 `mode`，可设置模式，可选值为 `mode`、`line`，默认为`mode`。

```html
<PressCodeInput
  v-model="value"
  mode="line"
/>
```

### 自定义长度

通过 `max-length`，可自定义长度。

```html
<PressCodeInput
  v-model="value"
  :max-length="4"
/>
```

### 自定义间距

通过 `space`，可自定义间距。

```html
<PressCodeInput
  v-model="value"
  :space="0"
/>
```

### 细边框

设置 `hairline` 为 `true`，表现为细边框。


```html
<PressCodeInput
  v-model="value"
  hairline
/>
```

### 自定义样式

通过 `color`、`border-color`，可自定义样式。


```html
<PressCodeInput
  v-model="value"
  color="#f56c6c"
  border-color="#f56c6c"
/>
```

### 隐藏输入内容

设置 `dot` 为 `true`，可隐藏输入内容。

```html
<PressCodeInput
  v-model="value"
  dot
/>
```

### 自动获取焦点

设置 `focus` 为 `true`，可自动获取焦点。

```html
<PressCodeInput
  v-model="value"
  focus
/>
```



## API

### Props

| 参数              | 说明                                          | 类型               | 默认值    |
| ----------------- | --------------------------------------------- | ------------------ | --------- |
| adjust-position   | 键盘弹起时，是否自动上推页面                  | _boolean_          | `true`    |
| max-length        | 最大输入长度                                  | _number_           | `6`       |
| dot               | 是否用圆点填充                                | _boolean_          | `false`   |
| mode              | 显示模式，`box`-盒子模式，`line`-底部横线模式 | _string_           | `box`     |
| hairline          | 是否细边框                                    | _boolean_          | `false`   |
| space             | 字符间的距离                                  | _number_           | `10`      |
| value             | 预置值                                        | _string_           | -         |
| focus             | 是否自动获取焦点                              | _boolean_          | `false`   |
| bold              | 字体是否加粗                                  | _boolean_          | `false`   |
| color             | 字体颜色                                      | _string_           | `#606266` |
| border-color      | 边框和线条颜色                                | _string_           | `#c9cacc` |
| font-size         | 字体大小                                      | _string \| number_ | `18`      |
| size              | 输入框的大小，宽等于高                        | _number_           | `35`      |
| disabled-keyboard | 是否隐藏原生键盘，使用自定义键盘              | _boolean_          | `false`   |
| disabled-dot      | 是否禁止输入`.`符号                           | _boolean_          | `false`   |



### Events

| 事件名      | 说明                                | 参数    |
| ----------- | ----------------------------------- | ------- |
| change      | 输入内容发生改变时触发              | `value` |
| input       | 输入内容发生改变时触发              | `value` |
| finish      | 输入字符个数达到`maxlength`值时触发 | `value` |
| click       | 点击外层                            | -       |
| click-input | 点击输入框                          | -       |

## 在线调试

<debug-online />
