---
url : pages/press/field/field
---

## Field 输入框


用户可以在文本框内输入或编辑文字。



## 引入

```ts
import PressField from 'press-ui/press-field/press-field';

export default {
  components: {
    PressField,
  }
}
```

## 代码演示

### 基础用法

```html
<press-cell-group>
  <press-field
    :value="value"
    placeholder="请输入用户名"
    :border="false"
    @change="onChange"
  />
</press-cell-group>
```

```js
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
  }
};
```

### 自定义类型

根据`type`属性定义不同类型的输入框。

```html
<press-cell-group>
  <press-field
    :value="username"
    required
    clearable
    label="用户名"
    icon="question-o"
    placeholder="请输入用户名"
    @click-icon="onClickIcon"
  />

  <press-field
    :value="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
    :border="false"
  />
</press-cell-group>
```

### 禁用输入框

```html
<press-cell-group>
  <press-field
    value="输入框已禁用"
    label="用户名"
    left-icon="contact"
    disabled
    :border="false"
  />
</press-cell-group>
```

### 错误提示

通过`error`或者`error-message`属性增加对应的错误提示。

```html
<press-cell-group>
  <press-field
    :value="username"
    label="用户名"
    placeholder="请输入用户名"
    error
  />
  <press-field
    :value="phone"
    label="手机号"
    placeholder="请输入手机号"
    error-message="手机号格式错误"
    :border="false"
  />
</press-cell-group>
```

### 内容对齐方式

可以通过`input-align`属性设置内容的对齐方式。

```html
<press-cell-group>
  <press-field
    :value="username"
    label="用户名"
    placeholder="请输入用户名"
    input-align="right"
  />
</press-cell-group>
```

### 高度自适应

对于 textarea，可以通过`autosize`属性设置高度自适应。

```html
<press-cell-group>
  <press-field
    :value="message"
    label="留言"
    type="textarea"
    placeholder="请输入留言"
    autosize
    :border="false"
  />
</press-cell-group>
```

### 插入按钮

通过 button slot 可以在输入框尾部插入按钮。

```html
<press-cell-group>
  <press-field
    :value="sms"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
    :border="false"
    use-button-slot
  >
    <press-button slot="button" size="small" type="primary">
      发送验证码
    </press-button>
  </press-field>
</press-cell-group>
```

## API

### Props

