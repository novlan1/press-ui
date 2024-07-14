---
url : pages/press/link/link
---

## Link 链接

- 在 H5 中通过 `window.open` 打开链接
- 在 APP 平台会通过 `plus` 环境打开内置浏览器
- 在小程序中把链接复制到粘贴板，同时提示信息
  
## 引入

```ts
import PressLink from 'press-ui/press-link/press-link';

export default {
  components: {
    PressLink,
  }
}
```

## 代码演示

### 基础用法

通过 `href` 设置打开的链接，`text` 设置显示的内容。


```html
<PressLink
  :text="t('openDocs')"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

```ts
export default {
  methods: {
    click() {}
  }
}
```

### 下划线

通过 `underline` 设置是否显示链接的下划线。

```html
<PressLink
  underline
  :text="t('openDocs')"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

### 自定义颜色

通过 `color` 设置文字颜色。

```html
<PressLink
  :text="t('openDocs')"
  color="#19be6b"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

## API

### Props

| 参数      | 说明                         | 类型               | 默认值                       |
| --------- | ---------------------------- | ------------------ | ---------------------------- |
| text      | 文本                         | _string_           | -                            |
| color     | 文字颜色                     | _string_           | `#2979ff`                    |
| font-size | 字体大小，单位 `px`          | _string \| number_ | `15`                         |
| underline | 是否显示下划线               | _boolean_          | `false`                      |
| href      | 要跳转的链接                 | _string_           | -                            |
| mp-tips   | 小程序中复制到粘贴板的提示语 | _string_           | `链接已复制，请在浏览器打开` |



### Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| click  | 点击 | -    |

## 在线调试

<debug-online />
