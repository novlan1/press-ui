---
url : pages/press/hor-award-explain/hor-award-explain
---

## HorAwardExplain 横版奖励说明


## 引入

```ts
import PressHorAwardExplain from 'press-ui/press-hor-award-explain/press-hor-award-explain';

export default {
  components: {
    PressHorAwardExplain,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorAwardExplain
  v-if="show"
  :award-list="awardList"
  @close="close"
/>
```

```ts
const AWARD_LIST = Array.from({ length: 5 }).map(() => ({
  title: '1-20名',
  subItems: Array.from({ length: 5 }).map(() => ({
    pic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/5edb48ca-de79-82c5-4b8f-b6af28124622.jpg',
    name: '奖励名称',
    description: '奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述',
    label: '官方奖励',
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

| 参数       | 说明     | 类型    | 默认值 |
| ---------- | -------- | ------- | ------ |
| award-list | 奖励列表 | _array_ | -      |



### Events

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| close  | 点击关闭 | -    |


### awardList

awardList 类型如下：

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