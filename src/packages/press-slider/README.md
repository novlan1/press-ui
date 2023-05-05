---
url : pages/press/slider/slider
---

## Slider 滑块

滑动输入条，用于在给定的范围内选择一个值。



## 代码演示

### 基本用法

```html
<press-slider value="50" @change="onChange" />
```

```js
export default{
  onChange(value) {
    this.$toast(`当前值：${value}`);
  },
};
```

### 双滑块

添加 `range` 属性就可以开启双滑块模式，确保 `value` 的值是一个数组。

```html
<press-slider :value="[10, 50]" range @change="onChange" />
```


### 指定选择范围

```html
<press-slider min="-50" max="50" />
```

### 禁用

```html
<press-slider value="50" disabled />
```

### 指定步长

```html
<press-slider value="50" step="10" />
```

### 自定义样式

```html
<press-slider value="50" bar-height="4px" active-color="#ee0a24" />
```

### 自定义按钮

```html
<press-slider :value="currentValue" use-button-slot @drag="onDrag">
  <view class="custom-button" slot="button">{{ currentValue }}</view>
</press-slider>
```

```js
export default {
  data() {
    return {
      currentValue: 50,
    }
  },
  onDrag(value) {
    this.currentValue = value;
  },
};
```

### 垂直方向

设置 `vertical` 属性后，滑块会垂直展示，且高度为 100% 父元素高度。

```html
<view style="height: 150px;">
  <press-slider value="50" vertical @change="onChange" />
  <press-slider
    :value="[10, 50]"
    range
    vertical
    style="margin-left: 100px;"
    @change="onChange"
  />
</view>
```


## API

### Props

| 参数            | 说明                                     | 类型                 | 默认值    |
| --------------- | ---------------------------------------- | -------------------- | --------- |
| value           | 当前进度百分比，在双滑块模式下为数组格式 | _number \| number[]_ | `0`       |
| disabled        | 是否禁用滑块                             | _boolean_            | `false`   |
| max             | 最大值                                   | _number_             | `100`     |
| min             | 最小值                                   | _number_             | `0`       |
| step            | 步长                                     | _number_             | `1`       |
| bar-height      | 进度条高度，默认单位为 `px`              | _string \| number_   | `2px`     |
| active-color    | 进度条激活态颜色                         | _string_             | `#1989fa` |
| inactive-color  | 进度条默认颜色                           | _string_             | `#e5e5e5` |
| use-slot-button | 是否使用按钮插槽                         | _boolean_            | `false`   |
| range           | 是否开启双滑块模式                       | _boolean_            | `false`   |
| vertical        | 是否垂直展示                             | _boolean_            | `false`   |

### Events

| 事件名     | 说明             | 参数                         |
| ---------- | ---------------- | ---------------------------- |
| drag       | 拖动进度条时触发 | event.detail.value: 当前进度 |
| change     | 进度值改变后触发 | event.detail: 当前进度       |
| drag-start | 开始拖动时触发   | -                            |
| drag-end   | 结束拖动时触发   | -                            |

### 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

### Slots

| 名称         | 说明                                | 参数                |
| ------------ | ----------------------------------- | ------------------- |
| button       | 自定义滑块按钮                      | _{ value: number }_ |
| left-button  | 自定义左侧滑块按钮（双滑块模式下）  | _{ value: number }_ |
| right-button | 自定义右侧滑块按钮 （双滑块模式下） | _{ value: number }_ |

## 主题定制

<theme-config />