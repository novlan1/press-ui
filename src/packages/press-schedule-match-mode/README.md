---
url : pages/press/schedule-match-mode/schedule-match-mode
---

## ScheduleMatchMode 匹配赛程


## 引入

```ts
import PressScheduleMatchMode from 'press-ui/press-schedule-match-mode/press-schedule-match-mode';

export default {
  components: {
    PressScheduleMatchMode,
  }
}
```

## 代码演示

### 基础用法

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

| 参数                  | 说明                 | 类型      | 默认值  |
| --------------------- | -------------------- | --------- | ------- |
| list-view-mode        | 是否为列表视图       | _boolean_ | `false` |
| is-admin              | 是否为管理员         | _boolean_ | `false` |
| is-preview            | 是否为预览阶段       | _number_  | `0`     |
| my-team-id            | 我的队伍id           | _string_  | -       |
| sche-sub-status-map   | 已订阅的赛程映射关系 | _object_  | -       |
| all-sche-list         | 全部赛程             | _array_   | -       |
| my-sche-list          | 我的赛程             | _array_   | -       |
| loading               | 赛程是否为加载中     | _boolean_ | `false` |
| can-show-order-button | 是否可以显示订阅按钮 | _boolean_ | `false` |



### Events

| 事件名称            | 说明                 | 回调参数                                                                  |
| ------------------- | -------------------- | ------------------------------------------------------------------------- |
| clickRoundTab       | 点击轮次tab          | round.round_type, round                                                   |
| clickSche           | 点击赛程组           | schId, scheGroup, schePair                                                |
| clickVideoIcon      | 点击视频小图标       | schId, scheGroup, schePair                                                |
| scrollToLower       | 滚动到底时触发       | scrollTime（当前滚动次数，最左侧为0）, roundTotal（轮次总数）             |
| clickScheItem       | 点击列表赛程         | schId，scheGroup，schePair                                                |
| clickScheItemButton | 点击列表赛程中间按钮 | { schId，scheGroup，schePair, middleButtonStatus, middleButtonStatusMap } |

