---
url: pages/press/popup/popup
---

## Popup


Pop-up layer component, which pops up a message prompt window, prompt box, etc. in the application


### close icon

Set `is-showpopup-close` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :is-showpopup-close="true"
     :show-back-arrow="false"
     :popup-title="title"
     popup-title-btn="OK"
     @onConfirm="onConfirm"
     @onCancel="onCancel"
   >
     <view class="content">
       some content
     </view>
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
     onCancel() {
       this. show = false;
     },
     onConfirm() {
       this. show = false;
     },
   }
};
</script>
```

### cancel icon

Set `is-showpopup-close` to `true` and `show-back-arrow` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :is-showpopup-close="true"
     :show-back-arrow="true"
     :popup-title="title"
     popup-title-btn="OK"
     @onConfirm="onConfirm"
     @onCancel="onCancel"
   >
     <view class="content">
       some content
     </view>
   </PressPopup>
</template>
```

### No close/cancel

Set `is-showpopup-close` to `false` and `show-back-arrow` to `false`.


```html
<template>
   <Press Popup
     v-if="show"
     :is-showpopup-close="false"
     :show-back-arrow="false"
     :popup-title="title"
     popup-title-btn="OK"
     @onConfirm="onConfirm"
     @onCancel="onCancel"
   >
     <view class="content">
       some content
     </view>
   </PressPopup>
</template>
```



### Wireframe confirmation icon

Set `is-border-btn` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :is-showpopup-close="true"
     :show-back-arrow="false"
     :is-border-btn="true"
     :popup-title="title"
     popup-title-btn="OK"
     @onConfirm="onConfirm"
     @onCancel="onCancel"
   >
     <view class="content">
       some content
     </view>
   </PressPopup>
</template>
```

### Horizontal version

Set `is-cross-slab` to `true`.


```html
<template>
   <Press Popup
     v-if="show"
     :is-showpopup-close="true"
     :is-cross-slab="true"
     :width-number="54"
     :popup-title="title"
     @onConfirm="onConfirm"
     @onCancel="onCancel"
   >
     <view class="content">
       some content
     </view>
   </PressPopup>
</template>
```

## API

### Popup Props

|  property name   |   type   | default value | description                                                                                             |
| :--------------: | :------: | :-----------: | :------------------------------------------------------------------------------------------------------ |
|   isShowTitle    | Boolean  |     true      | whether to show the title                                                                               |
|    popupTitle    |  String  |       -       | popup window title                                                                                      |
|  popupTitleBtn   |  String  |       -       | Popup title button                                                                                      |
|   isBorderBtn    | Boolean  |     false     | header button style                                                                                     |
| validateConfirm  | Function |       -       | Before the confirmation animation is executed, if validateConfirm returns false, it will be intercepted |
|      zIndex      |  String  |     '99'      | popup level                                                                                             |
|    popupClass    |  String  |       -       | class                                                                                                   |
|  canTouchRemove  | Boolean  |     true      | Can touch the mask to close                                                                             |
| isShowpopupClose | Boolean  |     false     | Whether to show the close button                                                                        |
|  showBackArrow   | Boolean  |     false     | whether to show back arrow                                                                              |
|   isCrossSlab    | Boolean  |     false     | Whether to switch the cross-slab style                                                                  |
|   widthNumber    |  Number  |      100      | Percentage of horizontal popup window width                                                             |





### Popup Events

| event name |   description   | return value |
| :--------: | :-------------: | :----------: |
|  onCancel  | Click to cancel |      -       |
| onConfirm  |    Click OK     |      -       |