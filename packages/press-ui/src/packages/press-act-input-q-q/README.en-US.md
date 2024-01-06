---
url: pages/act-detail/act-input-q-q/act-input-q-q
---

## ActInputQQ 


## Introduction

```ts
import PressActInputQQ from 'press-ui/press-act-input-q-q/press-act-input-q-q';

export default {
   components: {
     PressActInputQQ,
   }
}
```

## Code Demo

### Basic usage

```html
<PressActInputQQ
   :show.sync="show"
   :qqnumber.sync="qqNumber"
   @clickButton="clickButton"
/>
```

```ts
export default {
    data() {
     return {
       show: true,
       qqNumber: '111111',
     };
   },
   methods: {
     clickButton() {
       this.onGTip('[clickButton]');
     },
   },
}
```

## API

### Props

| Parameters     | Description                                                                | Type      | Default value |
| -------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| show           | Whether to display the pop-up window                                       | _boolean_ | `false`       |
| qqnumber       | QQ number                                                                  | _string_  | `true`        |
| use-tip-class  | Whether to use the class name prefixed with `tip-comp`                     | _boolean_ | `false`       |
| hide-tip-style | Whether to hide the style added when `@TIP_STYLE_NAME` keyword is compiled | _boolean_ | `false`       |



### Events

| Event name      | Description           | Parameters                 |
| --------------- | --------------------- | -------------------------- |
| clickButton     | Click to confirm      | -                          |
| update:show     | Update display status | `show`, whether to display |
| update:qqnumber | Update QQ             | `qqNumber`, QQ number      |