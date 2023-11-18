---
url : pages/press/schedule-card/schedule-card
---

## ScheduleCard 赛程卡片


## 引入

```ts
import PressScheduleCard from 'press-ui/press-schedule-card/press-schedule-card';

export default {
  components: {
    PressScheduleCard,
  }
}
```

## 代码演示

### 基础用法

```html
<PressScheduleCard
  :user-nick="scheInfo.userNick"
  :device-str="scheInfo.deviceStr"
  :role-id="scheInfo.roleId"
  :is-not-sign-up="scheInfo.isNotSignUp"
  :card-state="scheInfo.cardState"
  :countdown-time="scheInfo.countdown"
  :button-count-down="scheInfo.buttonCountDown"
  :step-list="scheInfo.stepList"
  :game-stage-list="scheInfo.gameStageList"
  :team-list="scheInfo.teamList"
  :score-list="scheInfo.scoreList"
  :result-list="scheInfo.resultList"
  :result-type="scheInfo.resultType"
  @clickStep="clickStep"
/>
```

```ts
export default {
  data() {
    scheInfo: {
      userNick: '杨',
      deviceStr: 'iOS微信',
      roleId: '123123123999',
      countdown: 1000000,
      buttonCountDown: 100000,
      isNotSignUp: false,
      cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
      stepList: getStepList({
        length: 6,
        playingIndex: MOCK_PLAYING_INDEX,
      }),
      gameStageList: getStepList({
        length: 3,
        isStage: true,
        playingIndex: -1,
        curIndex: -1,
      }),
      teamList: getTeamList({
        length: 6,
        readyList: [1, 2, 3],
      }),
      scoreList: getScoreList({
        length: 6,
      }),
      resultList: getResultList(),
      resultType: RESULT_TYPE_MAP.PENDING,
    },
  }
}
```


## API

### Props

| 参数                   | 说明                  | 类型      | 默认值                             |
| ---------------------- | --------------------- | --------- | ---------------------------------- |
| is-not-sign-up         | 是否为报名中          | _boolean_ | `false`                            |
| card-state             | 卡片状态              | _string_  | -                                  |
| countdown-time         | 倒计时，单位 `ms`     | _number_  | 0                                  |
| button-count-down      | 按钮倒计时，单位 `ms` | _number_  | 0                                  |
| step-list              | 对局列表              | _array_   | -                                  |
| game-stage-list        | 阶段列表              | _boolean_ | -                                  |
| team-list              | 队伍列表              | _array_   | -                                  |
| score-list             | 比分列表              | _array_   | -                                  |
| result-list            | 结果列表              | _array_   | -                                  |
| result-type            | 结果类型              | _string_  | -                                  |
| fail-title             | 失败标题              | _string_  | `晋级失败`                         |
| fail-desc              | 失败描述              | _string_  | `本场比赛晋级失败，请参与其他场次` |
| pending-text           | 未出结果描述          | _string_  | `等待裁判确认晋级名次`             |
| user-nick              | 用户昵称              | _string_  | -                                  |
| device-str             | 设备描述              | _string_  | -                                  |
| role-id                | 用户角色ID            | _string_  | -                                  |
| button-text            | 按钮文案              | _string_  | -                                  |
| button-type            | 按钮类型              | _string_  | -                                  |
| button-tip             | 按钮提示文案          | _string_  | -                                  |
| show-button-count-down | 是否显示按钮倒计时    | _string_  | -                                  |
| button-tip-type        | 按钮提示类型          | _string_  | -                                  |
| button-avatar-list     | 按钮提示中的头像列表  | _array_   | -                                  |



### Events

| 事件名                | 说明           | 参数                                |
| --------------------- | -------------- | ----------------------------------- |
| click                 | 点击赛程卡片   | -                                   |
| clickButton           | 点击按钮       | buttonType, cardState, cardStateMap |
| clickStep             | 切换对局       | stepItem, stepIndex                 |
| checkDataDetail       | 查看详细数据   | cardState, cardStateMap             |
| countDownChange       | 倒计时改变     | cardState, cardStateMap             |
| countDownFinish       | 倒计时结束     | cardState, cardStateMap             |
| buttonCountDownFinish | 按钮倒计时结束 | cardState, cardStateMap             |
| exchange              | 切换角色       | cardState, cardStateMap             |


