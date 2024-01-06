---
url : pages/press/turntable/turntable
---

## Turntable 转盘

可用于抽奖活动。

## 引入

```ts
import PressTurntable from 'press-ui/press-turntable/press-turntable';

export default {
  components: {
    PressTurntable,
  }
}
```

## 代码演示

### 基础用法

```html
<PressTurnTable
  :list="list"
  :prize-index="prizeIndex"
  :number="3"
  @start="onStart"
  @end="onEnd"
/>
```

```ts
export default {
  data() {
    return {
      list: [],
      prizeIndex: 3,
    }
  },
  methods: {
    onStart() {
    },
    onEnd() {
    },
  }
}

```


## API


### Props

| 参数         | 说明                   | 类型                 | 默认值  |
| ------------ | ---------------------- | -------------------- | ------- |
| list         | 奖品列表               | _array\<img, name\>_ | `[]`    |
| number       | 剩余抽奖次数           | _number_             | `1`     |
| disabled     | 是否禁用抽奖按钮       | _boolean_            | `false` |
| prize-index  | 点击抽奖后，中奖的索引 | _number_             | `0`     |
| start-angle  | 开始角度               | _number_             | `0`     |
| laps         | 抽奖动画旋转的圈数     | _number_             | `3`     |
| duration     | 抽奖动画持续时间       | _number_             | `3000`  |
| custom-style | 自定义样式             | _string_             | -       |
| custom-class | 自定义类名             | _string_             | -       |

### Events

| 事件名 | 说明     | 回调参数 |
| ------ | -------- | -------- |
| start  | 点击抽奖 | -        |
| end    | 抽奖结束 | -        |
