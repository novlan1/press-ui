---
url: pages/press/hor-award-explain/hor-award-explain
---

## HorAwardExplain 


## Introduction

```ts
import PressHorAwardExplain from 'press-ui/press-hor-award-explain/press-hor-award-explain';

export default {
   components: {
     PressHorAwardExplain,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorAwardExplain
   v-if="show"
   :award-list="awardList"
   @close="close"
/>
```

```ts
const AWARD_LIST = Array.from({ length: 5 }).map(() => ({
   title: '1-20',
   subItems: Array.from({ length: 5 }).map(() => ({
     pic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/5edb48ca-de79-82c5-4b8f-b6af28124622.jpg',
     name: 'reward name',
     description: 'Reward description reward description reward description reward description reward description reward description reward description reward description reward description reward description reward description',
     label: 'official reward',
   })),
}));


export default {
   data() {
     return {
       awardList: AWARD_LIST,
     };
   },
   methods: {
     close() {
       this.show = false;
     },
   },
};
```


## API

### Props

| Parameters | Description | Type    | Default value |
| ---------- | ----------- | ------- | ------------- |
| award-list | award list  | _array_ | -             |



### Events

| Event name | Description    | Parameters |
| ---------- | -------------- | ---------- |
| close      | Click to close | -          |


### awardList

The awardList types are as follows:

```ts
type IAwardList = Array<{
   title: string;
   subItems: Array<{
     pic: string;
     name: string;
     label?: string;
     description?: string;
   }>;
}>
```