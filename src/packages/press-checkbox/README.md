---
url : pages/press/checkbox/checkbox
---

## Checkbox 复选框


在一组备选项中进行多选。

## 引入

```ts
import PressCheckbox from 'press-ui/press-checkbox/press-checkbox';
import PressCheckboxGroup from 'press-ui/press-checkbox-group/press-checkbox-group';

export default {
  components: {
    PressCheckbox,
    PressCheckboxGroup,
  }
}
```

## 代码演示

### 基础用法

通过`value`绑定复选框的勾选状态。

```html
<press-checkbox
  :value="checked"
  @change="onChange"
>
  复选框
</press-checkbox>
```

```js
export default {
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onChange(val) {
      this.checked = val;
    },
  },
};
```

### 禁用状态

通过设置`disabled`属性可以禁用复选框。

```html
<press-checkbox
  :value="checked"
  disabled
  @change="onChange"
>
  复选框
</press-checkbox>
```

### 自定义形状

将`shape`属性设置为`square`，复选框的形状会变成方形。

```html
<press-checkbox
  shape="square"
  :value="checked"
  @change="onChange"
>
  复选框
</press-checkbox>
```

### 自定义颜色

通过`checked-color`属性可以自定义选中状态下的图标颜色。

```html
 <press-checkbox
  :value="checked"
  checked-color="#07c160"
  @change="onChange"
>
  复选框
</press-checkbox>
```

### 自定义大小

通过`icon-size`属性可以自定义图标的大小。

```html
<press-checkbox
  :value="checked"
  :icon-size="25"
  @change="onChange"
>
  复选框
</press-checkbox>
```


### 禁用文本点击

通过设置`label-disabled`属性可以禁用复选框文本点击。

```html
 <press-checkbox
  :value="checked"
  label-disabled
  @change="onChange"
>
  复选框
</press-checkbox>
```

## API

### Checkbox Props

| 参数           | 说明                            | 类型               | 默认值    |
| -------------- | ------------------------------- | ------------------ | --------- |
| name           | 标识 Checkbox 名称              | _string_           | -         |
| shape          | 形状，可选值为 `round` `square` | _string_           | `round`   |
| value          | 是否为选中状态                  | _boolean_          | `false`   |
| disabled       | 是否禁用单选框                  | _boolean_          | `false`   |
| label-disabled | 是否禁用单选框内容点击          | _boolean_          | `false`   |
| label-position | 文本位置，可选值为 `left`       | _string_           | `right`   |
| use-icon-slot  | 是否使用 icon slot              | _boolean_          | `false`   |
| checked-color  | 选中状态颜色                    | _string_           | `#1989fa` |
| icon-size      | icon 大小                       | _string \| number_ | `20px`    |
| custom-class   | 根节点样式类                    | _string_           | -         |
| icon-class     | 图标样式类                      | _string_           | -         |
| label-class    | 描述信息样式类                  | _string_           | -         |

### CheckboxGroup Props

| 参数      | 说明                            | 类型      | 默认值        |
| --------- | ------------------------------- | --------- | ------------- |
| name      | 在表单内提交时的标识符          | _string_  | -             |
| value     | 所有选中项的 name               | _Array_   | -             |
| disabled  | 是否禁用所有单选框              | _boolean_ | `false`       |
| max       | 设置最大可选数                  | _number_  | `0`（无限制） |
| direction | 排列方向，可选值为 `horizontal` | _string_  | `vertical`    |

### Checkbox Event

| 事件名 | 说明                     | 回调参数     |
| ------ | ------------------------ | ------------ |
| change | 当绑定值变化时触发的事件 | 当前组件的值 |

### CheckboxGroup Event

| 事件名 | 说明                     | 回调参数     |
| ------ | ------------------------ | ------------ |
| change | 当绑定值变化时触发的事件 | 当前组件的值 |

### Checkbox Slot

| 名称 | 说明       |
| ---- | ---------- |
| -    | 自定义文本 |
| icon | 自定义图标 |

### Checkbox 方法

通过 selectComponent 可以获取到 checkbox 实例并调用实例方法。

| 方法名 | 参数 | 返回值 | 介绍         |
| ------ | ---- | ------ | ------------ |
| toggle | -    | -      | 切换选中状态 |

## 主题定制

<theme-config />