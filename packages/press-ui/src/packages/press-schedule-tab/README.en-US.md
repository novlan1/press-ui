---
url: pages/press/schedule-tab/schedule-tab
---

## ScheduleTab 


## Introduction

```ts
import PressScheduleTab from 'press-ui/press-schedule-tab/press-schedule-tab';

export default {
   components: {
     PressScheduleTab,
   }
}
```

## Code Demo

### Basic usage

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
         { name: 'Default rule', key: 1 },
         { name: 'Custom rules', key: 2 },
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

| Parameters | Description                | Type               | Default value |
| ---------- | -------------------------- | ------------------ | ------------- |
| current    | The key of the current tag | _string \| number_ | -             |
| list       | tag list                   | _array_            | -             |



### Events

| Event name | Description | Parameters     |
| ---------- | ----------- | -------------- |
| change     | switch Tab  | item.key, item |


### list type

```ts
type IList = Array<{
   name: string;
   key: string | number;
}>
```
