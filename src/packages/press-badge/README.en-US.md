---
url: pages/press/badge/badge
---

## Badge


## Introduction

```ts
import PressBadge from 'press-ui/press-badge/press-badge';

export default {
   components: {
     PressBadge,
   }
}
```

## Code Demo

### Basic usage


After setting the `content` attribute, Badge will display the corresponding logo in the upper right corner of the child element, or you can use `dot` to display a small red dot.

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

### Maximum value

After setting the `max` attribute, when the value of `content` exceeds the maximum value, it will automatically be displayed as `{max}+`.

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

### Custom color

Set the color of the logo via the `color` property.

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

### Custom logo content

The content of the logo can be customized through the `content` slot, such as inserting an icon.

```html
<PressBadge>
   <div class="child" />
   <template #content>
     <PressIcon name="success" class="badge-icon" />
   </template>
</PressBadge>
<PressBadge>
   <div class="child" />
   <template #content>
     <PressIcon name="cross" class="badge-icon" />
   </template>
</PressBadge>
<PressBadge>
   <div class="child" />
   <template #content>
     <PressIcon name="down" class="badge-icon" />
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

### Independent display

When Badge has no child elements, it will be displayed as an independent element.

```html
<PressBadge :content="20" />

<PressBadge :content="200" max="99" />
```

## API

### Props

| Parameters | Description                                                                                                               | Type               | Default value |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------- |
| content    | Logo content                                                                                                              | _number \| string_ | -             |
| color      | Logo background color                                                                                                     | _string_           | `#ee0a24`     |
| dot        | Whether to display as a small red dot                                                                                     | _boolean_          | `false`       |
| max        | The maximum value. `{max}+` will be displayed if the maximum value is exceeded. It is only valid when content is a number | _number \| string_ | -             |

### Slots

| Name    | Description                   |
| ------- | ----------------------------- |
| default | Child element wrapped by logo |
| content | Custom logo content           |