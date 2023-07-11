---
url : pages/press/list/list
---

## PressList 列表

瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。

### 基本用法

`List` 组件通过 `loading` 和 `finished` 两个变量控制加载状态，当组件滚动到底部时，会触发 `load` 事件并将 `loading` 设置成 `true`。此时可以发起异步操作并更新数据，数据更新完毕后，将 `loading` 设置成 `false` 即可。若数据已全部加载完毕，则直接将 `finished` 设置成 `true` 即可。

```html
<press-list
  v-model="loading"
  :finished="finished"
  :immediate-check="immediateCheck"
  finished-text="没有更多了"
  @load="load"
>
  <div
    v-for="item of list"
    :key="item.value"
  >
    {{ item.label }}
  </div>
</press-list>
```

```ts
function fetchData({ length, beforeLength }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length }).map((_, i) => {
          let value = i + beforeLength;
          if (value < 10) {
            value = `0${value}`;
          }
          return {
            label: value,
            value,
          };
        }),
      });
    }, 200);
  });
}


export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      immediateCheck: false,
    };
  },
  methods: {
    load() {
      this.onFetchData();
    },
    onFetchData() {
      fetchData({
        length: 7,
        beforeLength: this.list.length,
      }).then(({ data }) => {
        this.list = [
          ...this.list,
          ...data,
        ];
        this.loading = false;
        this.finished = this.list.length > 50;
      })
        .catch(() => {});
    },
  },
};
```


## API

### Props


| 参数            | 说明                                           | 类型      | 默认值      |
| --------------- | ---------------------------------------------- | --------- | ----------- |
| v-model         | 是否处于加载状态，加载过程中不触发`load`事件   | _boolean_ | `false`     |
| finished        | 是否已加载完成，加载完成后不再触发`load`事件   | _boolean_ | `false`     |
| offset          | 滚动条与底部距离小于 `offset` 时触发`load`事件 | _number_  | `300`       |
| loading-text    | 加载过程中的提示文案                           | _string_  | `加载中...` |
| finished-text   | 加载完成后的提示文案                           | _string_  | -           |
| immediate-check | 是否在初始化时立即执行滚动位置检查             | _boolean_ | `true`      |

### Event


| 事件名 | 说明                               | 回调参数 |
| ------ | ---------------------------------- | -------- |
| load   | 滚动条与底部距离小于 offset 时触发 | -        |
| scroll | 页面滚动时触发                     | -        |


## 常见问题


### `List` 的运行机制是什么？

`List` 会监听浏览器的滚动事件并计算列表的位置，当列表底部与可视区域的距离小于`offset`时，`List` 会触发一次 `load` 事件。

### 为什么 `List` 初始化后会立即触发 `load` 事件？

`List` 初始化后会触发一次 `load` 事件，用于加载第一屏的数据，这个特性可以通过`immediate-check`属性关闭。


### 非`load`事件触发的请求要将`loading`设置为`true`

如果想在页面一进入就加载数据，需要将`loading`手动设置为`true`，否则请求数据不满一屏的话，组件无法监听数据变化，不会自动加载下一页。

另外这种使用方式，需要将`immediate-check`设置为`false`，防止加载数据重复。

```ts
export default {
  data() {
    return {
      immediateCheck: false,
    }
  },
  mounted() {
    this.loading = true;
    this.onFetchData(true);
  },
}
```

加载数据的时候`loading`应该始终为`true`，因此 `onFetchData` 中不要加下面这行，这会导致 `onFetchData` 无法加载数据。

```ts
if (this.loading) return;
```

### 为什么会连续触发 `load` 事件？

如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，`List` 会继续触发 `load` 事件，直到内容铺满屏幕或数据全部加载完成。因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。

### `loading` 和 `finished` 分别是什么含义？

`List`有以下三种状态，理解这些状态有助于你正确地使用`List`组件：

- 非加载中，`loading`为`false`，此时会根据列表滚动位置判断是否触发`load`事件（列表内容不足一屏幕时，会直接触发）
- 加载中，`loading`为`true`，表示正在发送异步请求，此时不会触发`load`事件
- 加载完成，`finished`为`true`，此时不会触发`load`事件

在每次请求完毕后，需要手动将`loading`设置为`false`，表示加载结束。

### 虚拟列表


由于列表数据在父组件控制，`press-list`内部只有`slot`占位，并且不同列表的结构和样式千差万别，所以虚拟列表只能在父组件实现。

`press-list`提供了虚拟列表的[简单示例](https://github.com/novlan1/press-ui/blob/release/src/packages/press-list/demo.vue)，可以参考使用。


虚拟列表的实现原理如下：
  
- 数据一定是切割过的，如果是全量数据，也就是`v-for`循环的是`data`的话，渲染的是全量Dom，虚拟列表也就无从谈起。
- 既然数据切割过了，那么高度一定会塌陷，解决办法有下面几种：
  - 绝对定位
  - `transform`
  - 顶部插入占位Dom

`press-picker`和`press-list`的示例都是用的第三种方法。
