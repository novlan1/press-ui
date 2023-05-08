# Quick Start

1. Install the npm package


```bash
npm i press-ui
```


2. Introduce and use normally in the page

For example the `message-detail` component:

```js
<template>
   <PressMessageDetail />
</template>
import PressMessageDetail from 'press-ui/press-message-detail/press-message-detail.vue'

export default {
   components: {
     PressMessageDetail,
   }
}
```

3. Configure `vue.config.js`

Note that you need to configure `transpileDependencies` in `vue.config.js`:

```js
module.exports = {
   transpileDependencies: ['press-ui'],
}
```
