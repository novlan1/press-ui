---
url : pages/press/act-tip-dialog/act-tip-dialog
---

## ActTipDialog 

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

|    property name    |    type    | default value | description                        |
| :-----------------: | :--------: | :-----------: | :--------------------------------- |
|        show         | _boolean_  |    `false`    | Whether to show popup              |
|        title        |  _string_  |     Tips      | Title                              |
|       message       |  _string_  |       -       | content                            |
| show-cancel-button  | _boolean_  |    `true`     | Whether to show the cancel button  |
| show-confirm-button | _boolean_  |    `true`     | Whether to show the confirm button |
|    confirm-text     |  _string_  |      OK       | Confirm button text                |
|     cancel-text     |  _string_  |    cancel     | cancel button text                 |
|       cancel        | _function_ |    `null`     | click cancel event                 |
|       confirm       | _function_ |    `null`     | clicked confirm event              |



### Events

| Event Name | Description      | Parameters |
| ---------- | ---------------- | ---------- |
| confirm    | Click to confirm | show       |
| cancel     | click to cancel  | show       |