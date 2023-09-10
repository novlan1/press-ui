---
url : pages/press/loading/loading
---

## Loading 加载中

加载中，分为图片模式和页面模式两种。


## 引入

```ts
import PressLoading from 'press-ui/press-loading/press-loading';

export default {
  components: {
    PressLoading,
  }
}
```

## 代码演示

### 基本用法

**示例**


```vue
<template>
  <press-loading />
  <press-loading loading-scenes="btn" />
  <press-loading
    loading-scenes="page"
    loading-bg="#eee"
  />
</template>

<script>
import PressLoading from 'press-ui/press-loading/press-loading';

export default {
  component: {
    PressLoading,
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





