---
url : pages/press/tag/tag
---

## Tag 标签

用于标记关键词和概括主要内容。


## 引入

```ts
import PressTag from 'press-ui/press-tag/press-tag';

export default {
  components: {
    PressTag,
  }
}
```

## 代码演示

### 基础用法

通过 `type` 属性控制标签颜色，默认为灰色。

```html
<press-tag type="primary">标签</press-tag>
<press-tag type="success">标签</press-tag>
<press-tag type="danger">标签</press-tag>
<press-tag type="warning">标签</press-tag>
```

### 空心样式

设置 `plain` 属性设置为空心样式。

```html
<press-tag plain type="primary">标签</press-tag>
<press-tag plain type="success">标签</press-tag>
<press-tag plain type="danger">标签</press-tag>
<press-tag plain type="warning">标签</press-tag>
```

### 圆角样式

通过 `round` 设置为圆角样式。

```html
<press-tag round type="primary">标签</press-tag>
<press-tag round type="success">标签</press-tag>
<press-tag round type="danger">标签</press-tag>
<press-tag round type="warning">标签</press-tag>
```

### 标记样式

通过 `mark` 设置为标记样式(半圆角)。

```html
<press-tag mark type="primary">标签</press-tag>
<press-tag mark type="success">标签</press-tag>
<press-tag mark type="danger">标签</press-tag>
<press-tag mark type="warning">标签</press-tag>
```

### 自定义颜色

```html
<press-tag color="#f2826a">标签</press-tag>
<press-tag color="#7232dd">标签</press-tag>
<press-tag color="#7232dd" plain>标签</press-tag>
<press-tag color="#ffe1e1" text-color="#ad0000">标签</press-tag>
```

### 标签大小

```html
<press-tag type="danger">标签</press-tag>
<press-tag type="danger" size="medium">标签</press-tag>
<press-tag type="danger" size="large">标签</press-tag>
```

### 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `close` 事件，在 `close` 事件中可以执行隐藏标签的逻辑。

```html
 <press-tag
  v-if="show.primary"
  type="primary"
  closeable
  @close="onClose('primary')"
>
  标签
</press-tag>
<press-tag
  v-if="show.success"
  type="success"
  closeable
  @close="onClose('success')"
>
  标签
</press-tag>
```

```js
export default {
  data() {
    return {
      show: {
        primary: true,
        success: true,
      },
    }
  },
  methods: {
    onClose(type) {
      this.show[type] = false;
    },
  },
}
```

## API

### Props

| 参数       | 说明                                                  | 类型      | 默认值  |
| ---------- | ----------------------------------------------------- | --------- | ------- |
| type       | 类型，可选值为 `primary` `success` `danger` `warning` | _string_  | -       |
| size       | 大小, 可选值为 `large` `medium`                       | _string_  | -       |
| color      | 标签颜色                                              | _string_  | -       |
| plain      | 是否为空心样式                                        | _boolean_ | `false` |
| round      | 是否为圆角样式                                        | _boolean_ | `false` |
| mark       | 是否为标记样式                                        | _boolean_ | `false` |
| text-color | 文本颜色，优先级高于 `color` 属性                     | _string_  | `white` |
| closeable  | 是否为可关闭标签                                      | _boolean_ | `false` |

### Slot

| 名称 | 说明                |
| ---- | ------------------- |
| -    | 自定义 Tag 显示内容 |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| close  | 关闭标签时触发 | -        |

## 主题定制

<theme-config />

## 在线调试

<debug-online />