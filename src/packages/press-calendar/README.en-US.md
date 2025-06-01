---
url : pages/press/calendar/calendar
---

## Calendar

The calendar component is used to select a date or date range.


## Usage

### Select a single date

The following demonstrates the use of the calendar component in conjunction with the cell, and the `confirm` event will be triggered after the date selection is completed.

```html
<press-cell title="Select a single date" :value="date" @click="onDisplay" />
<press-calendar :show="show" @close="onClose" @confirm="onConfirm" />
```

```js
export default {
   data() {
     return {
       date: '',
       show: false,
     }
   },
   methods: {
     onDisplay() {
       this. show = true;
     },
     onClose() {
       this. show = false;
     },
     formatDate(date) {
       date = new Date(date);
       return `${date.getMonth() + 1}/${date.getDate()}`;
     },
     onConfirm(detail) {
       this. show = false;
       this.date = this.formatDate(detail);
     },
   }
};
```

### Select multiple dates

After setting `type` to `multiple`, multiple dates can be selected. At this time, the date returned by the `confirm` event is an array structure, and the array contains several selected dates.

```html
<press-cell title="Select Multiple Dates" :value="text" @click="onDisplay" />
<press-calendar
   :show="show"
   type="multiple"
   @close="onClose"
   @confirm="onConfirm"
/>
```

```js
export default {
   data() {
     return {
       text: '',
       show: false,
     }
   },
   methods: {
     onDisplay() {
       this. show = true;
     },
     onClose() {
       this. show = false;
     },
     onConfirm(detail) {
       this. show = false;
       this.date = `${detail.length} dates selected`;
     },
   }
};
```

### Select date range

After setting `type` to `range`, you can choose a date range. At this time, the date returned by the `confirm` event is an array structure. The first item of the array is the start time, and the second item is the end time.

```html
<press-cell title="Select Date Range" :value="date" @click="onDisplay" />
<press-calendar
   :show="show"
   type="range"
   @close="onClose"
   @confirm="onConfirm"
/>
```

```js
export default {
   data() {
     return {
       date: '',
       show: false,
     }
   },
   methods: {
     onDisplay() {
       this. show = true;
     },
     onClose() {
       this. show = false;
     },
     formatDate(date) {
       date = new Date(date);
       return `${date.getMonth() + 1}/${date.getDate()}`;
     },
     onConfirm(detail) {
       const [start, end] = detail;
       this. show = false;
       this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
     },
   }
};
```

> Tips: By default, the start and end time of the date range cannot be the same day, you can set the allow-same-day attribute to allow the same day to be selected.

### Shortcut selection

Setting `show-confirm` to `false` can hide the confirm button, in which case the `confirm` event will be triggered immediately after the selection is completed.

```html
<press-calendar :show="show" :show-confirm="false" />
```

### Custom Colors

The color of the calendar can be customized through the `color` attribute, which is effective for the selected date and the bottom button.

```html
<press-calendar :show="show" color="#07c160" />
```

### Custom date range

Define the range of the calendar through `min-date` and `max-date`. It should be noted that the interval between `min-date` and `max-date` should not be too large, otherwise it will cause serious performance problems.

```html
<press-calendar
   :show="show"
   :min-date="minDate"
   :max-date="maxDate"
/>
```

```js
export default {
   data() {
     return {
       show: false,
       minDate: new Date(2010, 0, 1). getTime(),
       maxDate: new Date(2010, 0, 31). getTime(),
     }
   },
};
```

### Custom button text

Set the button text by `confirm-text`, and set the text when the button is disabled by `confirm-disabled-text`.

```html
<press-calendar
   :show="show"
   type="range"
   confirm-text="Complete"
   confirm-disabled-text="Please select an end time"
/>
```

### Custom date text

Format the content of each cell on the calendar by passing in the `formatter` function

```html
<press-calendar :show="show" type="range" :formatter="formatter" />
```

```js
export default {
   data() {
     return {
       formatter(day) {
         const month = day.date.getMonth() + 1;
         const date = day.date.getDate();

         if (month === 5) {
           if (date === 1) {
             day.topInfo = 'Labor Day';
           } else if (date === 4) {
             day.topInfo = 'May Fourth Youth Day';
           } else if (date === 11) {
             day.text = 'today';
           }
         }

         if (day.type === 'start') {
           day.bottomInfo = 'check in';
         } else if (day.type === 'end') {
           day.bottomInfo = 'Check out';
         }

         return day;
       },
     }
   },
};
```

### Customize popup position

Use the `position` attribute to customize the pop-up position of the pop-up layer. The optional values are `top`, `left`, `right`.

```html
<press-calendar :show="show" round="false" position="right" />
```

### Maximum date range

When selecting a date range, you can use the `max-range` attribute to specify the maximum number of days that can be selected. When the selected range exceeds the maximum number of days that can be selected, a corresponding prompt copy will pop up.

```html
<press-calendar type="range" :max-range="3" />
```

### Custom week start day

Set the day the week starts with the `first-day-of-week` prop.

```html
<press-calendar :first-day-of-week="1" />
```

### Tiled display

Set `poppable` to `false`, the calendar will be displayed directly on the page instead of popup.

```html
<press-calendar
   title="Calendar"
   :poppable="false"
   :show-confirm="false"
   class="calendar"
/>
```

