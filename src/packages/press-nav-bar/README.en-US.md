---
url : pages/press/nav-bar/nav-bar
---

## NavBar

Provides navigation for the page, often used at the top of the page.

## Code Demo

### Basic usage

```html
<press-nav-bar
   title="title"
   left-text="Back"
   right-text="button"
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

### Advanced usage

Customize content through slots.

```html
<press-nav-bar title="Title" left-text="Back" left-arrow>
   <press-icon-plus name="search" slot="right" />
</press-nav-bar>
```

## API

### Props

| Parameter           | Description                                              | Type      | Default |
| ------------------- | -------------------------------------------------------- | --------- | ------- |
| title               | title                                                    | _string_  | `''`    |
| left-text           | left text                                                | _string_  | `''`    |
| right-text          | right text                                               | _string_  | `''`    |
| left-arrow          | Whether to show the left arrow                           | _boolean_ | `false` |
| fixed               | Whether to fix at the top                                | _boolean_ | `false` |
| placeholder         | Whether to enable placeholder when pinned to the top     | _boolean_ | `false` |
| border              | Whether to show the bottom border                        | _boolean_ | `true`  |
| z-index             | element z-index                                          | _number_  | `1`     |
| custom-style        | root node custom style                                   | _string_  | -       |
| safe-area-inset-top | Whether to leave a top safe distance (status bar height) | _boolean_ | `true`  |

### Slot

| Name  | Description                             |
| ----- | --------------------------------------- |
| title | custom title                            |
| left  | Customize the content of the left area  |
| right | Customize the content of the right area |

### Events

| Event Name  | Description                                | Parameters |
| ----------- | ------------------------------------------ | ---------- |
| click-left  | Triggered when the left button is clicked  | -          |
| click-right | Triggered when the right button is clicked | -          |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |
| title-class  | title style class     |


## Theme customization

<theme-config />