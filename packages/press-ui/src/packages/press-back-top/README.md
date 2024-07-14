---
url : pages/press/back-top/back-top
---

## BackTop 返回顶部

当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部。

## 引入

```ts
import PressBackTop from 'press-ui/press-back-top/press-back-top';

export default {
  components: {
    PressBackTop,
  }
}
```

## 代码演示

### 基础用法

父组件监听滚动，传给 `back-top` 组件 `scrollTop`，`back-top` 组件根据 `scrollTop` 和 `top` 的大小，确定是否显示。

如果传入 `scrollToTop` 方法，则执行该方法回到顶部，否则会执行 `uni.pageScrollTo({ scrollTop: 0 })`。


```html
<scroll-view
  scroll-y
  enhanced
  scroll-with-animation
  :scroll-top="newScrollTop"
  @scroll="onScroll"
>
</scroll-view>

<PressBackTop
  :scroll-top="scrollTop"
  :scroll-to-top="scrollToTop"
/>
```

```ts
export default {
  data() {
    return {
      scrollTop: 0,
      newScrollTop: 0,
    }
  },
  
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
   scrollToTop() {
      that.newScrollTop = that.scrollTop;
      setTimeout(() => {
        that.newScrollTop = 0;
      });
    },
  }
}
```

### 自定义形状

通过 `mode` 可以修改按钮的形状，`circle` 为圆形，`square` 为方形。

```html
<PressBackTop mode="square" />
```

### 自定义图标

通过 `icon` 修改返回顶部按钮的图标，可以是内置的图标，或者图片路径。

```html
<PressBackTop icon="arrow-up" />
```

### 自定义距离

可以通过 `top` 参数，修改页面滚动多少距离时，出现返回顶部的按钮。

```html
<PressBackTop top="10" />
```

### 自定义样式

- 通过 `icon-style` 参数自定义图标的样式，比如颜色，大小等
- 通过 `custom-style` 修改返回按钮的背景颜色，大小等

```html
<PressBackTop icon-style="color: #fff" custom-style="background-color: #2979ff" />
```

### 自定义文本

通过 `text` 参数自定义文本，默认为空。

```html
<PressBackTop text="顶部" />
```

## API

### Props

| 参数          | 说明                                | 类型               | 默认值     |
| ------------- | ----------------------------------- | ------------------ | ---------- |
| mode          | 是否显示弹窗                        | _string_           | `circle`   |
| icon          | 自定义图标                          | _string_           | `back-top` |
| text          | 提示文字                            | _string_           | -          |
| size          | 组件大小，单位 `px`                 | _string \| number_ | `40`       |
| duration      | 返回顶部滚动时间                    | _string_           | `100`      |
| top           | 距离顶部多少时显示组件，单位 `px`   | _string \| number_ | `400`      |
| scroll-top    | 滚动距离                            | _string \| number_ | `0`        |
| bottom        | 返回顶部按钮到底部的距离，单位 `px` | _string \| number_ | `100`      |
| right         | 返回顶部按钮到右边的距离，单位 `px` | _string \| number_ | `20`       |
| z-index       | 层级                                | _string \| number_ | `9`        |
| icon-style    | 图标的样式                          | _string_           | -          |
| scroll-to-top | 自定义滚动方法                      | _function_         | -          |



### Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| click  | 点击 | -    |

## 在线调试

<debug-online />
