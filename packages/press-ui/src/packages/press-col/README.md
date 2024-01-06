---
url : pages/press/col/col
---

## Col 布局

基础布局组件。

## 引入

```ts
import PressCol from 'press-ui/press-col/press-col';
import PressRow from 'press-ui/press-row/press-row';

export default {
  components: {
    PressCol,
    PressRow,
  }
}
```

## 代码演示

### 基本用法

Layout 组件提供了`24列栅格`，通过在`Col`上添加`span`属性设置列所占的宽度百分比。此外，添加`offset`属性可以设置列的偏移宽度，计算方式与 span 相同。

```html
<press-row>
  <press-col :span="8">span: 8</press-col>
  <press-col :span="8">span: 8</press-col>
  <press-col :span="8">span: 8</press-col>
</press-row>

<press-row>
  <press-col :span="4">span: 4</press-col>
  <press-col :span="10" :offset="4">offset: 4, span: 10</press-col>
</press-row>

<press-row>
  <press-col :offset="12" :span="12">offset: 12, span: 12</press-col>
</press-row>
```

### 设置列元素间距

通过`gutter`属性可以设置列元素之间的间距，默认间距为 0。

```html
<press-row :gutter="20">
  <press-col :span="8">span: 8</press-col>
  <press-col :span="8">span: 8</press-col>
  <press-col :span="8">span: 8</press-col>
</press-row>
```

## API

### Row Props

| 参数   | 说明                          | 类型               | 默认值 |
| ------ | ----------------------------- | ------------------ | ------ |
| gutter | 列元素之间的间距（单位为 px） | _string \| number_ | -      |

### Col Props

| 参数   | 说明           | 类型               | 默认值 |
| ------ | -------------- | ------------------ | ------ |
| span   | 列元素宽度     | _string \| number_ | -      |
| offset | 列元素偏移距离 | _string \| number_ | -      |
