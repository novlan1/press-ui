---
url : pages/press/badge/badge
---

## Badge 徽标


## 引入

```ts
import PressBadge from 'press-ui/press-badge/press-badge';

export default {
  components: {
    PressBadge,
  }
}
```

## 代码演示

### 基础用法


设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```html
<PressBadge :content="5">
  <div class="child" />
</PressBadge>
<PressBadge :content="10">
  <div class="child" />
</PressBadge>
<PressBadge content="Hot">
  <div class="child" />
</PressBadge>
<PressBadge dot>
  <div class="child" />
</PressBadge>

<style>
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
</style>
```

### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```html
<PressBadge :content="20" max="9">
  <div class="child" />
</PressBadge>
<PressBadge :content="50" max="20">
  <div class="child" />
</PressBadge>
<PressBadge :content="200" max="99">
  <div class="child" />
</PressBadge>
```

### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```html
<PressBadge :content="5" color="#1989fa">
  <div class="child" />
</PressBadge>
<PressBadge :content="10" color="#1989fa">
  <div class="child" />
</PressBadge>
<PressBadge dot color="#1989fa">
  <div class="child" />
</PressBadge>
```

### 自定义徽标内容

通过 `content` 插槽可以自定义徽标的内容，比如插入一个图标。

```html
<PressBadge>
  <div class="child" />
  <template #content>
    <PressIconPlus name="success" class="badge-icon" />
  </template>
</PressBadge>
<PressBadge>
  <div class="child" />
  <template #content>
    <PressIconPlus name="cross" class="badge-icon" />
  </template>
</PressBadge>
<PressBadge>
  <div class="child" />
  <template #content>
    <PressIconPlus name="down" class="badge-icon" />
  </template>
</PressBadge>
```

```css
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
```

### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```html
<PressBadge :content="20" />

<PressBadge :content="200" max="99" />
```

## API

### Props

| 参数    | 说明                                                         | 类型               | 默认值    |
| ------- | ------------------------------------------------------------ | ------------------ | --------- |
| content | 徽标内容                                                     | _number \| string_ | -         |
| color   | 徽标背景颜色                                                 | _string_           | `#ee0a24` |
| dot     | 是否展示为小红点                                             | _boolean_          | `false`   |
| max     | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | _number \| string_ | -         |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |
| content | 自定义徽标内容   |

## 在线调试

<debug-online />
