---
url: pages/press/avatar/avatar
---

## Avatar


## Introduction

```ts
import PressAvatar from 'press-ui/press-avatar/press-avatar.vue';

export default {
   components: {
     PressAvatar,
   }
}
```

## Code Demo

### Basic usage

```html
<PressAvatar src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.…/article/2023/10/own_mike_0ab8e66284a3617ed9.jpeg" />
```


### Avatar shape

Can be set to square via `round` to `false`.

```html
<PressAvatar
   :src="src"
   :round="false"
/>
```

### Avatar size

Set the size via `size`.

```html
<PressAvatar
   size="30"
   :src="src"
/>
```

### IconPlus avatar

Set the icon avatar through `icon`.

```html
<PressAvatar
   icon="star-o"
/>

<PressAvatar
   icon="like-o"
/>
```

### Text avatar

Set text avatar via `text`.

```html
<PressAvatar
   text="Y"
/>

<PressAvatar
   text="G"
/>

<PressAvatar
   text="Yang"
   random-bg-color
/>
```

### Failed to load

If loading fails, the default avatar will be displayed.

```html
<PressAvatar />
```

### Avatar group

Use the `PressAvatarGroup` component to display avatar groups.

```html
<PressAvatarGroup
   :urls="urls"
/>

<PressAvatarGroup
   :urls="urls"
   gap="0.6"
/>

<PressAvatarGroup
   :urls="urls"
   size="50"
/>
```

```ts
export default {
   data() {
     return {
       urls: [
         'a.jpg',
         'b.jpg',
         'c.jpg',
         'd.jpg',
         'e.jpg',
         'f.jpg',
         'g.jpg',
       ]
     }
   }
}
```


## API

### Props

| Parameters              | Description                                                                                    | Type               | Default value |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------ | ------------- |
| src                     | Avatar image path                                                                              | _string_           | -             |
| round                   | Whether it is round                                                                            | _boolean_          | `false`       |
| size                    | size                                                                                           | _string \| number_ | `40`          |
| mode                    | Cropping, scaling mode                                                                         | _string_           | `scaleToFill` |
| text                    | Displayed text                                                                                 | _string_           | -             |
| background-color        | background color                                                                               | _string_           | `#c0c4cc`     |
| color                   | Text color                                                                                     | _string_           | `#fff`        |
| font-size               | text size                                                                                      | _string \| number_ | `18`          |
| mp-avatar               | Whether to display the mini program avatar, only valid for Baidu, WeChat, and QQ mini programs | _boolean_          | `false`       |
| random-background-color | Whether to use random background color                                                         | _boolean_          | `false`       |
| default-url             | Custom loading failed avatar                                                                   | _string_           | -             |
| color-index             | Index specifying the background color                                                          | _number_           | `-1`          |
| name                    | component identifier                                                                           | _string_           | -             |
| custom-style            | custom style                                                                                   | _string_           | -             |



### Events

| Event name | Description         | Parameters |
| ---------- | ------------------- | ---------- |
| click      | Click on the avatar | `name`     |
