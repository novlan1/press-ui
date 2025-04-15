---
url : pages/press/progress/progress
---

## Progress 

Used to show the current progress of an operation.


## Code Demo

### Basic usage

The progress bar is blue by default, use the `percentage` property to set the current progress.

```html
<press-progress :percentage="50" />
```

### Line Thickness

The thickness of the progress bar can be set by `stroke-width`.

```html
<press-progress :percentage="50" stroke-width="8" />
```

### gray

The progress bar will be grayed out after the `inactive` property is set.

```html
<press-progress inactive :percentage="50" />
```

### Style Customization

You can use the `pivot-text` attribute to customize the text, and the `color` attribute to customize the color of the progress bar.

```html
<press-progress pivot-text="orange" color="#f2826a" :percentage="25" />

<press-progress pivot-text="red" color="#ee0a24" :percentage="50" />

<press-progress
   :percentage="75"
   pivot-text="purple"
   pivot-color="#7232dd"
   color="linear-gradient(to right, #be99ff, #7232dd)"
/>
```

## API

### Props

| Parameter    | Description                                                 | Type               | Default                                       |
| ------------ | ----------------------------------------------------------- | ------------------ | --------------------------------------------- |
| inactive     | gray or not                                                 | _boolean_          | `false`                                       |
| percentage   | progress percentage                                         | _number_           | `0`                                           |
| stroke-width | The thickness of the progress bar, the default unit is `px` | _string \| number_ | `4px`                                         |
| show-pivot   | Whether to show progress text                               | _boolean_          | `true`                                        |
| color        | progress bar color                                          | _string_           | `#1989fa`                                     |
| text-color   | progress text color                                         | _string_           | `#fff`                                        |
| track-color  | track color                                                 | _string_           | `#e5e5e5`                                     |
| pivot-text   | text display                                                | _string_           | percentage text                               |
| pivot-color  | Text background color                                       | _string_           | Consistent with the color of the progress bar |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |