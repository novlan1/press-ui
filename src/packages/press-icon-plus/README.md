---
url : pages/press/icon-plus/icon-plus
---

## IconPlus 图标

基于字体的图标集，可以通过 `Icon` 组件使用，也可以在其他组件中通过 `icon` 属性引用。

## 引入

```ts
import PressIconPlus from 'press-ui/press-icon-plus/press-icon-plus.vue';

export default {
  components: {
    PressIconPlus,
  }
}
```

## 代码演示

### 基本用法

在 ``template`` 中使用组件

```html
<press-icon-plus type="empty" size="30"></press-icon-plus>
```

### 音乐播放图标

基本用法：

```html
<press-icon-plus-music />
```

```ts
import PressIconMusic from 'press-ui/press-icon-plus/press-icon-plus.vue';

export default {
  components: {
    PressIconMusic,
  }
}
```

指定颜色：

```html
<press-icon-plus-music
  color="rgb(94, 109, 130)"
/>
```

指定 `bar` 个数：

```html
<press-icon-plus-music :number="5"/>
```

指定图标宽高：

```html
<press-icon 
  width="60px"
  height="60px"
/>
```

## API

### IconPlus Props

| 参数  | 说明               | 类型     | 默认值 |
| ----- | ------------------ | -------- | ------ |
| size  | 图标大小           | _number_ | `24`   |
| type  | 图标图案，参考示例 | _string_ | -      |
| color | 图标颜色           | _string_ | -      |

### IconPlus Events

| 事件名 | 说明               | 返回值 |
| ------ | ------------------ | ------ |
| @click | 点击 IconPlus 触发事件 | -      |

### IconPlus Music Props

| 参数   | 说明                | 类型     | 默认值    |
| ------ | ------------------- | -------- | --------- |
| number | 竖条个数，支持`1-5` | _number_ | `3`       |
| color  | 图标颜色            | _string_ | `#2979ff` |
| width  | 图标整体高度        | _string_ | `40px`    |
| height | 图标整体宽度        | _string_ | `50px`    |

## 在线调试

<debug-online />
