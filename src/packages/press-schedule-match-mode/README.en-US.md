---
url: pages/press/schedule-match-mode/schedule-match-mode
---

## ScheduleMatchMode


## Introduction

```ts
import PressScheduleMatchMode from 'press-ui/press-schedule-match-mode/press-schedule-match-mode';

export default {
   components: {
     PressScheduleMatchMode,
   }
}
```

## Code Demo

### Basic usage

```html
<PressScheMatchMode
   :all-sche-list="allScheList"
   :is-admin="isAdmin"
   :my-sche-list="myScheList"
   @onJumpToSetPage="onJumpToSetPage"
   @onClickScheId="onClickScheId"
/>
```


```ts
export default {
   data() {
     return {
       allScheList: [],
       myScheList: [],
       isAdmin: true,
     }
   },
   methods: {
     onClickScheId() {},
     onJumpToSetPage() {},
   }
  
}
```

## API

### Props

| Parameters            | Description                                      | Type      | Default value |
| --------------------- | ------------------------------------------------ | --------- | ------------- |
| list-view-mode        | Whether it is a list view                        | _boolean_ | `false`       |
| is-admin              | Whether to be an administrator                   | _boolean_ | `false`       |
| is-preview            | Whether it is preview stage                      | _number_  | `0`           |
| my-team-id            | My team id                                       | _string_  | -             |
| sche-sub-status-map   | Subscribed schedule mapping relationship         | _object_  | -             |
| all-sche-list         | All schedules                                    | _array_   | -             |
| my-sche-list          | My schedule                                      | _array_   | -             |
| loading               | Whether the schedule is loading                  | _boolean_ | `false`       |
| can-show-order-button | Whether the subscription button can be displayed | _boolean_ | `false`       |



### Events

| Event name          | Description                                  | Callback parameters                                                                          |
| ------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| clickRoundTab       | click round tab                              | round.round_type, round                                                                      |
| clickSche           | Click schedule group                         | schId, scheGroup, schePair                                                                   |
| clickVideoIcon      | Click the small video icon                   | schId, scheGroup, schePair                                                                   |
| scrollToLower       | Triggered when scrolling to the bottom       | scrollTime (current scrolling times, the leftmost is 0), roundTotal (total number of rounds) |
| clickScheItem       | click list schedule                          | schId, scheGroup, schePair                                                                   |
| clickScheItemButton | Click the middle button of the list schedule | { schId, scheGroup, schePair, middleButtonStatus, middleButtonStatusMap }                    |
