---
url : pages/press/picker/picker
---

## Picker

Selector component for forms

### Basic Usage

**example**


```html
<press-picker
   v-if="pickerOption.tip.show"
   :title="pickerOption.tip.title"
   :arrowIcon="pickerOption.tip.arrowIcon"
   :list="pickerOption.tip.list"
   :tip="pickerOption.tip.tip"
   :current="pickerOption.tip.current"
   @confirm="pickerOption.tip.confirm"
   @cancel="pickerOption.tip.cancel"
/>
```

```ts
export default {
   data() {
     return {
        pickerOption: {
         tip: {
           show: false,
           title: 'Ban bit setting',
           tip: 'After the game is created, it can be set precisely according to the round of the game. ',
           arrowIcon: false,
           list: bpList,
           current: { label: bpList[0].label, value: 1 },
           confirm: (boItem) => {
             this.pickerOption.tip.show = false;
           },
           cancel: () => {
             this.pickerOption.tip.show = false;
           },
         },
       },
     }
   },
   methods: {
     onShowPicker(type) {
       if (this. pickerOption[type]) {
         this.pickerOption[type].show = true;
       }
     },
     onConfirm(...args) {
       this.pickerOption[args[1]].show = false;
     },
     onChange(...args) {
       console.log('onChange.args', args);
     },
   }
},
```

### Function call

To support functional calls, you need to pre-embed components under the page, and specify `mode` as `functional`.

```html
<press-picker
   :id="PRESS_PICKER_ID"
   mode="functional"
/>
```

```ts
export default {
   methods: {
      onShowFunctionalPicker() {
       const { bpList } = this;
       showFunctionalComponent. call(this, {
         selector: `#${PRESS_PICKER_ID}`,
         list: bpList,
         arrowIcon: true,
         current: { label: bpList[1].label, value: 3 },
         title: this.t('banSet'),
         tip: this.t('tipContent'),
       }).then((item) => {
         this.onSuccessTip(item);
       })
         .catch(() => {
           this.onTip('cancel');
         });
     },
   }
}
```

## API

### Props

| property name | type      | default value | description                                                   |
| ------------- | --------- | ------------- | :------------------------------------------------------------ |
| title         | _string_  | -             | title                                                         |
| arrow-icon    | _boolean_ | `false`       | Whether the upper left corner should be shown as a back arrow |
| list          | _Array_   | `[]`          | data list                                                     |
| current       | _Object_  | `null`        | currently selected item                                       |
| tip           | _string_  | -             | tip                                                           |
| mode          | _string_  | -             | pass `functional` when calling a function                     |



### Events

| event name | description     | return value |
| ---------- | --------------- | ------------ |
| cancel     | Click to cancel | -            |
| confirm    | Click OK        | -            |


The following properties are deprecated (`v0.7.32`):


| Type  | Old             | New        |
| ----- | --------------- | ---------- |
| Prop  | show-back-arrow | arrow-icon |
| Prop  | select-list     | list       |
| Prop  | select-item     | current    |
| Event | onClickConfirm  | confirm    |
| Event | onRemove        | cancel     |
## Theme customization

<theme-config />