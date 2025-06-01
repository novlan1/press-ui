---
url : pages/press/icon/icon
---

## Icon 图标

基于字体的图标集，可以通过 `Icon` 组件使用，也可以在其他组件中通过 `icon` 属性引用。

## 引入

```ts
import PressIcon from 'press-ui/press-icon/press-icon.vue';

export default {
  components: {
    PressIcon,
  }
}
```

## 代码演示

### 基础用法

`Icon` 的 `name` 属性支持传入图标名称或图片链接。

```html
<press-icon name="close" />
<press-icon name="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_ce77489af93cb34c4b.png" />
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标。

```html
<press-icon name="chat" dot />
<press-icon name="chat" info="9" />
<press-icon name="chat" info="99+" />
```

### 图标颜色

设置`color`属性来控制图标颜色。

```html
<press-icon name="chat" color="red" />
```

### 图标大小

设置`size`属性来控制图标大小。

```html
<press-icon name="chat" size="50px" />
```

### 自定义图标

如果需要在现有 `Icon` 的基础上使用更多图标，可以引入第三方 `iconfont` 对应的字体文件和 CSS 文件，之后就可以在 `Icon` 组件中直接使用。例如，可以在 `app.wxss` 文件中引入。

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e626';
}
```

```html
<!-- 通过 class-prefix 指定类名为 my-icon -->
<press-icon class-prefix="my-icon" name="extra" />
```

## API

### Props

| 参数         | 说明                                       | 类型               | 默认值       |
| ------------ | ------------------------------------------ | ------------------ | ------------ |
| name         | 图标名称或图片链接                         | _string_           | -            |
| dot          | 是否显示图标右上角小红点                   | _boolean_          | `false`      |
| info         | 图标右上角文字提示                         | _string \| number_ | -            |
| color        | 图标颜色                                   | _string_           | `inherit`    |
| size         | 图标大小，如 `20px`，`2em`，默认单位为`px` | _string \| number_ | `inherit`    |
| custom-style | 自定义样式                                 | _string_           | -            |
| class-prefix | 类名前缀                                   | _string_           | `press-icon` |

### Events

| 事件名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| click  | 点击图标时触发 | -    |

## 在线调试

<debug-online />

## 常见问题

### 开发者工具上提示 Failed to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) - 注意事项第 4 条。

### 内部组件使用统计

| 图标名称   | 使用组件                                                     |
| ---------- | ------------------------------------------------------------ |
| success    | tree-select, toast, radio, checkbox, cascader, dropdown-item |
| fail       | toast                                                        |
| cross      | tag, popup, action-sheet                                     |
| clear      | field, fab, image-preview                                    |
| photograph | upload                                                       |
| photo      | image                                                        |
| star       | rate                                                         |
| star-o     | rate                                                         |
| arrow-left | nav-bar, cell                                                |
| arrow-up   | cell                                                         |
| arrow-down | cell                                                         |
| arrow      | cell                                                         |
| back-top   | back-top                                                     |
| checked    | steps                                                        |
