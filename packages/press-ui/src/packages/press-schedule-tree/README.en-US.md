---
url : pages/press/schedule-tree/schedule-tree
---

## ScheduleTree 


## Code Demo

### Basic Usage

```html
<ScheduleTree
   :sche-list="scheList"
   :is-admin="isAdmin"
   :is-preview="isPreview"
/>

```

```javascript
import ScheduleTree from 'press-ui/press-schedule-tree/press-schedule-tree.vue';

export default {
   components: {
     ScheduleTree,
   },
   data() {
     return {
       scheList: [],
       isAdmin: false,
       isPreview: 0,
     }
   },
   methods: {
   },
};
```

## API

### Props

| Parameter                | Description                                                                                                               | Type               | Default |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| sche-list                | schedule list                                                                                                             | _Array_            | -       |
| is-admin                 | is admin                                                                                                                  | _Boolean_          | false   |
| is-preview               | Whether it is the preview stage, 0 is not, 1 is normal preview, 2 is preview, and the schedule is customized              | _Number_           | 0       |
| my-teamId                | my team id                                                                                                                | _String_           | -       |
| selected-sch-id          | selected schedule id                                                                                                      | _String_           | -       |
| winner-name              | The name of the winner column, which can be champion, third place, etc.                                                   | _String_           | -       |
| page                     | The page where the current schedule tree is located, available during group knockout                                      | _Number_           | 0       |
| total-page               | The total number of pages of the schedule tree, available in group knockout matches                                       | _Number_           | 0       |
| automatic-grouping       | Whether to automatically group                                                                                            | _Boolean_          | false   |
| show-champion            | Whether to show the champion column, it can be set to `false` in round robin                                              | _Boolean_          | true    |
| shadow                   | Whether to set interval shadows, it can be set to `true` in round robin                                                   | _Boolean_          | false   |
| auto-back-to-top         | Whether to automatically return to the top when scrolling left and right, can be set to `false` in round robin            | _Boolean_          | true    |
| resume-position          | When the schedule data becomes less, the auto-scroll position when the right display is blank, can be `left/right/number` | _[String, Number]_ | `right` |
| show-round-tab `v0.8.32` | Whether to display the round tab                                                                                          | _Boolean_          | true    |
| max-columns `v0.8.32`    | The number of columns displayed at the same time, the excess will be hidden to improve performance                        | _Number_           | `3`     |
| tabScrollWidth           | tab width                                                                                                                 | _String_           | `164`   |
| scheduleScrollWidth      | The width of each column of the schedule tree                                                                             | _String_           | `164`   |




### Events

| Event Name     | Description                             | Callback Parameters                                                                       |
| -------------- | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| clickRoundTab  | Click the round tab                     | round.round_type, round                                                                   |
| clickSche      | Click schedule group                    | schId, scheGroup, schePair                                                                |
| clickVideoIcon | Click the small video icon              | schId, scheGroup, schePair                                                                |
| clickFinalSche | Click on the champion team              | -                                                                                         |
| scroll         | Triggered when scrolling left and right | scrollTime (current scroll times, the leftmost is 0), roundTotal (total number of rounds) |
### scheList

- `scheList` is a two-dimensional array, each item of the first layer array corresponds to each column, and each item of the second layer array corresponds to the schedule group pair `schePair`.

- `schePair` is composed of 1-2 schedule groups `scheGroup`, and 1 `scheGroup` has two teams.

- Each `schePair` is an object, including `battleList`, `roundInfo`, `isChamp` and other attributes.

- The name of `battleList` is inappropriate. Here it refers to `scheGroupList`. There are 2 `battleList` which means there are 2 schedule groups.

- `scheGroup` contains `teamList`, `nodeItem`, `schid`, `realStatus`, `bracketIdDesc`, `curBo`, `boType` and other information


Sample data can be [reference here](https://github.com/novlan1/press-ui/blob/release/packages/press-ui/src/packages/press-schedule-tree/demo-helper/data.ts) .