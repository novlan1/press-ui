---
url : pages/press/popup-plus/popup-plus
---

## PopupPlus 弹出层

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

## 引入

```ts
import PressPopupPlus from 'press-ui/press-popup-plus/press-popup-plus';

export default {
  components: {
    PressPopupPlus,
  }
}
```

## 代码演示

### 基础用法

通过`show`属性控制弹出层是否展示。

```html
<press-cell title="展示弹出层" is-link @click="showPopup" />

<press-popup-plus :show="show" @close="onClose">内容</press-popup-plus>
```

```javascript
Page({
  data: {
    show: false,
  },

  showPopup() {
    this.show = true;
  },

  onClose() {
    this.show = false;
  },
});
```

### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`。

```html
<press-popup-plus
  :show="show"
  position="top"
  custom-style="height: 20%;"
  @close="onClose"
/>
```

### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置。

```html
<press-popup-plus
  :show="show"
  closeable
  position="bottom"
  custom-style="height: 20%"
  @close="onClose"
/>

<!-- 自定义图标 -->
<press-popup-plus
  :show="show"
  closeable
  close-icon="close"
  position="bottom"
  custom-style="height: 20%"
  @close="onClose"
/>

<!-- 图标位置 -->
<press-popup-plus
  :show="show"
  closeable
  close-icon-position="top-left"
  position="bottom"
  custom-style="height: 20%"
  @close="onClose"
/>
```

### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式。

```html
<press-popup-plus
  :show="show"
  round
  position="bottom"
  custom-style="height: 20%"
  @close="onClose"
/>
```

### 禁止滚动穿透

使用组件时，会发现内容部分滚动到底时，继续划动会导致底层页面的滚动，这就是滚动穿透。

目前，组件可以通过 `lock-scroll` 属性处理部分滚动穿透问题。 **但由于小程序自身原因，弹窗内容区域仍会出现滚动穿透。** 不过，我们为开发者提供了一个推荐方案以完整解决滚动穿透：

#### [page-meta](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html)

当小程序基础库最低版本在 2.9.0 以上时，即可使用 [page-meta](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html) 组件动态修改页面样式

```html
<!-- page-meta 只能是页面内的第一个节点 -->
<page-meta :page-style="show ? 'overflow: hidden;' : ''" />

<press-popup-plus :show="show" catch:touchstart />
```

## API

### Props

| 参数                   | 说明                                             | 类型               | 默认值   |
| ---------------------- | ------------------------------------------------ | ------------------ | -------- |
| show                   | 是否显示弹出层                                   | _boolean_          | `false`  |
| z-index                | z-index 层级                                     | _number_           | `100`    |
| overlay                | 是否显示遮罩层                                   | _boolean_          | `true`   |
| position               | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_           | `center` |
| duration               | 动画时长，单位为毫秒                             | _number \| object_ | `300`    |
| round                  | 是否显示圆角                                     | _boolean_          | `false`  |
| custom-style           | 自定义弹出层样式                                 | _string_           | `''`     |
| overlay-style          | 自定义遮罩层样式                                 | _string_           | `''`     |
| close-on-click-overlay | 是否在点击遮罩层后关闭                           | _boolean_          | `true`   |
| closeable              | 是否显示关闭图标                                 | _boolean_          | `false`  |
| close-icon             | 关闭图标名称或图片链接                           | _string_           | `cross`  |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离                  | _boolean_          | `true`   |
| safe-area-inset-top    | 是否留出顶部安全距离（状态栏高度）               | _boolean_          | `false`  |
| custom-class           | 自定义类名                                       | _string_           | -        |
| wrap-class             | 自定义最外层类名                                 | _string_           | -        |
| lock-scroll            | 是否锁定背景滚动                                 | _boolean_          | `true`   |

### Events

| 事件名        | 说明             | 参数 |
| ------------- | ---------------- | ---- |
| close         | 关闭弹出层时触发 | -    |
| click-overlay | 点击遮罩层时触发 | -    |
| before-enter  | 进入前触发       | -    |
| enter         | 进入中触发       | -    |
| after-enter   | 进入后触发       | -    |
| before-leave  | 离开前触发       | -    |
| leave         | 离开中触发       | -    |
| after-leave   | 离开后触发       | -    |

## 在线调试

<debug-online />

## 常见问题

### 从 Vant 迁移

`v-model(value)` 需要改成 `show` 属性，以及接收 `close` 事件。

之前：

```html
<van-popup v-model="show">内容</van-popup>
```

现在

```html
<press-popup-plus :show="show" @close="onClose">内容</press-popup-plus>
```

### custom-class

由于历史原因，`PressPopupPlus` 组件的`custom-class` 并不会作用在最外层，而是在中间某层。

如果需要自定义最外层的 `class`，可以传入 `wrap-class`。

