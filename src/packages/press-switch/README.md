---
url : pages/press/switch/switch
---

## Switch 切换选择器


用于在打开和关闭状态之间进行切换。

## 代码演示

### 基础用法

```html
<press-switch :checked="checked" @change="onChange" />
```

```javascript
export default{
  data() {
    return {
      checked: true,
    }
  },
  methods: {
    onChange(value) {
      // 需要手动对 checked 状态进行更新
      this.checked = value;
    }
  }
}
```

### 禁用状态

```html
<press-switch :checked="checked" disabled />
```

### 加载状态

```html
<press-switch :checked="checked" loading />
```

### 自定义大小

```html
<press-switch :checked="checked" size="24px" />
```

### 自定义颜色

```html
<press-switch
  :checked="checked"
  active-color="#07c160"
  inactive-color="#ee0a24"
/>
```

### 异步控制

```html
<press-switch :checked="checked" @change="onChange" />

<!-- #ifndef H5 -->
<PressDialog
  id="tip-match-comm-tips-dialog"
/>
<!-- #endif -->
```

```js
import PressDialogHandler from 'press-ui/press-dialog';

export default {
  data() {
    return {
      checked: true,
    }
  },
  methods: {
    onChange(value) {
      PressDialogHandler.show({
        title: '提示',
        content: '是否切换开关',
        confirmText: '确认',
        cancelText: '取消',
      }).then(() => {
        this.checked = value;
      });
    },
  }
}
```

### E-SPORT

```html
<PressSwitch
  custom-class="press-switch--e-sport"
  :checked="checked"
  @change="onChange"
/>
```

## API

### Props

| 参数           | 说明                   | 类型      | 默认值    |
| -------------- | ---------------------- | --------- | --------- |
| name           | 在表单内提交时的标识符 | _string_  | -         |
| checked        | 开关选中状态           | _any_     | `false`   |
| loading        | 是否为加载状态         | _boolean_ | `false`   |
| disabled       | 是否为禁用状态         | _boolean_ | `false`   |
| size           | 开关尺寸               | _string_  | `30px`    |
| active-color   | 打开时的背景色         | _string_  | `#1989fa` |
| inactive-color | 关闭时的背景色         | _string_  | `#fff`    |
| active-value   | 打开时的值             | _any_     | `true`    |
| inactive-value | 关闭时的值             | _any_     | `false`   |

### Events

| 事件名 | 说明             | 参数                       |
| ------ | ---------------- | -------------------------- |
| change | 开关状态切换回调 | event.detail: 是否选中开关 |

### 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
| node-class   | 圆点样式类   |

## 主题定制

<theme-config />