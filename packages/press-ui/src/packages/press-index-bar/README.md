---
url : pages/press/index-bar/index-bar
---

## IndexBar 索引栏

用于列表的索引分类显示和快速定位。


## 引入

```ts
import PressIndexBar from 'press-ui/press-index-bar/press-index-bar';
import PressIndexAnchor from 'press-ui/press-index-anchor/press-index-anchor';

export default {
  components: {
    PressIndexBar,
    PressIndexAnchor,
  }
}
```

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的`IndexAnchor`锚点位置。

```html
<press-index-bar>
  <div>
    <press-index-anchor index="A" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  <div>
    <press-index-anchor index="B" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  ...
</press-index-bar>
```

### 自定义索引列表

可以通过`index-list`属性自定义展示的索引字符列表。

```html
<press-index-bar :index-list="indexList">
  <div>
    <press-index-anchor index="1">标题1</press-index-anchor>
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  <div>
    <press-index-anchor index="2">标题2</press-index-anchor>
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  ...
</press-index-bar>
```

```javascript
export default {
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },
};
```

## API

### IndexBar Props

| 参数              | 说明                       | 类型                   | 默认值    | 版本 |
| ----------------- | -------------------------- | ---------------------- | --------- | ---- |
| index-list        | 索引字符列表               | _string[] \| number[]_ | `A-Z`     | -    |
| z-index           | z-index 层级               | _number_               | `1`       | -    |
| sticky            | 是否开启锚点自动吸顶       | _boolean_              | `true`    | -    |
| sticky-offset-top | 锚点自动吸顶时与顶部的距离 | _number_               | `0`       | -    |
| highlight-color   | 索引字符高亮颜色           | _string_               | `#07c160` | -    |

### IndexAnchor Props

| 参数     | 说明                     | 类型               | 默认值  | 版本 |
| -------- | ------------------------ | ------------------ | ------- | ---- |
| use-slot | 是否使用自定义内容的插槽 | _boolean_          | `false` | -    |
| index    | 索引字符                 | _string \| number_ | -       | -    |

### IndexBar Events

| 事件名 | 说明           | 回调参数        |
| ------ | -------------- | --------------- |
| select | 选中字符时触发 | index: 索引字符 |

### IndexAnchor Slots

| 名称 | 说明                             |
| ---- | -------------------------------- |
| -    | 锚点位置显示内容，默认为索引字符 |

## 主题定制

<theme-config />

## 在线调试

<debug-online />