```css
.calendar {
   --calendar-height: 500px;
}
```

## API

### Props

| Parameter             | Description                                                                                                                                   | Type                       | Default                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------- |
| type                  | Selection type:<br>`single`means selecting a single date,<br>`multiple`means selecting multiple dates,<br>`range`means selecting a date range | _string_                   | `single`                      |
| title                 | calendar title                                                                                                                                | _string_                   | `date selection`              |
| color                 | theme color, effective for bottom button and selected date                                                                                    | _string_                   | `#ee0a24`                     |
| min-date              | Optional minimum date                                                                                                                         | _timestamp_                | current date                  |
| max-date              | maximum date to choose                                                                                                                        | _timestamp_                | six months after current date |
| default-date          | The date selected by default, an array when `type` is `multiple` or `range`                                                                   | _timestamp \| timestamp[]_ | today                         |
| row-height            | date row height                                                                                                                               | _number \| string_         | `64`                          |
| formatter             | date formatting function                                                                                                                      | _(day: Day) => Day_        | -                             |
| poppable              | Whether to display the calendar as a popup                                                                                                    | _boolean_                  | `true`                        |
| show-mark             | Whether to show month background watermark                                                                                                    | _boolean_                  | `true`                        |
| show-title            | Whether to show calendar title                                                                                                                | _boolean_                  | `true`                        |
| show-subtitle         | Whether to show calendar subtitle (year, month)                                                                                               | _boolean_                  | `true`                        |
| show-confirm          | Whether to show the confirm button                                                                                                            | _boolean_                  | `true`                        |
| confirm-text          | Text of the confirm button                                                                                                                    | _string_                   | `OK`                          |
| confirm-disabled-text | Text when confirm button is disabled                                                                                                          | _string_                   | `OK`                          |
| first-day-of-week     | Set the first day of the week                                                                                                                 | _0~6_                      | `0`                           |
| readonly `v1.9.1`     | whether it is read-only, date cannot be selected in read-only state                                                                           | _boolean_                  | `false`                       |


### Poppable Props

When `poppable` of Calendar is `true`, the following props are supported:

| Parameter              | Description                                              | Type      | Default  |
| ---------------------- | -------------------------------------------------------- | --------- | -------- |
| show                   | Whether to show the calendar popup                       | _boolean_ | `false`  |
| position               | PopupPlus position, optional values are `top` `right` `left` | _string_  | `bottom` |
| round                  | Whether to show rounded popups                           | _boolean_ | `true`   |
| close-on-click-overlay | Whether to close the overlay on click                    | _boolean_ | `true`   |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation            | _boolean_ | `true`   |

### Range Props

When the `type` of Calendar is `range`, the following props are supported:

| Parameter         | Description                                                                                     | Type               | Default                               |
| ----------------- | ----------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------- |
| max-range         | The maximum number of optional days in the date range, the default is unlimited                 | _number \| string_ | -                                     |
| range-prompt      | Prompt text when the range selection exceeds the maximum selectable days                        | _string \| null_   | `Selected days cannot exceed xx days` |
| show-range-prompt | Whether to display the prompt text when the range selection exceeds the maximum selectable days | _boolean_          | `true`                                |
| allow-same-day    | Whether to allow date ranges to start and end on the same day                                   | _boolean_          | `false`                               |


### Day data structure

Each date in the calendar corresponds to a Day object, and the content of the Day object can be customized through the `formatter` property.

| key name   | description                                                                     | type     |
| ---------- | ------------------------------------------------------------------------------- | -------- |
| date       | The Date object corresponding to the date                                       | _Date_   |
| type       | date type, optional values are `selected`, `start`, `middle`, `end`, `disabled` | _string_ |
| text       | text displayed in the middle                                                    | _string_ |
| topInfo    | Top tip information                                                             | _string_ |
| bottomInfo | Bottom message                                                                  | _string_ |
| className  | custom className                                                                | _string_ |

### Events

| Event Name               | Description                                                                                                               | Callback Parameters            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| @select                  | Triggered when any date is clicked                                                                                        | _value: Date \| Date[]_        |
| @unselect                | When the `type` of the Calendar is `multiple`, trigger when the selected date is clicked                                  | _value: Date_                  |
| @confirm                 | Triggered after the date is selected, if `show-confirm` is `true`, it will be triggered after clicking the confirm button | _value: Date \| Date[]_        |
| @open                    | Triggered when the popup layer is opened                                                                                  | -                              |
| @close                   | Triggered when the popup layer is closed                                                                                  | -                              |
| @opened                  | Triggered when the popup layer is opened and the animation ends                                                           | -                              |
| @closed                  | Triggered when the popup layer is closed and the animation ends                                                           | -                              |
| @over-range              | Triggered when the range selection exceeds the maximum selectable days                                                    | -                              |
| @click-subtitle `v1.8.1` | Triggered when the calendar subtitle is clicked                                                                           | _WechatMiniprogram.TouchEvent_ |


### Slots

| Name   | Description                              |
| ------ | ---------------------------------------- |
| title  | custom title                             |
| footer | Customize the content of the bottom area |

### method

You can get the Calendar instance and call the instance method through selectComponent.

| method name | description                          | parameters | return value |
| ----------- | ------------------------------------ | ---------- | ------------ |
| reset       | reset selected date to default value | -          | -            |