### 字段类型

`cardState` 类型有以下几种：

```ts
export const SCHEDULE_CARD_STATE_MAP = {
  GAME_WILL_START: 'GAME_WILL_START', // 比赛待开始，显示 "报名即将开始"
  BATTLE_STARTED: 'BATTLE_STARTED', // 第n局已开始，显示 “去比赛”
  BATTLE_PLAYING: 'BATTLE_PLAYING', // 第1局进行中，显示 “比赛进行中”
  BATTLE_NEXT_WILL_START: 'BATTLE_NEXT_WILL_START', // 前面局结束，第2，2+局待开始，显示 前几局积分，以及 “待开赛 + 倒计时” 按钮
  GAME_END: 'GAME_END', // 比赛结束，显示 晋级结果
};
```

`resultType` 类型有以下几种：

```ts
export const RESULT_TYPE_MAP = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  PENDING: 'PENDING',
};
```


`buttonType` 类型有以下几种：

```ts
export const BUTTON_TYPE_MAP = {
  PRIMARY: 'green',
  DISABLE: 'gray',
};
```


`buttonTipType` 类型有以下几种：

```ts
export const BUTTON_TIP_TYPE_AMP = {
  TEXT: 'TEXT',
  AVATAR: 'AVATAR',
};
```

`buttonAvatarList` 类型为：

```ts
Array<{
  head: string;
  isGreen?: boolean;
  isYellow?: boolean;
}>
```



## 常见问题

### 按钮文案

组件会根据 `cardState` 生成对应的按钮文案和类型，如果传入 `props`，则以 `props` 优先。

### 设计理念

赛程卡片状态多，在整理过程中有以下思考：

1. 样式一定要就近写在组件附近，如果不在附近，也要在名称或路径上，与其他组件的样式区别开来。把所有组件的样式耦合在一起，很难维护，后面参与的人很难找。
2. 一定是数据驱动，这里是状态码驱动
3. 卡片状态码需要是 `Map`，其 `key` 为字符串，也就是 `Record<string, string | number>`，不能是 `Record<number, any>` 或者 `number`，因为 `number` 类型的很难见名知义，扩展性也差。
4. 处理数据的时候，也就是卡片状态码生成的时候，应该把卡片所需的其他数据一起生成，否则，需要其他数据的时候，还需要再根据状态码判断一次，太冗余，也容易漏掉或出其他错误。
5. API需符合最少知识原则，使用者只需关心 `cardState`，内部做映射，换成组件所需要的状态。


下面是几种状态的概述：

- 待开赛
  - 对局列表、标题、倒计时、按钮
- 去比赛
  - 对局列表、标题、队员列表、按钮
- 比赛进行中（灰色按钮）
  - 对局列表、标题、队员列表、按钮
- 第2+局待开赛
  - 对局列表、标题（积分排名）、积分情况、按钮
- 比赛结束
  - 标题+图片（恭喜晋级）、排名+积分情况、按钮

卡片是由不同部分拼接而成，可能会出现高度适配情况，为此， `schedule-card` 组件提供了不同状态的类名，外部可以自行覆盖原始样式。


```html
<!-- 报名中 -->
<div class="press-sche-card-sign"></div>

<!-- 已报名 -->
<div
  class="press-sche-card-join"
  :class="{
    'press-sche-card-join--count-down': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_COUNT_DOWN,
    'press-sche-card-join--team': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_TEAM_LIST,
    'press-sche-card-join--score': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_SCORE_LIST,
    'press-sche-card-join--result': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_RESULT,
  }"
>
</div>
```

```ts
export const INNER_MATCH_STATUS_MAP = {
  SHOW_COUNT_DOWN: 'SHOW_COUNT_DOWN',
  SHOW_TEAM_LIST: 'SHOW_TEAM_LIST',
  SHOW_SCORE_LIST: 'SHOW_SCORE_LIST',
  SHOW_RESULT: 'SHOW_RESULT',
};
```
