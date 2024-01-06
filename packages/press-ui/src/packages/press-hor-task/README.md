---
url : pages/press/hor-task/hor-task
---

## HorTask 横版任务


## 引入

```ts
import PressHorTask from 'press-ui/press-hor-task/press-hor-task';

export default {
  components: {
    PressHorTask,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorTask
  :task-list="taskList"
  :match-list="matchList"
  @back="onBack"
  @clickRule="clickRule"
  @clickTaskAward="clickTaskAward"
  @clickTaskButton="clickTaskButton"
  @clickMatchAward="clickMatchAward"
  @clickMatch="clickMatch"
/>
```

```ts
const MOCK_AWARDS = Array.from({
  length: 10,
}).map(() => ({
  image: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/dd90f5ee-282c-bf96-f8de-c22de72ee7b1.jpg',
}));


const MOCK_TASK_LIST = [
  {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '签到',
    buttonPrimary: true,
  }, {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '去观赛',
    buttonSecondary: true,
  },
  {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '已领取',
    buttonPlain: true,
  },
];

const MOCK_MATCH_LIST = [
  {
    label: '已报名',
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
];

export default {
  data() {
    return {
      taskList: MOCK_TASK_LIST,
      matchList: MOCK_MATCH_LIST,
    };
  },
  methods: {
    onBack() {
      routerBack.call(this);
    },
    clickRule() {
      console.log('[clickRule]');
    },
    clickTaskAward(awardItem, awardIndex, taskItem) {
      console.log('[clickTaskAward]', awardItem, awardIndex, taskItem);
    },
    clickTaskButton(taskItem) {
      console.log('[clickTaskButton]', taskItem);
    },
    clickMatch(matchItem) {
      console.log('[clickMatch]', matchItem);
    },
    clickMatchAward(awardItem, awardIndex, matchItem) {
      console.log('[clickMatchAward]', awardItem, awardIndex, matchItem);
    },
  },
}

```

## API

### Props

| 参数      | 说明     | 类型    | 默认值 |
| --------- | -------- | ------- | ------ |
| task-ist  | 任务列表 | _array_ | -      |
| match-ist | 比赛列表 | _array_ | -      |



### Events

| 事件名          | 说明         | 参数                                   |
| --------------- | ------------ | -------------------------------------- |
| back            | 点击返回     | -                                      |
| clickRule       | 点击规则     | -                                      |
| clickTaskAward  | 点击任务奖品 | `awardItem`, `awardIndex`, `taskItem`  |
| clickTaskButton | 点击任务按钮 | `taskItem`                             |
| clickMatchAward | 点击赛事奖品 | `awardItem`, `awardIndex`, `matchItem` |
| clickMatch      | 点击赛事     | `matchItem`                            |


### Types


```ts
type IAwards = {
  image: string;
};

// taskList
type ITaskList = Array<{
  name: string; // 名称
  awards: IAwards; // 奖励信息

  buttonPrimary?: boolean; // 是否按钮为金黄色
  buttonSecondary?: boolean; // 是否按钮为蓝色
  buttonPlain?: boolean; // 是否按钮为普通文案

  buttonText?: string; // 按钮文案
}>;

// matchList
type IMatchList = Array<{
  label: string;
  image: string;
  name: string;
  
  awards: IAwards; // 奖励信息
}>;
```