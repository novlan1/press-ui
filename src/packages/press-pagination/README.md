---
url : pages/press/pagination/pagination
---

## Pagination 分页


## 引入

```ts
import PressPagination from 'press-ui/press-pagination/press-pagination.vue';

export default {
  components: {
    PressPagination,
  }
}
```

## 代码演示

### 基础用法


```html
<PressPagination
  :total="total"
  :current="current"
  @change="change"
/>
```

```ts
export default {
  data() {
    return {
      total: 10,
      current: 2,
    }
  },
  methods: {
    change() {

    }
  }
}
```

## API

### Props


| 参数                   | 说明                   | 类型      | 默认值                       |
| ---------------------- | ---------------------- | --------- | ---------------------------- |
| total                  | 页面总数               | _number_  | -                            |
| current                | 当前页，从 `1` 开始    | _number_  | -                            |
| tip-template           | 提示模板               | _string_  | <code v-pre>第{{0}}页</code> |
| safe-area-inset-bottom | 是否留出底部安全距离   | _boolean_ | `true`                       |
| auto-scroll            | 遇到边界自动滚动的页数 | _number_  | `1`                          |


###  Events

| 事件   | 说明       | 返回值 |
| ------ | ---------- | ------ |
| change | 切换当前页 | page   |

## 在线调试

<debug-online />
