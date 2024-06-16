---
url: pages/press/popup/popup
---

## Popup


Pop-up layer component, which pops up a message prompt window, prompt box, etc. in the application


### close icon

Set `close-icon` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :close-icon="true"
     :arrow-icon="false"
     :title="title"
     title-btn="OK"
     @confirm="confirm"
     @cancel="cancel"
   >
     <div class="content">
       some content
     </div>
   </PressPopup>
</template>
```

```ts
export default {
   data() {
     return {
       title: 'Decisive Way',
       show: false;
     }
   },
   methods: {
     cancel() {
       this. show = false;
     },
     confirm() {
       this. show = false;
     },
   }
};
</script>
```

### cancel icon

Set `close-icon` to `true` and `arrow-icon` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :close-icon="true"
     :arrow-icon="true"
     :title="title"
     title-btn="OK"
     @confirm="confirm"
     @cancel="cancel"
   >
     <div class="content">
       some content
     </div>
   </PressPopup>
</template>
```

### No close/cancel

Set `close-icon` to `false` and `arrow-icon` to `false`.


```html
<template>
   <Press Popup
     v-if="show"
     :close-icon="false"
     :arrow-icon="false"
     :title="title"
     title-btn="OK"
     @confirm="confirm"
     @cancel="cancel"
   >
     <div class="content">
       some content
     </div>
   </PressPopup>
</template>
```



### Wireframe confirmation icon

Set `border-button` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :close-icon="true"
     :arrow-icon="false"
     :border-button="true"
     :title="title"
     title-btn="OK"
     @confirm="confirm"
     @cancel="cancel"
   >
     <div class="content">
       some content
     </div>
   </PressPopup>
</template>
```

### Horizontal version

Set `horizontal` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :close-icon="true"
     :horizontal="true"
     :width-number="54"
     :title="title"
     @confirm="confirm"
     @cancel="cancel"
   >
     <div class="content">
       some content
     </div>
   </PressPopup>
</template>
```

### Asynchronous shutdown

An asynchronous shutdown will be triggered when there is `validateConfirm` in the parent component method.

```html
  <Press Popup
   v-if="popupOptions.noClose.show"
   :close-icon="false"
   :arrow-icon="false"
   :title="popupOptions.noClose.title"
   :title-btn="t('confirm')"
   @confirm="popupOptions.noClose.confirm"
   @cancel="popupOptions.noClose.cancel"
>
   <div class="content">
     {{ t('SomeContent') }}
   </div>
</PressPopup>
```

```ts
export default {
   data() {
     return {
       popupOptions: {
         noClose: {
           show: false,
           title: this.t('wayToWin'),
           cancel: () => {
             this.popupOptions.noClose.show = false;
           },
           confirm: () => {
             this.popupOptions.noClose.show = false;
           },
         },
       }
     }
   },
   methods: {
     validateConfirm() {
       if (['noClose', 'borderBtn']. indexOf(this. type) <= -1) return true;

       return new Promise((resolve) => {
         setTimeout(() => {
           if (this. type === 'noClose') {
             console.log('can be closed after asynchronous confirmation');
             resolve(true);
           } else {
             resolve(false);
             console.log('Close prohibited after asynchronous confirmation');
           }
         }, 2000);
       });
     }
   }
}
```

### Function call

To support functional calls, you need to pre-embed components under the page, and specify `mode` as `functional`.

```html
<press-popup
   :id="PRESS_PICKER_ID"
   mode="functional"
>
   <div class="content">
     {{ t('SomeContent') }}
   </div>
</press-popup>
```

```ts
export default {
   methods: {
     onShowFunctionalPicker() {
       showFunctionalComponent. call(this, {
       selector: `#${PRESS_PICKER_ID}`,
       title: this.t('wayToWin'),
       button: this.t('confirm'),
       horizontal: false,
       closeIcon: false,
       arrowIcon: true,
       borderButton: false,
       customStyle: '',
     }).then(() => {
       this.onTip('confirm');
     })
       .catch(() => {
         this.onTip('cancel');
       });
     },
   }
}
```


## API

### Popup Props

| property name          | type                                 | default value | description                                                                                 |
| ---------------------- | ------------------------------------ | ------------- | :------------------------------------------------------------------------------------------ |
| show-title             | _boolean_                            | `true`        | Whether to show the title                                                                   |
| title                  | _string_                             | -             | popup window title                                                                          |
| button                 | _string_                             | -             | popup title button                                                                          |
| border-button          | _boolean_                            | `false`       | header button style                                                                         |
| z-index                | _string_                             | `99`          | popup level                                                                                 |
| popup-class            | _string_                             | -             | class name                                                                                  |
| close-on-click-overlay | _boolean_                            | `true`        | Whether to click the overlay to close                                                       |
| close-icon             | _boolean_                            | `false`       | Whether to display the close icon                                                           |
| arrow-icon             | _boolean_                            | `false`       | Whether to display as a back arrow                                                          |
| horizontal             | _boolean_                            | `false`       | Whether to switch the horizontal panel style                                                |
| width-number           | _number_                             | `100`         | Horizontal popup window width percentage                                                    |
| validate-confirm       | _Function_                           | -             | Intercept if `validate-confirm` returns `false` before executing the confirmation animation |
| mode                   | _string_                             | -             | pass `functional` when calling a function                                                   |
| disabledButton         | _boolean_                            | `false`       | button disabled                                                                             |
| lock-scroll            | Whether to lock background scrolling | _boolean_     | `true`                                                                                      |




### Popup Events

| event name | description     | return value |
| ---------- | --------------- | ------------ |
| cancel     | Click to cancel | -            |
| confirm    | Click OK        | -            |

The following properties are deprecated (`v0.7.32`):


| Type  | Old                 | New                    |
| ----- | ------------------- | ---------------------- |
| Prop  | show-back-arrow     | arrow-icon             |
| Prop  | is-show popup-close | close-icon             |
| Prop  | is-show-title       | show-title             |
| Prop  | is-cross-slab       | horizontal             |
| Prop  | popup-title         | title                  |
| Prop  | popup-title-btn     | button                 |
| Prop  | is-border-btn       | border-button          |
| Prop  | can-touch-remove    | close-on-click-overlay |
| Event | onConfirm           | confirm                |
| Event | onCancel            | cancel                 |