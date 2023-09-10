---
url : pages/press/COMP/COMP
---

## SUBTITLE TITLE


## 引入

```ts
import PressTITLE from 'press-ui/press-COMP/press-COMP';

export default {
  components: {
    PressTITLE,
  }
}
```

## 代码演示

### 基础用法


## API

### Props

| 参数               | 说明             | 类型      | 默认值  |
| ------------------ | ---------------- | --------- | ------- |
| show               | 是否显示弹窗     | _boolean_ | `false` |
| show-cancel-button | 是否显示取消按钮 | _boolean_ | `true`  |



### Events

| 事件名  | 说明     | 参数 |
| ------- | -------- | ---- |
| confirm | 点击确认 | show |
| cancel  | 点击取消 | show |
