---
url : pages/press/schedule-tab/schedule-tab
---

## ScheduleTab 赛程标签页


## 引入

```ts
import PressScheduleTab from 'press-ui/press-schedule-tab/press-schedule-tab';

export default {
  components: {
    PressScheduleTab,
  }
}
```

## 代码演示

### 基础用法

```html
<PressScheduleTab
  :current="currentTab"
  :list="tabList"
  @change="onChangeTab"
/>
```

```ts
export default {
  data() {
    return {
      currentTab: 1,
      tabList: [
        { name: '默认规则', key: 1 },
        { name: '自定义规则', key: 2 },
      ],
    }
  },
  methods: {
    onChangeTab(key) {
      this.currentTab = key;
    },
  }
}
```

## API

### Props

| 参数    | 说明           | 类型               | 默认值 |
| ------- | -------------- | ------------------ | ------ |
| current | 当前标签的 key | _string \| number_ | -      |
| list    | 标签列表       | _array_            | -      |



### Events

| 事件名 | 说明     | 参数           |
| ------ | -------- | -------------- |
| change | 切换 Tab | item.key, item |


### list 类型

```ts
type IList = Array<{
  name: string;
  key: string | number;
}>
```