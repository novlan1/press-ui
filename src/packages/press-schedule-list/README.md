---
url : pages/press/schedule-list/schedule-list
---

## ScheduleList 赛程列表


## 引入

```ts
import PressScheduleList from 'press-ui/press-schedule-list/press-schedule-list';

export default {
  components: {
    PressScheduleList,
  }
}
```

## 代码演示

### 基础用法

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


| 参数                  | 说明                                                        | 类型      | 默认值  |
| --------------------- | ----------------------------------------------------------- | --------- | ------- |
| sche-info             | 赛程信息，与赛程树中的`schePair`相同                        | _object_  | -       |
| selected              | 是否选中                                                    | _boolean_ | `false` |
| is-admin              | 是否为管理员                                                | _boolean_ | `false` |
| is-preview            | 是否为预览阶段，0 不是， 1 普通预览，2 预览，且自定义了赛程 | _number_  | `0`     |
| my-team-id            | 我的队伍id                                                  | _string_  | -       |
| sche-sub-status-map   | 已订阅的赛程`uni-id`对象，判断是否已订阅                    | _object_  | -       |
| can-show-order-button | 是否可以显示订阅按钮，可根据环境设置                        | _boolean_ | `true`  |





### ScheduleItem Events

| 事件名称            | 说明             | 回调参数                                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------------------- |
| clickScheItem       | 点击赛程         | schId，scheGroup，schePair                                                |
| clickScheItemButton | 点击赛程中间按钮 | { schId，scheGroup，schePair, middleButtonStatus, middleButtonStatusMap } |
