---
url : pages/press/text-ellipsis/text-ellipsis
---

## TextEllipsis 文本省略

对长文本进行省略，支持展开/收起。

## 引入

```ts
import PressTextEllipsis from 'press-ui/press-text-ellipsis/press-text-ellipsis.vue';

export default {
  components: {
    PressTextEllipsis,
  }
}
```

## 代码演示

### 基础用法

默认展示 `1` 行，超过 `1` 行显示省略号。

```html
<press-text-ellipsis :content="text" />
```

```js
export default {
  setup() {
    const text = '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。';
    return { text };
  },
};
```

### 展开/收起

超过行数支持展开/收起。

```html
<press-text-ellipsis :content="text" expand-text="展开" collapse-text="收起" />
```

```js
export default {
  setup() {
    const text =
      '似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。';
    return { text };
  },
};
```

### 自定义展示行数

通过设置 `rows` 限制展示行数。

```html
<press-text-ellipsis
  rows="3"
  :content="text"
  expand-text="展开"
  collapse-text="收起"
/>
```

```js
export default {
  setup() {
    const text =
      '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。';
    return { text };
  },
};
```

### 自定义省略位置

通过设置 `position` 控制省略位置。

- 头部省略

```html
<press-text-ellipsis
  rows="1"
  :content="text"
  expand-text="展开"
  collapse-text="收起"
  position="start"
/>
```

```js
export default {
  setup() {
    const text =
      '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。';
    return { text };
  },
};
```

- 中部省略

```html
<press-text-ellipsis
  rows="2"
  :content="text"
  expand-text="展开"
  collapse-text="收起"
  position="middle"
/>
```

### 自定义操作内容

通过插槽 `action` 自定义操作内容。

```html
<press-text-ellipsis :content="text">
  <template #action="{ expanded }">{{ expanded ? '收起' : '展开' }}</template>
</press-text-ellipsis>
```

### 小程序中使用

小程序中不支持 `action` 插槽。

由于小程序文本布局和H5不完全相同，可能导致最后的展示效果超过了 `rows` 行。这里的解决办法是设置 `adjust-string`，防止超行。

```html
<press-text-ellipsis
  rows="2"
  :content="text"
  expand-text="展开"
  collapse-text="收起"
  :adjust-string="aa"
/>
```

## API

### Props

| 参数          | 说明                                | 类型               | 默认值                                   |
| ------------- | ----------------------------------- | ------------------ | ---------------------------------------- |
| rows          | 展示的行数                          | _number \| string_ | `1`                                      |
| content       | 需要展示的文本                      | _string_           | -                                        |
| expand-text   | 展开操作的文案                      | _string_           | -                                        |
| collapse-text | 收起操作的文案                      | _string_           | -                                        |
| dots          | 省略号的文本内容                    | _string_           | `'...'`                                  |
| position      | 省略位置，可选值为 `start` `middle` | _string_           | `'end'`                                  |
| adjust-string | 小程序下校正字符串                  | _string \| object_ | `{ end: 'a', start: 'a', middle: 'aa' }` |

### Events

| 事件名       | 说明                | 回调参数            |
| ------------ | ------------------- | ------------------- |
| click-action | 点击展开/收起时触发 | _event: MouseEvent_ |

### TextEllipsis 方法

通过 ref 可以获取到 TextEllipsis 实例并调用实例方法。

| 方法名 | 说明                                                               | 参数                 | 返回值 |
| ------ | ------------------------------------------------------------------ | -------------------- | ------ |
| toggle | 切换文本的展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | _expanded?: boolean_ | -      |

### Slots

| 名称   | 说明       | 参数                    |
| ------ | ---------- | ----------------------- |
| action | 自定义操作 | _{ expanded: boolean }_ |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                               | 默认值              | 描述           |
| ---------------------------------- | ------------------- | -------------- |
| --press-text-ellipsis-action-color | _var(--press-blue)_ | 操作按钮的颜色 |
| --press-text-ellipsis-line-height  | _1.6_               | 文本的行高     |
