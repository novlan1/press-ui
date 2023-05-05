---
url : pages/press/tag/tag
---

## Tag 

Used to mark keywords and summarize main content.


## Code Demo

### Basic usage

The label color is controlled by the `type` attribute, which defaults to gray.

```html
<press-tag type="primary">label</press-tag>
<press-tag type="success">label</press-tag>
<press-tag type="danger">label</press-tag>
<press-tag type="warning">label</press-tag>
```

### Hollow style

Set the `plain` property to hollow style.

```html
<press-tag plain type="primary">label</press-tag>
<press-tag plain type="success">label</press-tag>
<press-tag plain type="danger">label</press-tag>
<press-tag plain type="warning">label</press-tag>
```

### rounded corner style

Rounded corners set by `round`.

```html
<press-tag round type="primary">label</press-tag>
<press-tag round type="success">label</press-tag>
<press-tag round type="danger">label</press-tag>
<press-tag round type="warning">label</press-tag>
```

### markup style

Set to mark style (semi-rounded corners) by `mark`.

```html
<press-tag mark type="primary">label</press-tag>
<press-tag mark type="success">label</press-tag>
<press-tag mark type="danger">label</press-tag>
<press-tag mark type="warning">label</press-tag>
```

### Custom Colors

```html
<press-tag color="#f2826a">label</press-tag>
<press-tag color="#7232dd">label</press-tag>
<press-tag color="#7232dd" plain>label</press-tag>
<press-tag color="#ffe1e1" text-color="#ad0000">label</press-tag>
```

### Label size

```html
<press-tag type="danger">label</press-tag>
<press-tag type="danger" size="medium">label</press-tag>
<press-tag type="danger" size="large">label</press-tag>
```

### Closable tags

Adding the `closeable` attribute indicates that the label can be closed. When the label is closed, the `close` event will be triggered, and the logic of hiding the label can be executed in the `close` event.

```html
  <press-tag
   v-if="show.primary"
   type="primary"
   closeable
   @close="onClose('primary')"
>
   Label
</press-tag>
<press-tag
   v-if="show.success"
   type="success"
   closeable
   @close="onClose('success')"
>
   Label
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
       this. show[type] = false;
     },
   },
}
```

## API

### Props

| Parameter  | Description                                                      | Type      | Default |
| ---------- | ---------------------------------------------------------------- | --------- | ------- |
| type       | type, optional values are `primary` `success` `danger` `warning` | _string_  | -       |
| size       | size, optional value is `large` `medium`                         | _string_  | -       |
| color      | label color                                                      | _string_  | -       |
| plain      | Whether it is hollow style                                       | _boolean_ | `false` |
| round      | Whether it is a rounded corner style                             | _boolean_ | `false` |
| mark       | Whether it is a mark style                                       | _boolean_ | `false` |
| text-color | text color, takes precedence over `color` attribute              | _string_  | `white` |
| closeable  | Whether it is a closeable tag                                    | _boolean_ | `false` |

### Slot

| Name | Description                |
| ---- | -------------------------- |
| -    | Custom Tag display content |

### Events

| Event Name | Description                | Callback Parameters |
| ---------- | -------------------------- | ------------------- |
| close      | fires when a tab is closed | -                   |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

## Theme customization

<theme-config />