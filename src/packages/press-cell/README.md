---
url : pages/press/cell/cell
---

## Cell 单元格


单元格为列表中的单个展示项。

## 引入

```ts
import PressCell from 'press-ui/press-cell/press-cell';
import PressCellGroup from 'press-ui/press-cell-group/press-cell-group';

export default {
  components: {
    PressCell,
    PressCellGroup,
  }
}
```

## 代码演示

### 基础用法

`Cell`可以单独使用，也可以与`CellGroup`搭配使用。`CellGroup`可以为`Cell`提供上下外边框。

```html
<press-cell-group>
  <press-cell title="单元格" value="内容" />
  <press-cell title="单元格" value="内容" label="描述信息" :border="false" />
</press-cell-group>
```

### 卡片风格

通过 `CellGroup` 的 `inset` 属性，可以将单元格转换为圆角卡片风格（从 1.7.2 版本开始支持）。

```html
<press-cell-group inset>
  <press-cell title="单元格" value="内容" />
  <press-cell title="单元格" value="内容" label="描述信息" />
</press-cell-group>
```

### 单元格大小

通过`size`属性可以控制单元格的大小。

```html
<press-cell title="单元格" value="内容" size="large" />
<press-cell title="单元格" value="内容" size="large" label="描述信息" />
```

### 展示图标

通过`icon`属性在标题左侧展示图标。

```html
<press-cell title="单元格" icon="location-o" />
```

### 展示箭头

设置`is-link`属性后会在单元格右侧显示箭头，并且可以通过`arrow-direction`属性控制箭头方向。

```html
<press-cell title="单元格" is-link />
<press-cell title="单元格" is-link value="内容" />
<press-cell title="单元格" is-link value="内容" arrow-direction="down" />
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型。

```html
<press-cell
  is-link
  title="单元格"
  link-type="navigateTo"
  url="/pages/dashboard/index"
/>
```

### 分组标题

通过`CellGroup`的`title`属性可以指定分组标题。

```html
<press-cell-group title="分组1">
  <press-cell title="单元格" value="内容" />
</press-cell-group>
<press-cell-group title="分组2">
  <press-cell title="单元格" value="内容" />
</press-cell-group>
```

### 使用插槽

如以上用法不能满足你的需求，可以使用插槽来自定义内容。

```html
<press-cell 
  value="内容" 
  icon="shop-o"
  is-link
  :use-title-slot="true"
>
  <div slot="title">
    <div class="press-cell-text">单元格</div>
    <press-tag type="danger">标签</press-tag>
  </div>
</press-cell>
<press-cell title="单元格">
  <press-icon-plus slot="right-icon" name="search" class="custom-icon" />
</press-cell>
```

### 垂直居中

通过`center`属性可以让`Cell`的左右内容都垂直居中。

```html
<press-cell center title="单元格" value="内容" label="描述信息" />
```

### E-Sport

设置`type`属性为`e-sport`。

```html
 <press-cell
  :title="t('matchMode')"
  :value="t('knockout')"
  type="e-sport"
  is-link
  :border="false"
/>
<press-cell
  :title="t('wayToWin')"
  :value="t('defaultBo1')"
  type="e-sport"
  is-link
  :border="false"
/>
<press-cell
  :title="t('allowModifyAvatar')"
  :border="false"
  type="e-sport"
>
  <template #right-icon>
    <press-switch
      custom-class="press-switch--e-sport"
      :checked="switchChecked[1]"
      @change="val=>onChangeSwitch(val, 1)"
    />
  </template>
</press-cell>

<press-cell
  :title="t('getPhoneNumber')"
  :label="t('getPhoneNumberDesc')"
  type="e-sport"
  center
  :border="false"
>
  <template #right-icon>
    <press-switch
      custom-class="press-switch--e-sport"
      :checked="switchChecked[2]"
      @change="val=>onChangeSwitch(val, 2)"
    />
  </template>
</press-cell>
```


## API

### CellGroup Props

| 参数         | 说明                   | 类型      | 默认值  |
| ------------ | ---------------------- | --------- | ------- |
| title        | 分组标题               | _string_  | -       |
| inset        | 是否展示为圆角卡片风格 | _boolean_ | `false` |
| border       | 是否显示外边框         | _boolean_ | `true`  |
| custom-class | 根节点样式类           | _string_  | -       |

### Cell Props

| 参数            | 说明                                                       | 类型               | 默认值       |
| --------------- | ---------------------------------------------------------- | ------------------ | ------------ |
| icon            | 左侧图标名称或图片链接，可选值见 IconPlus 组件                 | _string_           | -            |
| title           | 左侧标题                                                   | _string \| number_ | -            |
| title-width     | 标题宽度，须包含单位                                       | _string_           | -            |
| value           | 右侧内容                                                   | _string \| number_ | -            |
| label           | 标题下方的描述信息                                         | _string_           | -            |
| size            | 单元格大小，可选值为 `large`                               | _string_           | -            |
| border          | 是否显示下边框                                             | _boolean_          | `true`       |
| center          | 是否使内容垂直居中                                         | _boolean_          | `false`      |
| url             | 点击后跳转的链接地址                                       | _string_           | -            |
| link-type       | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_           | `navigateTo` |
| clickable       | 是否开启点击反馈                                           | _boolean_          | `false`      |
| is-link         | 是否展示右侧箭头并开启点击反馈                             | _boolean_          | `false`      |
| required        | 是否显示表单必填星号                                       | _boolean_          | `false`      |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down`                      | _string_           | -            |
| use-label-slot  | 是否使用 label slot                                        | _boolean_          | `false`      |
| title-style     | 标题样式                                                   | _string_           | -            |
| type            | 额外类型，可选值为 `e-sport`                               | _string_           | -            |
| custom-class    | 根节点样式类                                               | _string_           | -            |
| title-class     | 标题样式类                                                 | _string_           | -            |
| label-class     | 描述信息样式类                                             | _string_           | -            |
| value-class     | 右侧内容样式类                                             | _string_           | -            |

### Cell Event

| 事件名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| click  | 点击单元格时触发 | -    |

### Cell Slot

| 名称       | 说明                                                           |
| ---------- | -------------------------------------------------------------- |
| -          | 自定义`value`显示内容，如果设置了`value`属性则不生效           |
| title      | 自定义`title`显示内容，如果设置了`title`属性则不生效           |
| label      | 自定义`label`显示内容，需要设置 `use-label-slot`属性           |
| icon       | 自定义`icon`显示内容，如果设置了`icon`属性则不生效             |
| right-icon | 自定义右侧按钮，默认是`arrow`，如果设置了`is-link`属性则不生效 |


## 在线调试

<debug-online />