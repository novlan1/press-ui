---
url : pages/press/slider/slider
---

## Slider 

A sliding input bar for selecting a value within a given range.



## Code Demo

### Basic Usage

```html
<press-slider value="50" @change="onChange" />
```

```js
export default{
   onChange(value) {
     this.$toast(`Current value: ${value}`);
   },
};
```

### Double Slider

Add the `range` attribute to enable the dual slider mode, and ensure that the value of `value` is an array.

```html
<press-slider :value="[10, 50]" range @change="onChange" />
```


### Specify the selection range

```html
<press-slider min="-50" max="50" />
```

### disable

```html
<press-slider value="50" disabled />
```

### Specify the step size

```html
<press-slider value="50" step="10" />
```

### Custom styles

```html
<press-slider value="50" bar-height="4px" active-color="#ee0a24" />
```

### Custom button

```html
<press-slider :value="currentValue" use-button-slot @drag="onDrag">
   <div class="custom-button" slot="button">{{ currentValue }}</div>
</press-slider>
```

```js
export default {
   data() {
     return {
       currentValue: 50,
     }
   },
   onDrag(value) {
     this. currentValue = value;
   },
};
```

### Vertical direction

After setting the `vertical` attribute, the slider will be displayed vertically with a height of 100% of the height of the parent element.

```html
<div style="height: 150px;">
   <press-slider value="50" vertical @change="onChange" />
   <press-slider
     :value="[10, 50]"
     range
     vertical
     style="margin-left: 100px;"
     @change="onChange"
   />
</div>
```


## API

### Props

| Parameter       | Description                                                           | Type                 | Default   |
| --------------- | --------------------------------------------------------------------- | -------------------- | --------- |
| value           | current progress in percentage, in array format in double slider mode | _number \| number[]_ | `0`       |
| disabled        | Whether to disable the slider                                         | _boolean_            | `false`   |
| max             | maximum value                                                         | _number_             | `100`     |
| min             | minimum value                                                         | _number_             | `0`       |
| step            | step size                                                             | _number_             | `1`       |
| bar-height      | progress bar height, the default unit is `px`                         | _string \| number_   | `2px`     |
| active-color    | Active color of the progress bar                                      | _string_             | `#1989fa` |
| inactive-color  | Default color of progress bar                                         | _string_             | `#e5e5e5` |
| use-slot-button | Whether to use the button slot                                        | _boolean_            | `false`   |
| range           | Whether to enable double slider mode                                  | _boolean_            | `false`   |
| vertical        | Whether to display vertically                                         | _boolean_            | `false`   |

### Events

| Event Name | Description                               | Parameters                           |
| ---------- | ----------------------------------------- | ------------------------------------ |
| drag       | Triggered when dragging the progress bar  | event.detail.value: current progress |
| change     | Triggered when the progress value changes | event.detail: current progress       |
| drag-start | Triggered when dragging starts            | -                                    |
| drag-end   | Triggered when drag ends                  | -                                    |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### Slots

| Name         | Description                                               | Parameters          |
| ------------ | --------------------------------------------------------- | ------------------- |
| button       | custom slider button                                      | _{ value: number }_ |
| left-button  | Custom left slider button (in double slider mode)         | _{ value: number }_ |
| right-button | Customize the right slider button (in double slider mode) | _{ value: number }_ |

## Theme customization

<theme-config />