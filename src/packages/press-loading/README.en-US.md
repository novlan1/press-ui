---
url : pages/press/loading/loading
---

## Loading 

Loading, divided into picture mode and page mode

### Basic Usage

**example**


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
     Press Loading,
   },
};

</script>
```


## API

### Props

| Property Name |  Type  | Default Value |           Description            |
| :-----------: | :----: | :-----------: | :------------------------------: |
|   loadingBg   | String |       -       |     loading background color     |
| loadingScenes | String |     page      | loading scene, options: page/btn |
