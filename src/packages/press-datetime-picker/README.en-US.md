---
url : pages/press/datetime-picker/datetime-picker
---

## DatetimePicker 

It is used to select time, supports time dimensions such as date and hour, and is usually used in conjunction with the popup layer component.



### select full time

`value` is the timestamp.

```html
<press-datetime-picker
   type="datetime"
   :value="currentDate"
   :min-date="minDate"
   :max-date="maxDate"
   @input="onInput"
/>
```

```javascript
export default {
   data() {
     return {
       minDate: new Date(). getTime(),
       maxDate: new Date(2099, 10, 1). getTime(),
       currentDate: new Date(). getTime(),
     };
   },
   methods: {
     onInput(event) {
       this. currentDate = event;
     },
   },
};
```

### select date (year month day)

`value` is the timestamp, passed to the `formatter` function to process the option text.

```html
<press-datetime-picker
   type="date"
   :value="currentDate"
   :min-date="minDate"
   :filter="filter"
   :formatter="formatter"
   @input="onInput"
/>
```

```js
export default {
   data() {
     return {
       isOpen: false,
       minHour: 10,
       maxHour: 20,
       minDate: new Date(). getTime(),
       maxDate: new Date(2099, 10, 1). getTime(),
       currentDate: new Date(). getTime(),

       formatter(type, val) {
         if (type === 'year') {
           return `${val}year`;
         } if (type === 'month') {
           return `${val}month`;
         } if (type === 'day') {
           return `${val}day`;
         } if (type === 'hour') {
           return `${val}`;
         } if (type === 'minute') {
           return `${val} points`;
         }
       },
       filter(type, options) {
         if (type === 'minute') {
           return options. filter(option => option % 5 === 0);
         }
         return options;
       },
     };
   },
   methods: {
     onInput(event) {
       console.log('onInput.event', event);
       this. currentDate = event;
     },
   },
};
```

### Select date (year, month)

`value` is the timestamp.

```html
<press-datetime-picker
   type="year-month"
   :value="currentDate"
   :min-date="minDate"
   @input="onInput"
/>
```

```js
export default {
   data() {
     return {
       minDate: new Date(). getTime(),
       currentDate: new Date(). getTime(),
     };
   },
   methods: {
     onInput(event) {
       this. currentDate = event;
     },
   },
};
```

### selection period

`value` is a string.

```html
<press-datetime-picker
   type="time"
   :value="currentTime"
   :min-hour="minHour"
   :max-hour="maxHour"
   @input="onInputTime"
/>
```

```js
export default {
   data() {
     return {
       minHour: 10,
       maxHour: 20,
       currentTime: '12:00',
     };
   },
   methods: {
     onInputTime(event) {
       console.log('onInputTime.event', event);
       this.currentTime = event;
     },
   },
};
```

### option filter

By passing in the `filter` function, the option array can be filtered to achieve a custom time interval.

```html
<press-datetime-picker
   type="time"
   :value="currentTime"
   :filter="filter"
/>
```

```js
Page({
   data: {
     currentTime: '12:00',
     filter(type, options) {
       if (type === 'minute') {
         return options. filter((option) => option % 5 === 0);
       }

       return options;
     },
   },
});
```

## API

### Props

| Parameter           | Description                                                                                                        | Type                       | Default         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------- |
| value               | currently selected value                                                                                           | _string \| number_         | -               |
| type                | type, optional values are `date` `time` `year-month` <br> <strong>Dynamic modification is not recommended</strong> | _string_                   | `datetime`      |
| min-date            | optional minimum date, accurate to minutes                                                                         | _number_                   | ten years ago   |
| max-date            | optional maximum date in minutes                                                                                   | _number_                   | ten years later |
| min-hour            | Optional minimum hour for time type                                                                                | _number_                   | `0`             |
| max-hour            | optional maximum hour for time type                                                                                | _number_                   | `23`            |
| min-minute          | optional minimum minute for time type                                                                              | _number_                   | `0`             |
| max-minute          | Optional maximum minute for time type                                                                              | _number_                   | `59`            |
| filter              | option filter function (`type` possible values are `year`, `month`, `day`, `hour`, `minute`)                       | _(type, values) => values_ | -               |
| formatter           | option formatting function (`type` possible values are `year`, `month`, `day`, `hour`, `minute`)                   | _(type, value) => value_   | -               |
| title               | top bar title                                                                                                      | _string_                   | `''`            |
| show-toolbar        | Whether to show the top bar                                                                                        | _boolean_                  | `true`          |
| loading             | Whether to show loading status                                                                                     | _boolean_                  | `false`         |
| item-height         | item height                                                                                                        | _number_                   | `44`            |
| confirm-button-text | confirm button text                                                                                                | _string_                   | `confirm`       |
| cancel-button-text  | cancel button text                                                                                                 | _string_                   | `cancel`        |
| visible-item-count  | number of visible items                                                                                            | _number_                   | `6`             |

### Events

| Event Name | Description                                     | Callback Parameters |
| ---------- | ----------------------------------------------- | ------------------- |
| input      | event fired when value changes                  | current value       |
| change     | event fired when the value changes              | component instance  |
| confirm    | event triggered when the done button is clicked | current value       |
| cancel     | Event fired when the cancel button is clicked   | -                   |

### change event

In the `change` event, the component instance can be obtained, and the component can be updated accordingly:

| function                       | description                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| getColumnValue(index)          | Get the selected value in the corresponding column             |
| setColumnValue(index, value)   | Set the selected value in the corresponding column             |
| getColumnValues(index)         | Get all the alternative values in the corresponding column     |
| setColumnValues(index, values) | set all alternative values in the corresponding column         |
| getValues()                    | Get the selected values in all columns and return an array     |
| setValues(values)              | `values` is an array, set the selected values ​​in all columns |