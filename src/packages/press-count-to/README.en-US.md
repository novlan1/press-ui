---
url: pages/press/count-to/count-to
---

## CountTo 


## Introduction

```ts
import PressCountTo from 'press-ui/press-count-to/press-count-to';

export default {
   components: {
     PressCountTo,
   }
}
```

## Code Demo

### Basic usage

```html
<PressCountTo
   :start-value="30"
   :end-value="500"
   @end="onEnd"
/>
```

```ts
export default {
   methods: {
     onEnd() {
       this.onGTip('[end]');
     },
   }
}
```

### Custom style

The `color`, `font-size` and `bold` properties can be set.

```html
<PressCountTo
   :end-value="3000"
   color="#909399"
   :font-size="30"
   :bold="true"
/>
```

### Custom duration

The `duration` property can be set.

```html
<PressCountTo
   :start-value="30"
   :end-value="500"
   :duration="5000"
/>
```

### Disable slow animation

By default, the scrolling speed will be slowed down near the end of the scroll to give the user a better visual effect.

Slow animation can be disabled by passing `use-easing` to `false`.


```html
  <PressCountTo
   :start-value="30"
   :end-value="500"
   :use-easing="false"
/>
```

### Countdown

When `start-value` is greater than `end-value`, it is a countdown effect.

```html
<PressCountTo
   :start-value="500"
   :end-value="0"
/>
```

### Decimal places

Decimal places can be set via `decimals`.

```html
<PressCountTo
   :start-value="30"
   :end-value="500"
   :decimals="2"
/>
```

### Thousands separator

Thousands separator can be set via `separator`.

```html
<PressCountTo
   :end-value="5000"
   separator=","
/>
```

### Using slots

After setting the `use-slot` attribute, you can customize the style. You need to get the `value` through the `@change` event and render it yourself.

```html
  <PressCountTo
   :end-value="5000"
   :use-slot="true"
   @change="onChange"
>
   <span style="color: red;">{{ slotValue }}</span>
</PressCountTo>
```

```ts
export default {
   data() {
     return {
       slotValue: '',
     }
   },
   methods: {
     onChange(value) {
       this.slotValue = value;
     },
   }
}
```

### Custom controls

Customized control can be performed by calling methods within the component.

```html
<PressCountTo
   ref="pressCountToRef"
   :end-value="5000"
   :autoplay="false"
/>
```

```ts
export default {
   methods: {
     start() {
       this.$refs.pressCountToRef.start();
     },
     pause() {
       this.$refs.pressCountToRef.stop();
     },
     resume() {
       this.$refs.pressCountToRef.resume();
     },
   }
}
```


## API

### Props

| Parameters  | Description                                            | Type      | Default value |
| ----------- | ------------------------------------------------------ | --------- | ------------- |
| start-value | start value                                            | _number_  | `0`           |
| end-value   | end value                                              | _number_  | `0`           |
| duration    | The time required for the scrolling process, unit `ms` | _number_  | `2000`        |
| autoplay    | Whether to automatically start scrolling               | _boolean_ | `true`        |
| decimals    | Number of decimal places to display                    | _number_  | `0`           |
| use-easing  | When scrolling ends, whether to ease the end           | _boolean_ | `true`        |
| separator   | thousands separator                                    | _string_  | -             |
| color       | font color                                             | _string_  | `#606266`     |
| font-size   | Font size, unit `px`                                   | _string_  | `22`          |
| bold        | Whether the font is bold                               | _string_  | `false`       |


### Methods

| Event name | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| start      | When `autoplay` is `false`, start scrolling through this method     |
| stop       | pause                                                               |
| resume     | Restart when paused                                                 |
| reStart    | In tentative state, restart scrolling; or in scrolling state, pause |



### Events

| Event name | Description                                          | Parameters |
| ---------- | ---------------------------------------------------- | ---------- |
| end        | Triggered when the value scrolls to the target value | -          |
