---
url : pages/press/count-down/count-down
---

## CountDown 

It is used to display the countdown value in real time and supports millisecond precision.


## Code Demo

### Basic Usage

The `time` attribute indicates the total duration of the countdown, in milliseconds.

```html
<press-count-down :time="time" />
```

```js
Page({
   data: {
     time: 30*60*60*1000,
   },
});
```

### Custom format

Set the content of the countdown text via the `format` property.

```html
<press-count-down :time="time" format="DD day HH hour mm minute ss second" />
```

### Rendering in milliseconds

The countdown renders once per second by default, setting the `millisecond` property can enable millisecond-level rendering.

```html
<press-count-down millisecond :time="time" format="HH:mm:ss:SSS" />
```

### Custom styles

After setting the `use-slot` attribute, you can customize the countdown style. You need to get the `timeData` object through the `@change` event and render it yourself. The format is shown in the table below.

```html
<press-count-down use-slot :time="time" @change="onChange">
   <text class="item">{{ timeData. hours }}</text>
   <text class="item">{{ timeData. minutes }}</text>
   <text class="item">{{ timeData. seconds }}</text>
</press-count-down>
```

```js
export default {
   data() {
     return {
       time: 30*60*60*1000,
       timeData: {},
     }
   },
   methods: {
     onChange(val) {
       this.timeData = val;
     }
   },
};
```

```css
.item {
   display: inline-block;
   width: 22px;
   margin-right: 5px;
   color: #fff;
   font-size: 12px;
   text-align: center;
   background-color: #1989fa;
   border-radius: 2px;
}
```

### Manual control

After obtaining the component instance through the `selectComponent` selector, you can call the `start`, `pause`, `reset` methods.

```html
<press-count-down
   class="control-count-down"
   millisecond
   :time="3000"
   :auto-start="false"
   format="ss:SSS"
   @finish="finished"
/>

<press-grid clickable :column-num="3">
   <press-grid-item text="start" icon="play-circle-o" @click="start" />
   <press-grid-item text="pause" icon="pause-circle-o" @click="pause" />
   <press-grid-item text="reset" icon="replay" @click="reset" />
</press-grid>
```

```js
export default {
   methods: {
     start() {
       const countDown = this.selectComponent('.control-count-down');
       countDown. start();
     },

     pause() {
       const countDown = this.selectComponent('.control-count-down');
       countDown. pause();
     },

     reset() {
       const countDown = this.selectComponent('.control-count-down');
       countDown. reset();
     },

     finished() {
       Toast('countdown ends');
     },
   }
}
```

## API

### Props

| Parameter   | Description                                                         | Type      | Default    |
| ----------- | ------------------------------------------------------------------- | --------- | ---------- |  |
| time        | countdown duration, in milliseconds                                 | _number_  | -          |
| format      | time format, DD-day, HH-hour, mm-minute, ss-second, SSS-millisecond | _string_  | `HH:mm:ss` |
| auto-start  | Whether to automatically start the countdown                        | _boolean_ | `true`     |
| millisecond | Whether to enable millisecond rendering                             | _boolean_ | `false`    |
| use-slot    | Whether to use custom style slots                                   | _boolean_ | `false`    |

### Events

| Event Name | Description                                                                | Callback Parameters |
| ---------- | -------------------------------------------------------------------------- | ------------------- |  |
| @finish    | Triggered when the countdown ends                                          | -                   |
| @change    | Triggered when the time changes, only triggered when `use-slot` is enabled | timeData            |

### timeData format

| Name         | Description            | Type     |
| ------------ | ---------------------- | -------- |
| days         | remaining days         | _number_ |
| hours        | remaining hours        | _number_ |
| minutes      | remaining minutes      | _number_ |
| seconds      | seconds remaining      | _number_ |
| milliseconds | remaining milliseconds | _number_ |

### method

You can get the CountDown instance and call the instance method through selectComponent.

| method name | parameters | return value | description                                                                                        |
| ----------- | ---------- | ------------ | -------------------------------------------------------------------------------------------------- |  |
| start       | -          | -            | Start countdown                                                                                    |
| pause       | -          | -            | pause countdown                                                                                    |
| reset       | -          | -            | Reset the countdown, if `auto-start` is `true`, the countdown will start automatically after reset |