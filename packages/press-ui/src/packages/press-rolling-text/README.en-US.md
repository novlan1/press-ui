---
url : pages/press/rolling-text/rolling-text
---


## RollingText

Rolling text animation, which can roll numbers and other types of text.

## Usage

### Basic Usage

You can set the starting value with `start-num` and the target value with `target-num`. The RollingText component will automatically start the animation, rolling from the starting value to the target value.

```html
<press-rolling-text :start-num="0" :target-num="123" />
```

### Set Rolling Direction

You can set the rolling direction of the numbers using the `direction` prop. By default, it rolls downwards, but you can set it to `up` to roll upwards.

```html
<press-rolling-text :start-num="0" :target-num="432" direction="up" />
```

### Set Stop Order

You can set the order of stopping the animation of each digit through the `stop-order` prop. By default, it stops from the higher digits. Setting `rtl` can stop from the ones digit.

```html
<press-rolling-text :start-num="0" :target-num="54321" stop-order="rtl" />
```

### Roll Non-numeric Text

You can reverse non-numeric content by using the `text-list` prop. The component will rolling from the first item to the last item in the array. Please make sure that the array length is greater than or equal to 2, and that each item has the same length.

```html
<press-rolling-text :text-list="textList" :duration="1" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const textList = ref([
      'aaaaa',
      'bbbbb',
      'ccccc',
      'ddddd',
      'eeeee',
      'fffff',
      'ggggg',
    ]);
    return { textList };
  },
};
```

### Custom Style

The RollingText component provides some CSS variables that you can override to customize the style, or you can directly modify the component's style. Additionally, you can set the height of the numbers using the `height` prop.

```html
<press-rolling-text
  class="my-rolling-text"
  :height="54"
  :start-num="12345"
  :target-num="54321"
/>
```

```css
.my-rolling-text {
  --press-rolling-text-background: #07c160;
  --press-rolling-text-color: white;
  --press-rolling-text-font-size: 24px;
  --press-rolling-text-gap: 6px;
  --press-rolling-text-item-border-radius: 5px;
  --press-rolling-text-item-width: 40px;
}
```

### Manual Control

After obtaining the component instance through `ref`, you can call the `start` and `reset` methods. The `start` method is used to start the animation, and the `reset` method is used to reset the animation.

```html
<press-rolling-text
  ref="rollingTextRef"
  :start-num="0"
  :target-num="54321"
  :auto-start="false"
/>
<press-grid clickable :column-num="3">
  <press-grid-item icon="play-circle-o" :text="start" @click="start" />
  <press-grid-item icon="replay" :text="reset" @click="reset" />
</press-grid>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const rollingTextRef = ref(null);
    const start = () => {
      rollingTextRef.value.start();
    };
    const reset = () => {
      rollingTextRef.value.reset();
    };
    return { rollingTextRef, start, reset };
  },
};
```

## API

### Props

| Attribute  | Description                                                                       | Type       | Default |
| ---------- | --------------------------------------------------------------------------------- | ---------- | ------- |
| start-num  | Start number                                                                      | _number_   | `0`     |
| target-num | Target number                                                                     | _number_   | -       |
| text-list  | Text array                                                                        | _string[]_ | `[]`    |
| duration   | Duration of the animation, in seconds                                             | _number_   | `2`     |
| direction  | Rolling direction of the text, with `down` and `up` as the values                 | _string_   | `down`  |
| auto-start | Whether to start the animation                                                    | _boolean_  | `true`  |
| stop-order | Order of stopping the animation of each digit, with `ltr` and `rtl` as the values | _string_   | `ltr`   |
| height     | Height of digit, `px` as unit                                                     | _number_   | `40`    |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get RollingText instance and call instance methods.

| Name  | Description         | Attribute | Return value |
| ----- | ------------------- | --------- | ------------ |
| start | Start the animation | -         | -            |
| reset | Reset the animation | -         | -            |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.

| Name                                    | Default Value               | Description                        |
| --------------------------------------- | --------------------------- | ---------------------------------- |
| --press-rolling-text-background         | _inherit_                   | Background color of a single digit |
| --press-rolling-text-color              | _var(--press-text-color)_   | Color of the number                |
| --press-rolling-text-font-size          | _var(--press-font-size-md)_ | Font size of the number            |
| --press-rolling-text-gap                | _0px_                       | Spacing between digits             |
| --press-rolling-text-item-width         | _15px_                      | Width of a single digit            |
| --press-rolling-text-item-border-radius | _0px_                       | Border radius of a single digit    |
