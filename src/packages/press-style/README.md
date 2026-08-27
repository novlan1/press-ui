---
url : pages/press/style/style
---

## Style 内置样式

Press UI 中默认包含了一些常用样式，可以直接通过 `className` 的方式使用。

## 引入

在页面或组件中引入内置样式。

```ts
@import 'press-ui/common/style/press/index.scss';
```

## 代码演示

### 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```xml
<div class="press-ellipsis">
  这是一段宽度限制 250px 的文字，后面的内容会省略。
</div>

<!-- 最多显示两行 -->
<div class="press-multi-ellipsis--l2">
  这是一段最多显示两行的文字，后面的内容会省略。
</div>

<!-- 最多显示三行 -->
<div class="press-multi-ellipsis--l3">
  这是一段最多显示三行的文字，后面的内容会省略。
</div>
```

### 1px 边框

为元素添加 `Retina` 屏幕下的 `1px` 边框（即 `hairline`），基于伪类 `transform` 实现。

```xml
<!-- 上边框 -->
<div class="press-hairline--top"></div>

<!-- 下边框 -->
<div class="press-hairline--bottom"></div>

<!-- 左边框 -->
<div class="press-hairline--left"></div>

<!-- 右边框 -->
<div class="press-hairline--right"></div>

<!-- 上下边框 -->
<div class="press-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="press-hairline--surround"></div>
```
