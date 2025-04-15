---
url : pages/press/icon/icon
---

## Icon 图标

用于展示`icons`图标，目前仅保留`empty`，其他图标请使用`press-icon-plus`。

## 引入

```ts
import PressIcon from 'press-ui/press-icon/press-icon';

export default {
  components: {
    PressIcon,
  }
}
```

## 代码演示

### 基本用法

在 ``template`` 中使用组件

```html
<press-icon type="empty" size="30"></press-icon>
```

### 音乐播放图标

基本用法：

```html
<press-icon-music />
```

```ts
import PressIconMusic from 'press-ui/press-icon/press-icon-music';

export default {
  components: {
    PressIconMusic,
  }
}
```


指定颜色：

```html
<press-icon-music
  color="rgb(94, 109, 130)"
/>
```

指定 `bar` 个数：

```html
<press-icon-music :number="5"/>
```


指定图标宽高：

```html
<press-icon-plus 
  width="60px"
  height="60px"
/>
```



## API

### Icon Props

| 参数  | 说明               | 类型     | 默认值 |
| ----- | ------------------ | -------- | ------ |
| size  | 图标大小           | _number_ | `24`   |
| type  | 图标图案，参考示例 | _string_ | -      |
| color | 图标颜色           | _string_ | -      |

### Icon Events

| 事件名 | 说明               | 返回值 |
| ------ | ------------------ | ------ |
| @click | 点击 Icon 触发事件 | -      |


### Icon Music Props


| 参数   | 说明                | 类型     | 默认值    |
| ------ | ------------------- | -------- | --------- |
| number | 竖条个数，支持`1-5` | _number_ | `3`       |
| color  | 图标颜色            | _string_ | `#2979ff` |
| width  | 图标整体高度        | _string_ | `40px`    |
| height | 图标整体宽度        | _string_ | `50px`    |

## 在线调试

<debug-online />
