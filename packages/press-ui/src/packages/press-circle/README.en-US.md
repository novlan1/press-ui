---
url : pages/press/circle/circle
---

## Circle

A circular progress bar component that supports progress gradient animation.


## Code Demo

### Basic usage

The `value` attribute represents the target progress of the progress bar.

```html
<press-circle :value="30" text="text" />
```

### Width customization

The width of the progress bar is controlled by the `stroke-width` property.

```html
<press-circle :value="value" stroke-width="6" text="custom width" />
```

### Color customization

The progress bar color is controlled by the `color` property, and the track color is controlled by the `layer-color` property.

```html
<press-circle
   :value="value"
   layer-color="#eeeeee"
   color="#ee0a24"
   text="color customization"
/>
```

### Gradient color

The `color` attribute supports passing in object formats to define gradient colors.

```html
<press-circle :value="value" :color="gradientColor" text="gradient color" />
```

```javascript
Page({
   data: {
     value: 25,
     gradientColor: {
       '0%': '#ffd01e',
       '100%': '#ee0a24',
     },
   },
});
```

### Counterclockwise

Set `clockwise` to `false`, the progress will start from counterclockwise direction.

```html
<press-circle
   :value="value"
   color="#07c160"
   :clockwise="false"
   text="counterclockwise"
/>
```

### Size customization

Set the diameter of the ring via the `size` property.

```html
<press-circle :value="value" size="120" text="size customization" />
```

## API

### Props

| Parameter    | Description                                                                          | Type               | Default   |
| ------------ | ------------------------------------------------------------------------------------ | ------------------ | --------- |
| value        | goal progress                                                                        | _number_           | `0`       |
| type         | Specifies the canvas type, the optional value is `2d`                                | _string_           | -         |
| size         | ring diameter, the default unit is `px`                                              | _number_           | `100`     |
| color        | The color of the progress bar, the input object format can define the gradient color | _string \| object_ | `#1989fa` |
| layer-color  | track color                                                                          | _string_           | `#fff`    |
| fill         | fill color                                                                           | _string_           | -         |
| speed        | animation speed (unit is value/s)                                                    | _number_           | `50`      |
| text         | text                                                                                 | _string_           | -         |
| stroke-width | progress bar width                                                                   | _number_           | `4`       |
| clockwise    | Whether to increase clockwise                                                        | _boolean_          | `true`    |

### Slots

| Name           | Description                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------ |
| -------------- | Custom text content, if `fill` is set, the slot content will be overwritten by native components |

## Theme customization

<theme-config />