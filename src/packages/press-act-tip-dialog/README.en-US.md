---
url : pages/press/act-tip-dialog/act-tip-dialog
---

## ActTipDialog

## import

```ts
import PressActTipDialog from 'press-ui/press-act-tip-dialog/press-act-tip-dialog';

export default {
   components: {
     PressActTipDialog,
   }
}
```

## Code Demo

### Basic usage

**example**

```html
<PressActTipDialog
   :show="show"
   :title="title"
   :message="message"
   :show-cancel-button="showCancelButton"
   :show-confirm-button="showConfirmButton"
   :cancel-button-text="cancelButtonText"
   :confirm-button-text="confirmButtonText"
   @confirm="confirm"
   @cancel="cancel"
/>
```

```js
import PressActTipDialog from 'src/packages/press-act-tip-dialog/press-act-tip-dialog.vue';
export default {
   components: {
     PressActTipDialog,
   },
   data() {
     return {
       show: false,
       title: 'title',
       message: 'message',
       showCancelButton: true,
       showConfirmButton: true,
       cancelButtonText: 'cancel',
       confirmButtonText: 'confirm',
     };
   },
   methods: {
     cancel(show) {
       this.show = !show;
     },
     confirm(show) {
       this.show = !show;
     },
   }
};
```

## API

### Props

| Parameter           | Description                        | Type       | Default |
| ------------------- | ---------------------------------- | ---------- | ------- |
| show                | Whether to show popup              | _boolean_  | `false` |
| title               | Title                              | _string_   | Tips    |
| message             | content                            | _string_   | -       |
| show-cancel-button  | Whether to show the cancel button  | _boolean_  | `true`  |
| show-confirm-button | Whether to show the confirm button | _boolean_  | `true`  |
| confirm-text        | Confirm button text                | _string_   | OK      |
| cancel-text         | cancel button text                 | _string_   | cancel  |
| cancel              | click to cancel event              | _function_ | `null`  |
| confirm             | event for confirm click            | _function_ | `null`  |


### Events

| Event Name | Description      | Parameters |
| ---------- | ---------------- | ---------- |
| confirm    | Click to confirm | show       |
| cancel     | click to cancel  | show       |