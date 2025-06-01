---
url : pages/press/loading-plus/loading-plus
---

## LoadingPlus 

Loading, divided into picture mode and page mode

### Basic Usage

**example**


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
     Press Loading,
   },
};

</script>
```


## API

### Props

| Property Name | Type   | Default Value | Description                      |
| ------------- | ------ | ------------- | -------------------------------- |
| loadingBg     | String | -             | loading background color         |
| loadingScenes | String | page          | loading scene, options: page/btn |
