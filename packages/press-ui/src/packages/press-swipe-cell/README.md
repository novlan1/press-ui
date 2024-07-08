---
url : pages/press/swipe-cell/swipe-cell
---

## SwipeCell 滑动单元格


可以左右滑动来展示操作按钮的单元格组件。


## 引入

```ts
import PressSwipeCell from 'press-ui/press-swipe-cell/press-swipe-cell';

export default {
  components: {
    PressSwipeCell,
  }
}
```

## 代码演示

### 基础用法

将内容包裹在`Sticky`组件内即可。

```html
<press-swipe-cell
  :right-width="65"
  :left-width="65"
  @click="onClick"
  @close="onClose"
  @open="onOpen"
>
  <div slot="left">
    选择
  </div>
  <div class="content">
    一些内容
  </div>
  <div slot="right">
    删除
  </div>
</press-swipe-cell>
```


```js
export default {
  methods: {
    onClick(...args) {
      console.log('onClick.args', args);
    },
    onClose(...args) {
      console.log('onClose.args', args);
    },
    onOpen(...args) {
      console.log('onOpen.args', args);
    },
  },
};
```

## API
### Props

| 参数              | 说明                                    | 类型               | 默认值  |
| ----------------- | --------------------------------------- | ------------------ | ------- |
| name              | 标识符，可以在 close 事件的参数中获取到 | _string \| number_ | -       |
| left-width        | 左侧滑动区域宽度                        | _number_           | `0`     |
| right-width       | 右侧滑动区域宽度                        | _number_           | `0`     |
| async-close       | 是否异步关闭                            | _boolean_          | `false` |
| disabled `v1.3.4` | 是否禁用滑动                            | _boolean_          | `false` |

### Slot

| 名称  | 说明           |
| ----- | -------------- |
| -     | 自定义显示内容 |
| left  | 左侧滑动内容   |
| right | 右侧滑动内容   |

### Events

| 事件名 | 说明       | 参数                                                      |
| ------ | ---------- | --------------------------------------------------------- |
| click  | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`)        |
| close  | 关闭时触发 | { position: 'left' \| 'right' , instance , name: string } |
| open   | 打开时触发 | { position: 'left' \| 'right' , name: string }            |

### close 参数

| 参数     | 类型     | 说明                                               |
| -------- | -------- | -------------------------------------------------- |
| position | _string_ | 关闭时的点击位置 (`left` `right` `cell` `outside`) |
| instance | _object_ | SwipeCell 实例                                     |
| name     | 标识符   | _string_                                           |

### 方法

通过 selectComponent 可以获取到 SwipeCell 实例并调用实例方法

| 方法名 | 参数                      | 返回值 | 介绍             |
| ------ | ------------------------- | ------ | ---------------- |
| open   | position: `left \| right` | -      | 打开单元格侧边栏 |
| close  | -                         | -      | 收起单元格侧边栏 |

## 在线调试

<debug-online />
