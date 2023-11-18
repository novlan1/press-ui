---
url: pages/press/area-index-bar/area-index-bar
---

## AreaIndexBar 


## Introduction

```ts
import PressAreaIndexBar from 'press-ui/press-area-index-bar/press-area-index-bar';

export default {
   components: {
     PressAreaIndexBar,
   }
}
```

## Code Demo

### Basic usage

```html
<PressAreaIndexBar
   v-if="showAreaIndexBar"
   :index-list="indexList"
   :area-data="areaJson"
   :s-province="province"
   :s-city="city"
   :window-top="44"
   :show-index-list="showIndexList"
   @onUnLimit="handleReSelect"
   @onCancel="closeMatchArea"
   @onConfirm="handleSelectArea"
/>
```

```ts
const AREA_DATA_URL_2 = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/data/area.json';

export default {
   data() {
     return {
       areaJson: [],
       province: '',
       city: '',

       showAreaIndexBar: false,
       showIndexList: true,
     }
   },
   mounted() {
     this.getAreaData();
   },
   methods: {
     onShowAreaIndexBar() {
       this.showAreaIndexBar = true;
     },
     handleReSelect(type) {
       if (type === 'city') {
         this.city = '';
       } else {
         this.province = '';
         this.city = '';
       }
       this.$forceUpdate();
     },
     handleSelectArea(province, city) {
       if (!province) {
         this.city = '';
         this.province = '';
       } else {
         this.province = province;
         this.city = city;
       }
       this.showAreaIndexBar = false;
     },
     closeMatchArea() {
       this.showAreaIndexBar = false;
     },
     getAreaData() {
       new Promise((resolve, reject) => {
         uni.request({
           url: AREA_DATA_URL_2,
           data: {},
           method: 'GET',
           sslVerify: true,
           success: ({ data }) => {
             resolve(data);
             this.areaJson = data;
           },
           fail: (error) => {
             reject(error);
           },
         });
       });
     },
   },
}
```
##API

### Props

| Parameters      | Description                    | Type      | Default value |
| --------------- | ------------------------------ | --------- | ------------- |
| title           | title                          | _boolean_ | `false`       |
| area-data       | area data                      | _array_   | -             |
| s-province      | province                       | _string_  | -             |
| s-city          | city                           | _string_  | -             |
| window-top      | top height                     | _number_  | `0`           |
| show-index-list | Whether to display `indexList` | _boolean_ | `true`        |



### Events

| Event name | Description                           | Parameters                   |
| ---------- | ------------------------------------- | ---------------------------- |
| onCancel   | Click to cancel                       |                              |
| onConfirm  | Click to confirm                      | `province`, `city`           |
| onUnLimit  | Click is not limited to province/city | `type`(`province` or `city`) |