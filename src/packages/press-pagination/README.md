---
url : pages/press/pagination/pagination
---

## Pagination 分页


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


|         属性名         |   类型    |            默认值            |          说明          |
| :--------------------: | :-------: | :--------------------------: | :--------------------: |
|         total          | _number_  |              -               |        页面总数        |
|        current         | _number_  |              -               |         当前页         |
|      tip-template      | _string_  | <code v-pre>第{{0}}页</code> |        提示模板        |
| safe-area-inset-bottom | _boolean_ |            `true`            |  是否留出底部安全距离  |
|      auto-scroll       | _number_  |             `1`              | 遇到边界自动滚动的页数 |


###  Events

| 事件称名 |    说明    | 返回值 |
| :------: | :--------: | :----: |
|  change  | 切换当前页 |  page  |
