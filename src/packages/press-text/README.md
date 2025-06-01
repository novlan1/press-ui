---
url : pages/press/text/text
---

## Text 文本


## 引入

```ts
import PressText from 'press-ui/press-text/press-text.vue';

export default {
  components: {
    PressText,
  }
}
```

## 代码演示

### 基础用法

通过 `text` 参数设置文本内容。

```html
<PressText text="朝花夕拾" />
```

### 设置主题

通过 `type` 参数可以设置文本主题。

```html
<PressText type="primary" text="主色"/>
<PressText type="error"   text="错误"/>
<PressText type="success" text="成功"/>
<PressText type="warning" text="警告"/>
<PressText type="info" text="信息"/>
```

### 拨打电话

通过将 `mode` 属性设置为 `phone` 即可调用拨打电话，提供加密值 `encrypt`。

```html
<PressText mode="phone" text="19012345678" call/>
<PressText mode="phone" text="19012345678" format="encrypt"/>
```

### 日期格式化

通过将 `mode` 属性设置为 `date`，可使用日期格式，

```html
<PressText mode="date" text="1720633407953"/>
```

### 姓名

通过将 `mode` 属性设置为 `name`，可使用姓名格式。

```html
<PressText mode="name" text="花木兰" format="encrypt"/>
```

### 超链接

添加 `href` 指定链接地址。


```html
<PressText
  mode="link"
  text="Go to Press UI docs"
  href="https://novlan1.github.io/press-ui/"
/>
```

### 显示金额

通过将 `mode` 属性设置为 `name`，可显示金额。

```html
<PressText mode="price" text="728732.32"/>
```

### 前后图标

添加 `prefixIcon`, `suffixIcon` 指定图标和位置，`iconStyle` 设置图标样式。

```html
<PressText
  prefix-icon="like-o"
  icon-style="font-size: 19px"
  :text="t('snow')"
/>
<PressText
  suffix-icon="arrow"
  icon-style="font-size: 18px"
  :text="t('checkMore')"
/>
```

### 超出隐藏

内置了文字超出隐藏样式，设置 `lines` 属性表明几行后隐藏。

```html
<PressText
  :lines="2"
  :text="t('longText')"
/>
```

### 小程序开放能力

通过 `open-type` 可使用小程序开放能力。

```html
<PressText
  text="分享小程序"
  open-type="share"
  type="success"
  @click="onClick"
/>
```

```ts
export default {
  methods: {
    onClick() {},
  }
}
```


## API

### Props

| 参数        | 说明                                                                                             | 类型                         | 默认值        |
| ----------- | ------------------------------------------------------------------------------------------------ | ---------------------------- | ------------- |
| type        | 主题颜色                                                                                         | _string_                     | -             |
| show        | 是否显示                                                                                         | _boolean_                    | `true`        |
| text        | 值                                                                                               | _string_                     | -             |
| prefix-icon | 前置图标                                                                                         | _string_                     | -             |
| suffix-icon | 后置图标                                                                                         | _string_                     | -             |
| mode        | 模式，`text` 普通文本，`price` 价格，`phone` 手机号，`name` 姓名，<br>`date` 日期，`link` 超链接 | _string_                     | -             |
| href        | `mode` 为 `link` 时，配置的链接                                                                  | _string_                     | -             |
| format      | 格式化规则                                                                                       | _string \| function_         | -             |
| call        | `mode` 为 `phone` 时，点击文本是否拨打电话                                                       | _boolean_                    | `false`       |
| open-type   | 小程序的打开方式                                                                                 | _string_                     | -             |
| bold        | 是否粗体                                                                                         | _boolean_                    | `false`       |
| block       | 是否块状                                                                                         | _boolean_                    | `false`       |
| lines       | 文本显示的行数，如果设置，超出此行数，将会显示省略号                                             | _string \| number_           | -             |
| color       | 文本颜色                                                                                         | _string_                     | `#303133`     |
| size        | 字体大小                                                                                         | _string \| number_           | -             |
| icon-style  | 图标的样式                                                                                       | _string_                     | -             |
| decoration  | 文字装饰，下划线，中划线等，可选值 `none                                                         | underline                    | line-through` | _string_ | `none`   |
| margin      | 外边距                                                                                           | _string \| number \| object_ | -             |
| line-height | 文本行高                                                                                         | _string_                     | -             |
| align       | 文本对齐方式，可选值 `left                                                                       | center                       | right`        | _string_ | `left`   |
| word-wrap   | 文字换行，可选值 `break-word                                                                     | normal                       | anywhere`     | _string_ | `normal` |



### Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| click  | 点击 | -    |
