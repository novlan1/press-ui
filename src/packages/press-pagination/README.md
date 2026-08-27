---
url : pages/press/pagination/pagination
---

## Pagination 分页

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

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

通过 `current` 来绑定当前页码。

```html
<press-pagination 
  :current="currentPage" 
  :total-items="24" 
  :items-per-page="5" 
  @change="(value) => currentPage = value"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const currentPage = ref(1);
    return { currentPage };
  },
};
```

### 简单模式

将 `mode` 设置为 `simple` 来切换到简单模式，此时分页器不会展示具体的页码按钮。

```html
<press-pagination 
  :current="currentPage" 
  :page-count="12" 
  mode="simple" 
  @change="(value) => currentPage = value"
/>
```

### 显示省略号

设置 `force-ellipses` 后会展示省略号按钮，点击后可以快速跳转。

```html
<press-pagination
  :current="currentPage"
  :total-items="125"
  :show-page-size="3"
  force-ellipses
  @change="(value) => currentPage = value"
/>
```

### 自定义按钮

通过 `prev-text`、`next-text` 等插槽来自定义分页按钮的内容。

```html
<press-pagination 
  :current="currentPage" 
  :total-items="50" 
  :show-page-size="5" 
  @change="(value) => currentPage = value"
>
  <template #prev-text>
    <press-icon-plus name="arrow-left" />
  </template>
  <template #next-text>
    <press-icon-plus name="arrow" />
  </template>
  <template #page="{ text }">{{ text }}</template>
</press-pagination>
```

### E-Sport 模式

```html
<press-pagination
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

通用参数

| 参数         | 说明                                  | 类型     | 默认值 |
| ------------ | ------------------------------------- | -------- | ------ |
| mode         | 显示模式，可选值为 `simple/multi/hor` | _string_ | -      |
| current      | 当前页，从 `1` 开始                   | _number_ | -      |
| total        | 页面总数                              | _number_ | -      |
| custom-class | 自定义类名                            | _string_ | -      |

`mode` 为 `simple/multi` 时参数

| 参数             | 说明               | 类型               | 默认值   |
| ---------------- | ------------------ | ------------------ | -------- |
| prev-text        | 上一页按钮文字     | _string_           | `上一页` |
| next-text        | 下一页按钮文字     | _string_           | `下一页` |
| total-items      | 总记录数           | _number \| string_ | `0`      |
| items-per-page   | 每页记录数         | _number \| string_ | `10`     |
| show-page-size   | 显示的页码个数     | _number \| string_ | `5`      |
| force-ellipses   | 是否显示省略号     | _boolean_          | `false`  |
| show-prev-button | 是否展示上一页按钮 | _boolean_          | `true`   |
| show-next-button | 是否展示下一页按钮 | _boolean_          | `true`   |

`mode` 为空或 `hor` 时参数

| 参数                   | 说明                   | 类型      | 默认值                       |
| ---------------------- | ---------------------- | --------- | ---------------------------- |
| tip-template           | 提示模板               | _string_  | <code v-pre>第{{0}}页</code> |
| safe-area-inset-bottom | 是否留出底部安全距离   | _boolean_ | `true`                       |
| auto-scroll            | 遇到边界自动滚动的页数 | _number_  | `1`                          |

### Events

| 事件   | 说明       | 返回值 |
| ------ | ---------- | ------ |
| change | 切换当前页 | page   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                        | 默认值                          | 描述 |
| ------------------------------------------- | ------------------------------- | ---- |
| --press-pagination-height                   | _40px_                          | -    |
| --press-pagination-font-size                | _var(--press-font-size-md)_     | -    |
| --press-pagination-item-width               | _36px_                          | -    |
| --press-pagination-item-default-color       | _var(--press-primary-color)_    | -    |
| --press-pagination-item-disabled-color      | _var(--press-gray-7)_           | -    |
| --press-pagination-item-disabled-background | _var(--press-background)_       | -    |
| --press-pagination-background               | _var(--press-background-2)_     | -    |
| --press-pagination-desc-color               | _var(--press-gray-7)_           | -    |
| --press-pagination-disabled-opacity         | _var(--press-disabled-opacity)_ | -    |


## 在线调试

<debug-online />
