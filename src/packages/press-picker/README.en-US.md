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
   :show-back-arrow="pickerOption.tip.showBackArrow"
   :select-list="pickerOption.tip.selectList"
   :tip="pickerOption.tip.tip"
   :select-item="pickerOption.tip.selectItem"
   @onClickConfirm="pickerOption.tip.onClickConfirm"
   @onRemove="pickerOption.tip.onRemove"
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
           showBackArrow: false,
           selectList: bpList,
           selectItem: { label: bpList[0].label, value: 1 },
           onClickConfirm: (boItem) => {
             this.pickerOption.tip.show = false;
           },
           onRemove: () => {
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


## API

### Props

| Property Name |  Type   | Default Value |                        Description                         |
| :-----------: | :-----: | :-----------: | :--------------------------------------------------------: |
|     title     | String  |       -       |                           title                            |
| showBackArrow | Boolean |     false     | Whether the upper left corner is displayed as a back arrow |
|  selectList   |  Array  |      []       |                         data list                          |
|  selectItem   | Object  |     null      |                  Currently selected item                   |
|      tip      | String  |       -       |                            tip                             |




### Events

|   event name   |   description   | return value |
| :------------: | :-------------: | :----------: |
|    onRemove    | Click to cancel |      -       |
| onClickConfirm |    Click OK     |      -       |


## Theme customization

<theme-config />