| 参数                    | 说明                                                                                                        | 类型                | 默认值  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| name                    | 在表单内提交时的标识符                                                                                      | _string_            | -       |
| label                   | 输入框左侧文本                                                                                              | _string_            | -       |
| size                    | 单元格大小，可选值为 `large`                                                                                | _string_            | -       |
| value                   | 当前输入的值                                                                                                | _string \| number_  | -       |
| type                    | 可设置为任意原生类型, 如 `number` `idcard` `textarea` `digit`                                               | _string_            | `text`  |
| fixed                   | 如果 type 为 `textarea` 且在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true                    | _boolean_           | `false` |
| focus                   | 获取焦点                                                                                                    | _boolean_           | `false` |
| border                  | 是否显示内边框                                                                                              | _boolean_           | `true`  |
| disabled                | 是否禁用输入框                                                                                              | _boolean_           | `false` |
| readonly                | 是否只读                                                                                                    | _boolean_           | `false` |
| clearable               | 是否启用清除控件                                                                                            | _boolean_           | `false` |
| clickable               | 是否开启点击反馈                                                                                            | _boolean_           | `false` |
| required                | 是否显示表单必填星号                                                                                        | _boolean_           | `false` |
| center                  | 是否使内容垂直居中                                                                                          | _boolean_           | `false` |
| password                | 是否是密码类型                                                                                              | _boolean_           | `false` |
| title-width             | 标题宽度                                                                                                    | _string_            | `6.2em` |
| maxlength               | 最大输入长度，设置为 -1 的时候不限制最大长度                                                                | _number_            | `-1`    |
| placeholder             | 输入框为空时占位符                                                                                          | _string_            | -       |
| placeholder-style       | 指定 placeholder 的样式                                                                                     | _string_            | -       |
| custom-class            | 自定义类名，会加在组件最外层                                                                                | _string_            | -       |
| custom-style            | 自定义样式，作用于 cell                                                                                     | _string_            | -       |
| wrapper-style           | 自定义样式，作用于组件最外层                                                                                | _string_            | -       |
| is-link                 | 是否展示右侧箭头并开启点击反馈                                                                              | _boolean_           | `false` |
| arrow-direction         | 箭头方向，可选值为 `left` `up` `down`                                                                       | _string_            | -       |
| show-word-limit         | 是否显示字数统计，需要设置`maxlength`属性                                                                   | _boolean_           | `false` |
| error                   | 是否将输入内容标红                                                                                          | _boolean_           | `false` |
| error-message           | 底部错误提示文案，为空时不展示                                                                              | _string_            | `''`    |
| error-message-align     | 底部错误提示文案对齐方式，可选值为 `center` `right`                                                         | _string_            | `''`    |
| input-align             | 输入框内容对齐方式，可选值为 `center` `right`                                                               | _string_            | `left`  |
| autosize                | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| object_ | `false` |
| left-icon               | 左侧图标名称或图片链接，可选值见 [Icon 组件](./press-icon-plus)                                             | _string_            | -       |
| right-icon              | 右侧图标名称或图片链接，可选值见 [Icon 组件](./press-icon-plus)                                             | _string_            | -       |
| confirm-type            | 设置键盘右下角按钮的文字，仅在 type='text' 时生效                                                           | _string_            | `done`  |
| confirm-hold            | 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效                                           | _boolean_           | `false` |
| hold-keyboard           | focus 时，点击页面的时候不收起键盘                                                                          | _boolean_           | `false` |
| cursor-spacing          | 输入框聚焦时底部与键盘的距离                                                                                | _number_            | `50`    |
| adjust-position         | 键盘弹起时，是否自动上推页面                                                                                | _boolean_           | `true`  |
| show-confirm-bar        | 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效                                                    | _boolean_           | `true`  |
| selection-start         | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用                                                   | _number_            | `-1`    |
| selection-end           | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用                                                 | _number_            | `-1`    |
| auto-focus              | 自动聚焦，拉起键盘                                                                                          | _boolean_           | `false` |
| disable-default-padding | 是否去掉 iOS 下的默认内边距，只对 textarea 有效                                                             | _boolean_           | `true`  |
| cursor                  | 指定 focus 时的光标位置                                                                                     | _number_            | `-1`    |
| clear-trigger           | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示               | _string_            | `focus` |
| always-embed            | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)                             | _boolean_           | `false` |

### Events

| 事件                  | 说明                                     | 回调参数                                                                                                 |
| --------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| @input                | 输入内容时触发                           | event.detail: 当前输入值                                                                                 |
| @change               | 输入内容时触发                           | event.detail: 当前输入值                                                                                 |
| @confirm              | 点击完成按钮时触发                       | event.detail: 当前输入值                                                                                 |
| @click-icon           | 点击尾部图标时触发                       | -                                                                                                        |
| @focus                | 输入框聚焦时触发                         | event.detail.value: 当前输入值; <br>event.detail.height: 键盘高度                                        |
| @blur                 | 输入框失焦时触发                         | event.detail.value: 当前输入值; <br>event.detail.cursor: 游标位置(如果 `type` 不为 `textarea`，值为 `0`) |
| @clear                | 点击清空控件时触发                       | -                                                                                                        |
| @click-input          | 点击输入区域时触发                       | -                                                                                                        |
| @linechange           | 输入框行数变化时调用，只对 textarea 有效 | event.detail = { height: 0, heightRpx: 0, lineCount: 0 }                                                 |
| @keyboardheightchange | 键盘高度发生变化的时候触发此事件         | event.detail = { height: height, duration: duration }                                                    |

### Slot

| 名称       | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| label      | 自定义输入框标签，如果设置了`label`属性则不生效            |
| left-icon  | 自定义输入框头部图标                                       |
| right-icon | 自定义输入框尾部图标                                       |
| button     | 自定义输入框尾部按钮                                       |
| input      | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 |

### Vue3 兼容

`value` 字段 在 Vue3 中使用的是 `model-value`，`input` 事件是 Vue3 中使用的是 `update:modelValue`，支持 `v-model`。

## 在线调试

<debug-online />
