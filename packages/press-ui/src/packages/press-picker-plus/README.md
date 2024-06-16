---
url : pages/press/picker-plus/picker-plus
---
## PickerPlus 选择器

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与 弹出层 组件配合使用。


## 引入

```ts
import PressPickerPlus from 'press-ui/press-picker-plus/press-picker-plus';

export default {
  components: {
    PressPickerPlus,
  }
}
```

## 代码演示

### 基础用法

```html
<press-picker-plus
  :columns="columns"
  @change="onChange"
/>
```

```javascript
export default {
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    };
  },
  methods: {
    onChange(val) {
      console.log('onChange.val', val);
    },
  },
};
```

### 默认选中项

单列选择器可以直接通过`default-index`属性设置初始选中项的索引值。

```html
<press-picker-plus
  :columns="columns"
  :default-index="2"
  @change="onChange"
/>
```

### 展示顶部栏

```html
<press-picker-plus
  show-toolbar
  title="标题"
  :columns="columns"
  @cancel="onCancel"
  @confirm="onConfirm"
/>
```

```javascript
export default {
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    };
  },
  methods: {
    onCancel(val) {
      console.log('onCancel.val', val);
    },
    onConfirm(val) {
      console.log('onConfirm.val', val);
    },
  },
};
```

### 多列联动

```html
<press-picker-plus
  ref="picker"
  :columns="columns"
  @change="onChangePicker"
/>
```

```javascript
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};

export default {
  data() {
    return {
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1',
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2,
        },
      ],
    };
  },
  methods: {
    onChangePicker(val) {
      const cities = this.t('column3');
      const { value } = val;
      this.$refs.picker.setColumnValues(1, cities[value[0]]);
      const values = this.$refs.picker.getValues();
      const indexes = this.$refs.picker.getIndexes();
      this.onTip({
        value: values,
        index: indexes,
      });
    },
  },
};
```

### 禁用选项

选项可以为对象结构，通过设置 disabled 来禁用该选项。

```html
<press-picker-plus
  :columns="columns"
  @change="onChange"
/>
```

```javascript
export default {
  data() {
    return {
      columns: [
        { text: '杭州', disabled: true },
        { text: '宁波' },
        { text: '温州' },
      ],
    };
  },
};
```

### 加载状态

当 Picker 数据是通过异步获取时，可以通过 `loading` 属性显示加载提示。

```html
 <press-picker-plus
  :columns="columns"
  loading
  @change="onChange"
/>
```

### 结合 PopupPlus

提供了简单的 `PopupPlus` 和 `PickerPlus` 的组合，供业务快速使用。

```html
<PressPickerPlusPopupPlus
  :show="show"
  :columns="columns"
  @change="onChange"
  @cancel="show = false"
  @confirm="onConfirm"
/>
```

```ts
import PressPickerPlusPopupPlus from 'press-ui/press-picker-plus-popup-plus/press-picker-plus-popup-plus.vue';

export default {
  components: {
    PressPickerPlusPopupPlus,
  },
}
```


## API

### Props

| 参数                | 说明                                                                  | 类型      | 默认值  |
| ------------------- | --------------------------------------------------------------------- | --------- | ------- |
| columns             | 对象数组，配置每一列显示的数据                                        | _Array_   | `[]`    |
| show-toolbar        | 是否显示顶部栏                                                        | _boolean_ | `false` |
| toolbar-position    | 顶部栏位置，可选值为`bottom`                                          | _string_  | `top`   |
| title               | 顶部栏标题                                                            | _string_  | `''`    |
| loading             | 是否显示加载状态                                                      | _boolean_ | `false` |
| value-key           | 选项对象中，文字对应的 key                                            | _string_  | `text`  |
| item-height         | 选项高度                                                              | _number_  | `44`    |
| confirm-button-text | 确认按钮文字                                                          | _string_  | `确认`  |
| cancel-button-text  | 取消按钮文字                                                          | _string_  | `取消`  |
| visible-item-count  | 可见的选项个数                                                        | _number_  | `6`     |
| default-index       | 单列选择器的默认选中项索引，<br>多列选择器请参考下方的 `Columns` 配置 | _number_  | `0`     |
| custom-class        | 根节点样式类                                                          | _string_  | -       |
| active-class        | 选中项样式类                                                          | _string_  | -       |
| toolbar-class       | 顶部栏样式类                                                          | _string_  | -       |
| column-class        | 列样式类                                                              | _string_  | -       |

### Events

Picker 组件的事件会根据 `columns` 是单列或多列返回不同的参数。

| 事件名  | 说明               | 参数                                                                                             |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引                     |
| cancel  | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引                     |
| change  | 选项改变时触发     | 单列：Picker 实例，选中值，选中值对应的索引<br>多列：Picker 实例，所有列选中值，当前列对应的索引 |

### Columns 数据结构

当传入多列数据时，`columns`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`。

| key          | 说明                       |
| ------------ | -------------------------- |
| values       | 列中对应的备选值           |
| defaultIndex | 初始选中项的索引，默认为 0 |


### 方法

通过 selectComponent 可以获取到 picker 实例并调用实例方法。

| 方法名          | 参数                     | 返回值      | 介绍                       |
| --------------- | ------------------------ | ----------- | -------------------------- |
| getValues       | -                        | values      | 获取所有列选中的值         |
| setValues       | values                   | -           | 设置所有列选中的值         |
| getIndexes      | -                        | indexes     | 获取所有列选中值对应的索引 |
| setIndexes      | indexes                  | -           | 设置所有列选中值对应的索引 |
| getColumnValue  | columnIndex              | value       | 获取对应列选中的值         |
| setColumnValue  | columnIndex, value       | -           | 设置对应列选中的值         |
| getColumnIndex  | columnIndex              | optionIndex | 获取对应列选中项的索引     |
| setColumnIndex  | columnIndex, optionIndex | -           | 设置对应列选中项的索引     |
| getColumnValues | columnIndex              | values      | 获取对应列中所有选项       |
| setColumnValues | columnIndex, values      | -           | 设置对应列中所有选项       |


## 常见问题

### 从 Vant 迁移

`confirm` 回调参数之前是 `value, index`，现在返回一个对象，即 `{ value, index }`

之前：

```html
<van-picker
  :columns="options"
  @confirm="onConfirm"
/>
```

```ts
onConfirm(option) {
  console.log('option.code', option.code);
  console.log('option.text', option.text);
},
```

现在

```ts
 handleOptionChange(option) {
  option = option.value;
  
  console.log('option.code', option.code);
  console.log('option.text', option.text);
},
```

### 从 PressPicker 迁移


1. 引入路径修改，改成 
   
```ts
import PressPickerPlusPopupPlus from 'press-ui/press-picker-plus-popup-plus/press-picker-plus-popup-plus.vue';
```

2. 控制显隐修改，`v-if="show"` 改成 `:show="show"`

3. 列表属性修改，`:list` 改成 `:columns`，值从 `label`、`value`改成 `code`、`text`

4. 当前属性修改，`:current="currentOption"` 改成 `:default-index="currentOption.index"`

5. 确认事件回调修改，`@confirm` 的参数，增加 `option = option.value`

