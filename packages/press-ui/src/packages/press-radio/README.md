---
url : pages/press/radio/radio
---

## Radio 单选框

在一组备选项中进行单选。


## 引入

```ts
import PressRadio from 'press-ui/press-radio/press-radio';
import PressRadioGroup from 'press-ui/press-radio-group/press-radio-group';

export default {
  components: {
    PressRadio,
    PressRadioGroup,
  }
}
```

## 代码演示

### 基础用法

通过`value`绑定值当前选中项的 name 。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio name="1">单选框 1</press-radio>
  <press-radio name="2">单选框 2</press-radio>
</press-radio-group>
```

```js
export default {
  data() {
    return {
      radio: '1',
    }
  },
  methods: {
    onChange(value) {
      this.radio = value;
    },
  }
};
```

### 水平排列

将`direction`属性设置为`horizontal`后，单选框组会变成水平排列。

```html
<press-radio-group
  :value="radio"
  @change="onChange"
  direction="horizontal"
>
  <press-radio name="1">单选框 1</press-radio>
  <press-radio name="2">单选框 2</press-radio>
</press-radio-group>
```

### 禁用状态

通过`disabled`属性禁止选项切换，在`Radio`上设置`diabled`可以禁用单个选项。

```html
<press-radio-group :value="radio" disabled @change="onChange">
  <press-radio name="1">单选框 1</press-radio>
  <press-radio name="2">单选框 2</press-radio>
</press-radio-group>
```

### 自定义形状

将`shape`属性设置为`square`，单选框的形状会变成方形。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio name="1" shape="square">单选框 1</press-radio>
  <press-radio name="2" shape="square">单选框 2</press-radio>
</press-radio-group>
```

### 自定义颜色

通过`checked-color`属性设置选中状态的图标颜色。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio name="1" checked-color="#07c160">单选框 1</press-radio>
  <press-radio name="2" checked-color="#07c160">单选框 2</press-radio>
</press-radio-group>
```

### 自定义大小

通过`icon-size`属性可以自定义图标的大小。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio name="1" icon-size="24px">单选框 1</press-radio>
  <press-radio name="2" icon-size="24px">单选框 2</press-radio>
</press-radio-group>
```

### 自定义图标

通过`icon`插槽自定义图标，需要设置`use-icon-slot`属性。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio use-icon-slot :value="radio" name="1">
    自定义图标
    <img slot="icon" :src="radio === '1' ? icon.active : icon.normal" />
  </press-radio>
  <press-radio use-icon-slot :value="radio" name="2">
    自定义图标
    <img slot="icon" :src="radio === '2' ? icon.active : icon.normal" />
  </press-radio>
</press-radio-group>
```

```js
export default {
  data() {
    return {
      radio: true,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png',
      },
    }
  },
  methods: {
    onChanges(value) {
      this.radio = value;
    },
  }
};
```

### 禁用文本点击

通过设置`label-disabled`属性可以禁用单选框文本点击。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-radio name="1" label-disabled>单选框 1</press-radio>
  <press-radio name="2" label-disabled>单选框 2</press-radio>
</press-radio-group>
```

### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```html
<press-radio-group :value="radio" @change="onChange">
  <press-cell-group>
    <press-cell title="单选框 1" clickable data-name="1" @click="onClick">
      <press-radio slot="right-icon" name="1" />
    </press-cell>
    <press-cell title="单选框 2" clickable data-name="2" @click="onClick">
      <press-radio slot="right-icon" name="2" />
    </press-cell>
  </press-cell-group>
</press-radio-group>
```

```js
export default {
  data() {
    return {
      radio: '1',
    }
  },
  methods: {
    onChange(value) {
      this.radio = value;
    },
    onClick(value) {
      this.radio = value;
    },
  }
};
```

## API

### RadioGroup Props

| 参数      | 说明                            | 类型      | 默认值     |
| --------- | ------------------------------- | --------- | ---------- |
| name      | 在表单内提交时的标识符          | _string_  | -          |
| value     | 当前选中项的标识符              | _any_     | -          |
| disabled  | 是否禁用所有单选框              | _boolean_ | `false`    |
| direction | 排列方向，可选值为 `horizontal` | _string_  | `vertical` |

### Radio Props

| 参数           | 说明                      | 类型               | 默认值    |
| -------------- | ------------------------- | ------------------ | --------- |
| name           | 标识符                    | _string_           | -         |
| shape          | 形状，可选值为 `square`   | _string_           | `round`   |
| disabled       | 是否为禁用状态            | _boolean_          | `false`   |
| label-disabled | 是否禁用文本内容点击      | _boolean_          | `false`   |
| label-position | 文本位置，可选值为 `left` | _string_           | `right`   |
| icon-size      | 图标大小，默认单位为`px`  | _string \| number_ | `20px`    |
| checked-color  | 选中状态颜色              | _string_           | `#1989fa` |
| use-icon-slot  | 是否使用 icon 插槽        | _boolean_          | `false`   |
| custom-class   | 根节点样式类              | _string_           | -         |
| icon-class     | 图标样式类                | _string_           | -         |
| label-class    | 描述信息样式类            | _string_           | -         |

### Radio Event

| 事件名  | 说明                     | 回调参数          |
| ------- | ------------------------ | ----------------- |
| @change | 当绑定值变化时触发的事件 | 当前选中项的 name |

### RadioGroup Event

| 事件名  | 说明                     | 回调参数          |
| ------- | ------------------------ | ----------------- |
| @change | 当绑定值变化时触发的事件 | 当前选中项的 name |


## 在线调试

<debug-online />