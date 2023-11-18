---
url: pages/press/hor-swiper-light/hor-swiper-light
type: horizontal
horHeight: 445
---

## HorSwiperLight 


## Introduction

Note that this component depends on `@zebra-ui/swiper`, please install it yourself.

```ts
import PressHorSwiperLight from 'press-ui/press-hor-swiper-light/press-hor-swiper-light';

export default {
   components: {
     PressHorSwiperLight,
   }
}
```



## Code Demo

### Basic usage

```html
<PressHorSwiperLight
   v-if="showDialog"
   :list="list"
   @close="close"
   @share="share"
/>
```

```ts
const MOCK_LIST = [
   {
     video: '',
     avatar: 'https://dummyimage.com/40x40',
     name: 'Awesome! Five consecutive masterpieces',
     time: '2022-11-12 23:20',
     source: 'WeChat battle report',
   }, {
     video: '',
     avatar: 'https://dummyimage.com/40x40',
     name: 'Awesome! Five consecutive masterpieces',
     time: '2022-11-12 23:20',
     source: 'WeChat battle report',
   }, {
     video: '',
     avatar: 'https://dummyimage.com/40x40',
     name: 'Awesome! Five consecutive masterpieces',
     time: '2022-11-12 23:20',
     source: 'WeChat battle report',
   },
];

export default {
   data() {
     return {
       list: MOCK_LIST,
       showDialog: true,
     }
   },
   methods: {
     close() {
       this.showDialog = false;
     },
     share() {
       this.onGTip('[share]');
     },
   }
}
```


##API

### Props

| Parameters | Description | Type    | Default value |
| ---------- | ----------- | ------- | ------------- |
| list       | data list   | _array_ | -             |



### Events

| Event name | Description    | Parameters |
| ---------- | -------------- | ---------- |
| share      | Click to share | -          |
| close      | Click to close | -          |


### list type

```ts
type IList = Array<{
   video: string;
   avatar: string;
   name: string;
   time: string;
   source?: string;
}>
```
