---
url : pages/press/loading-plus/loading-plus
---

## LoadingPlus 加载中

加载中，分为图片模式和页面模式两种。


## 引入

```ts
import PressLoadingPlus from 'press-ui/press-loading-plus/press-loading-plus.vue';

export default {
  components: {
    PressLoadingPlus,
  }
}
```

## 代码演示

### 基本用法

**示例**


```vue
<template>
  <press-loading-plus />
  <press-loading-plus loading-scenes="btn" />
  <press-loading-plus
    loading-scenes="page"
    loading-bg="#eee"
  />
</template>

<script>
import PressLoadingPlus from 'press-ui/press-loading-plus/press-loading-plus.vue';

export default {
  component: {
    PressLoadingPlus,
  },
};

</script>
```


## API

### Props

| 参数           | 说明                                | 类型     | 默认值 |
| -------------- | ----------------------------------- | -------- | ------ |
| loading-bg     | `loading`背景色                     | _string_ | -      |
| loading-scenes | `loading`的场景，可选项：`page/btn` | _string_ | `page` |

## 在线调试

<debug-online />

## 常见问题

### 实现原理

`press-loading` 采用的是绝对定位，`left/right/bottom/top` 均为`0`，所以要改变其高度，只需要修改最近的 `position: relative`的祖先元素（父元素）即可。
