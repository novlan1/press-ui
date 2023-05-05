---
url : pages/press/loading/loading
---

## Loading 加载中

加载中，分为图片模式和页面模式两种

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

|属性名				|类型		|默认值	|说明																																														|
|:-:					|:-:		|:-:		|:-:																																														|
|loadingBg					|String	|-			|loading背景色																																												|
|loadingScenes					|String	|page|loading的场景，可选项：page/btn|





