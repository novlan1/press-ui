---
url: pages/press/hor-owner-index/hor-owner-index
type: horizontal
---

## HorOwnerIndex


## Introduction

```ts
import PressHorOwnerIndex from 'press-ui/press-hor-owner-index/press-hor-owner-index';

export default {
   components: {
     PressHorOwnerIndex,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorOwnerIndex @back="onBack" />
```

```ts
export default {
   data() {
     return {

     };
   },
   methods: {
     onBack() {
       uni.navigateBack();
     },

   },
};
```

## API

### Props

| Parameters      | Description                                                                | Type      | Default value |
| --------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| title           | Page title                                                                 | _string_  | ``            |
| is-owner        | Is it the owner                                                            | _boolean_ | `false`       |
| owner-info      | My owner information                                                       | _object_  | -             |
| recommend-map   | Recommended event information                                              | _object_  | -             |
| my-match-map    | My match information                                                       | _object_  | -             |
| rank-map        | Ranking information                                                        | _object_  | -             |
| my-rank-info    | My ranking                                                                 | _object_  | -             |
| immediate-check | Whether to perform scroll position check immediately during initialization | _boolean_ | `false`       |
| finished-text   | Prompt text after loading is completed                                     | _string_  | `No more`     |
| finished-style  | Custom style completed                                                     | _string_  | -             |
| loading-style   | Loading custom style                                                       | _string_  | -             |
| loading-size    | Loading icon size                                                          | _string_  | `20px`        |


### Events

| Event name         | Description                                    | Callback parameters                                   |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------- |
| back               | Click the return icon in the upper left corner | -                                                     |
| clickOwnerRegister | Click to register the owner                    | -                                                     |
| clickMyOwnerInfo   | Click my owner information                     | -                                                     |
| clickSidebar       | Switch sidebar                                 | `sidebarItem`, `sidebarIndex`, `tabIndex`             |
| changeTab          | Switch horizontal Tab                          | `tab`                                                 |
| clickMatch         | click match                                    | `matchItem`, `matchIndex`, `sidebarIndex`, `tabIndex` |
| clickMatchButton   | Click a match button, such as "Details"        | `matchItem`, `matchIndex`, `sidebarIndex`, `tabIndex` |
| clickRankItem      | Click ranking item                             | `rankItem`, `rankIndex`                               |
| focus              | Follow other users                             | `rankItem`, `rankIndex`                               |
| update:loading     | update `loading`                               | `key`, `value`                                        |
| loadMore           | Load more                                      | `sidebarIndex`, `tabIndex`                            |


### Slot

| Name  | Description |
| ----- | ----------- |
| empty | empty state |


### Type description

```ts
// ownerInfo
typeIOwnerInfo = {
   pic: string;
   name: string;
   lv: string;
}

// recommendMap
type IRecommendMap = {
   finished: boolean;
   loading: boolean;
   total: number;
   list: Array<{
     pic: string;
     name: string;
     joinEnd: string; // Registration end time
     distance: string;
     tagList: Array<string>;
     awardList: Array<{
       type: string;
       name: string;
       img: string;
     }>;

     customTitle: number;
     friends: Array<string>;
   }>
}

// myMatchMap
type IMyMatchMap = {
   0: {
     list: IMyMatchList,
     endList: IMyMatchList,
     finished: boolean;
     loading: boolean;
     showDivider: boolean;
   },
   1: {
     list: IMyMatchList,
     endList: IMyMatchList,
     finished: boolean;
     loading: boolean;
     showDivider: boolean;
   }
}

type IMyMatchList = Array<{
   pic: string;
   name: string;
   matchTime: string; // match time
   distance: string;
   tagList: Array<string>;

   isEnd: boolean;
   isPending: boolean;
   isPlaying: boolean;
   matchStatusDesc: string; //Status text at the top of the button
   buttonText: string;
}>

// rankMap
type IRankMap = {
   finished: boolean;
   loading: boolean;
   list: Array<IRankItem>
}

// myRankInfo
type IMyRankInfo = IRankItem

type IRankItem = {
   pic: string;
   name: string;
   fan: string | number;
   lv: string | number;

   rank: number; // ranking
   isMine: boolean; // Whether it belongs to the current user
   isFocused: boolean; // Whether it has been followed
   showButton: boolean; //Whether to display the button

   num: string | number; // Number of contestants this month
   diffNum?: string | number; // Number of people who are still short of being on the list
}
```

## common problem

### load more

If you set `immediate-check` to `false`, you need to ensure that the height of page 1 is greater than the page height, otherwise no more can be loaded.
