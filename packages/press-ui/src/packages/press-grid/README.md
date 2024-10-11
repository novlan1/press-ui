---
url : pages/press/grid/grid
---

## Grid 宫格

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。


## 引入

```ts
import PressGrid from 'press-ui/press-grid/press-grid';
import PressGridItem from 'press-ui/press-grid-item/press-grid-item';

export default {
  components: {
    PressGrid,
    PressGridItem,
  }
}
```

## 代码演示

### 基本用法

通过`icon`属性设置格子内的图标，`text`属性设置文字内容。

```html
<press-grid>
  <press-grid-item icon="photo-o" text="文字" />
  <press-grid-item icon="photo-o" text="文字" />
  <press-grid-item icon="photo-o" text="文字" />
  <press-grid-item icon="photo-o" text="文字" />
</press-grid>
```

### 自定义列数

默认一行展示四个格子，可以通过`column-num`自定义列数。

```html
<press-grid :column-num="3">
  <press-grid-item 
    icon="photo-o" 
    text="文字" 
    v-for="(item,index) of 6"
    :key="index" 
  />
</press-grid>
```

### 自定义内容

通过插槽可以自定义格子展示的内容。

```html
<press-grid :column-num="3" :border="false">
  <press-grid-item
    use-slot 
    v-for="(item,index) of 3"
    :key="index"
  >
    <img
      style="width: 100%; height: 90px;"
      :src="imageList[index]"
    />
  </press-grid-item>
</press-grid>
```

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致。

```html
<press-grid square>
  <press-grid-item icon="photo-o" text="文字" v-for="(item,index) of 8" :key="index" />
</press-grid>
```

### 格子间距

通过`gutter`属性设置格子之间的距离。

```html
<press-grid :gutter="10">
  <press-grid-item icon="photo-o" text="文字" v-for="(item,index) of 8" :key="index" />
</press-grid>
```

### 内容横排

将`direction`属性设置为`horizontal`，可以让宫格的内容呈横向排列。

```html
<press-grid direction="horizontal" :column-num="2">
  <press-grid-item icon="photo-o" text="文字" />
  <press-grid-item icon="photo-o" text="文字" />
  <press-grid-item icon="photo-o" text="文字" />
</press-grid>
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型。

```html
<press-grid clickable :column-num="2">
  <press-grid-item
    icon="home-o"
    link-type="navigateTo"
    url="/pages/index/index"
    text="Navigate 跳转"
  />
  <press-grid-item
    icon="search"
    link-type="reLaunch"
    url="/pages/index/index"
    text="ReLaunch 跳转"
  />
</press-grid>
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标。

```html
<press-grid :column-num="2">
  <press-grid-item icon="home-o" text="文字" dot />
  <press-grid-item icon="search" text="文字" badge="99+" />
</press-grid>
```

## API

### Grid Props

| 参数             | 说明                                      | 类型               | 默认值     |
| ---------------- | ----------------------------------------- | ------------------ | ---------- |
| column-num       | 列数                                      | _number_           | `4`        |
| icon-size        | 图标大小，默认单位为`px`                  | _string_           | `28px`     |
| gutter           | 格子之间的间距，默认单位为`px`            | _string \| number_ | `0`        |
| border           | 是否显示边框                              | _boolean_          | `true`     |
| center           | 是否将格子内容居中显示                    | _boolean_          | `true`     |
| square           | 是否将格子固定为正方形                    | _boolean_          | `false`    |
| clickable        | 是否开启格子点击反馈                      | _boolean_          | `false`    |
| direction        | 格子内容排列的方向，可选值为 `horizontal` | _string_           | `vertical` |
| reverse `v1.7.0` | 是否调换图标和文本的位置                  | _boolean_          | `false`    |
| use-slot         | 是否使用自定义内容的插槽                  | _boolean_          | `false`    |

### GridItem Props

| 参数        | 说明                                                        | 类型               | 默认值       |
| ----------- | ----------------------------------------------------------- | ------------------ | ------------ |
| text        | 文字                                                        | _string_           | -            |
| icon        | 图标名称或图片链接，可选值见 [Icon 组件](./press-icon-plus) | _string_           | -            |
| icon-color  | 图标颜色                                                    | _string_           | -            |
| icon-prefix | 第三方图标前缀                                              | _string_           | `press-icon` |
| dot         | 是否显示图标右上角小红点                                    | _boolean_          | `false`      |
| badge       | 图标右上角徽标的内容                                        | _string \| number_ | -            |
| url         | 点击后跳转的链接地址                                        | _string_           | -            |
| link-type   | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch`  | _string_           | `navigateTo` |

### GridItem Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击格子时触发 | -        |

### GridItem Slots

| 名称 | 说明                                                   |
| ---- | ------------------------------------------------------ |
| -    | 自定义宫格的所有内容，需要设置`use-slot`属性           |
| icon | 自定义图标，如果设置了`use-slot`或者`icon`属性则不生效 |
| text | 自定义文字，如果设置了`use-slot`或者`text`属性则不生效 |

## 在线调试

<debug-online />
