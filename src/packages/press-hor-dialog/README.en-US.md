---
url: pages/press/hor-dialog/hor-dialog
---

## HorPopup 


## Introduction

```ts
import PressHorPopup from 'press-ui/press-hor-dialog/press-hor-dialog';

export default {
   components: {
     PressHorPopup,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorPopup
   v-if="show"
   title="title"
   @close="close"
>
   <div style="color: #fff; margin: 10px 20px;font-size: 12px;">
     Don't come here to pile X mountains
   </div>
</PressHorPopup>
```

```ts
export default {
   methods: {
     close() {
       this.show = false;
     },
   },
};
```


## API

### Props

| Parameters    | Description                      | Type      | Default value |
| ------------- | -------------------------------- | --------- | ------------- |
| popup-with    | Popup window width, unit `rem`   | _string_  | `5.6`         |
| title         | title                            | _string_  | -             |
| is-show-close | Whether to show the close button | _boolean_ | `true`        |


### Events

| Event name | Description    | Parameters |
| ---------- | -------------- | ---------- |
| close      | Click to close | -          |


### Slot


| Name | Description    |
| ---- | -------------- |
| -    | Pop-up content |