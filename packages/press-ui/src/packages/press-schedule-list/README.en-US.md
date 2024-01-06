---
url : pages/press/schedule-list/schedule-list
---

## ScheduleList


## Code Demo

### Basic Usage

```html
<ScheduleItem
   :sche-info="scheInfo"
   :is-admin="isAdmin"
   :is-preview="isPreview"
/>

```

```javascript
import ScheduleItem from 'press-ui/press-schedule-list/press-schedule-item.vue';

export default {
   components: {
     ScheduleItem,
   },
   data() {
     return {
       scheInfo: {},
       isAdmin: false,
       isPreview: 0,
     }
   },
   methods: {
   },
};
```



## API

### ScheduleItem Props


| Parameter             | Description                                                                                                  | Type      | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| sche-info             | Schedule information, same as `schePair` in schedule tree                                                    | _Object_  | -       |
| selected              | whether selected                                                                                             | _Boolean_ | false   |
| is-admin              | is admin                                                                                                     | _Boolean_ | false   |
| is-preview            | Whether it is the preview stage, 0 is not, 1 is normal preview, 2 is preview, and the schedule is customized | _Number_  | 0       |
| my-team-id            | my team id                                                                                                   | _String_  | -       |
| sche-sub-status-map   | Subscribed schedule `uni-id` object, to determine whether it has been subscribed                             | _Object_  | -       |
| can-show-order-button | Whether the subscription button can be displayed, which can be set according to the environment              | _Boolean_ | true    |





### ScheduleItem Events

| Event Name          | Description                             | Callback Parameters                                                       |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| clickScheItem       | Click a schedule                        | schId, scheGroup, schePair                                                |
| clickScheItemButton | Click the middle button of the schedule | { schId, scheGroup, schePair, middleButtonStatus, middleButtonStatusMap } |


