---
url : pages/press/nav-bar/nav-bar
---

## NavBar 导航栏

为页面提供导航功能，常用于页面顶部。

## 引入

```ts
import PressNavBar from 'press-ui/press-nav-bar/press-nav-bar.vue';

export default {
  components: {
    PressNavBar,
  }
}
```

## 代码演示

### 基础用法

```html
<press-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

```js
export default {
  methods: {
    onClickLeft() {
    },
    onClickRight() {
    },
  }
}
```

### 高级用法

通过 slot 定制内容。

```html
<press-nav-bar title="标题" left-text="返回" left-arrow>
  <press-icon name="search" slot="right" />
</press-nav-bar>
```

## API

### Props

| 参数                | 说明                               | 类型      | 默认值  |
| ------------------- | ---------------------------------- | --------- | ------- |
| title               | 标题                               | _string_  | `''`    |
| left-text           | 左侧文案                           | _string_  | `''`    |
| right-text          | 右侧文案                           | _string_  | `''`    |
| left-arrow          | 是否显示左侧箭头                   | _boolean_ | `false` |
| fixed               | 是否固定在顶部                     | _boolean_ | `false` |
| placeholder         | 固定在顶部时是否开启占位           | _boolean_ | `false` |
| border              | 是否显示下边框                     | _boolean_ | `true`  |
| z-index             | 元素 z-index                       | _number_  | `1`     |
| custom-style        | 根节点自定义样式                   | _string_  | -       |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | _boolean_ | `true`  |
| custom-class        | 根节点样式类                       | _string_  | -       |
| title-class         | 标题样式类                         | _string_  | -       |

### Slot

| 名称  | 说明               |
| ----- | ------------------ |
| title | 自定义标题         |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

### Events

| 事件名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| click-left  | 点击左侧按钮时触发 | -    |
| click-right | 点击右侧按钮时触发 | -    |


## 在线调试

<debug-online />
