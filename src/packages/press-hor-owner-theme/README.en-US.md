---
url: pages/press/hor-owner-theme/hor-owner-theme
type: horizontal
---

## HorOwnerTheme


## Introduction

```ts
import PressHorOwnerTheme from 'press-ui/press-hor-owner-theme/press-hor-owner-theme';

export default {
   components: {
     PressHorOwnerTheme,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorOwnerTheme
   title="Game hosted by Obama"
   :recommend-map="recommendMap"
   finished-text="No more"
   @back="back"
   @clickMatch="clickMatch"
   @clickMatchButton="clickMatchButton"
   @update:loading="updateLoading"
   @loadMore="loadMore"
/>
```

```ts

export default {
   data() {
     return {
       recommendMap: {
         list: RECOMMEND_LIST,
         finished: false,
         loading: false,
         total: 999,
       },
     };
   },
   methods: {
     loadMoreRecommend() {
       const { recommendMap } = this;
       setTimeout(() => {
         recommendMap.list = recommendMap.list.concat(RECOMMEND_LIST);
         recommendMap.loading = false;
         recommendMap.finished = recommendMap.list.length >= 30;
       }, 1000);
     },
     loadMore(sidebarIndex, tabIndex) {
       console.log('[loadMore]', sidebarIndex, tabIndex);
       this.loadMoreRecommend();
     },
     updateLoading(key, value) {
       this[key].loading = value;
     },
     back() {
       routerBack.call(this);
     },
     clickMatchButton(...args) {
       this.onGTip('[clickMatchButton]');
       console.log('[clickMatchButton]', args);
     },
     clickMatch(...args) {
       this.onGTip('[clickMatch]');
       console.log('[clickMatch]', args);
       this.recommendMap.list = [];
     },
   },
};
```

## API

### Props


| Parameters      | Description                                                                | Type      | Default value |
| --------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| title           | Page title                                                                 | _string_  | ``            |
| recommend-map   | Recommended event information                                              | _object_  | -             |
| immediate-check | Whether to perform scroll position check immediately during initialization | _boolean_ | `false`       |
| finished-text   | Prompt text after loading is completed                                     | _string_  | `No more`     |
| finished-style  | Custom style completed                                                     | _string_  | -             |
| loading-style   | Loading custom style                                                       | _string_  | -             |
| loading-size    | Loading icon size                                                          | _string_  | `20px`        |


### Events

| Event name       | Description                                    | Callback parameters                                   |
| ---------------- | ---------------------------------------------- | ----------------------------------------------------- |
| back             | Click the return icon in the upper left corner | -                                                     |
| clickMatch       | click match                                    | `matchItem`, `matchIndex`, `sidebarIndex`, `tabIndex` |
| clickMatchButton | Click a match button, such as "Details"        | `matchItem`, `matchIndex`, `sidebarIndex`, `tabIndex` |
| update:loading   | update `loading`                               | `key`, `value`                                        |
| loadMore         | Load more                                      | `sidebarIndex`, `tabIndex`                            |


### Slot

| Name  | Description |
| ----- | ----------- |
| empty | empty state |


### Type description

```ts
// recommendMap
type IRecommendMap = {
   finished: boolean;
   loading: boolean;
   total: number;
   list: Array<{
     pic: string;
     name: string;
     joinEnd: string; // Registration end time
     distance: string; // can be distance or province or city
     tagList: Array<string>;
     awardList: Array<{
       type: string;
       name: string;
       img: string;
     }>;

     customTitle: number; // xx friends have joined
     friends: Array<string>;
   }>
}
```
