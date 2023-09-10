---
url: pages/press/award-popup/award-popup
---

## AwardPopup


## Introduction

```ts
import Press award popup layer from 'press-ui/press-award-popup/press-award-popup';

export default {
   components: {
     Press reward popup layer,
   }
}
```

## Code Demo

### Basic usage

```html
  <PressAwardPopup
   v-if="show"
   :award-list="awardList"
   :tip-title="tipTitle"
   confirm-text="Confirm"
   @dimissDialog="onCloseAwardDialog"
   @onConfirm="onCloseAwardDialog"
/>
```

```ts
export default {
   data() {
     return {
       show: false,
       awardList: [],
       tipTitle: 'I didn't get the reward~',
     }
   },
   methods: {
     onCloseAwardDialog() {
       this.show = false;
     },
   }
}
```

## API

### Props

| Parameters    | Description                                                                                                  | Type     | Default value |
| ------------- | ------------------------------------------------------------------------------------------------------------ | -------- | ------------- |
| award-list    | award list                                                                                                   | _array_  | -             |
| cur-role-name | role name                                                                                                    | _string_ | -             |
| tip-title     | When the reward is empty, the pop-up window title, when it is empty, the pop-up window will not be displayed | _string_ | -             |
| confirm-text  | When the reward is empty, the pop-up window confirmation button text                                         | _string_ | -             |
| cancel-text   | When the reward is empty, the pop-up window cancel button copy                                               | _string_ | -             |



### Events

| Event name             | Description                                       | Parameters |
| ---------------------- | ------------------------------------------------- | ---------- |
| dimissDialog           | Pop-up window close                               | -          |
| onGoAward              | Click on "My Prize" to highlight the text         | -          |
| onShowSwitchRoleDialog | Click to switch roles                             | -          |
| onExchange             | Click to confirm and receive                      | -          |
| onConfirm              | When the prize is empty, click the confirm button | -          |
| onCancel               | When the prize is empty, click the cancel button  | -          |


### awardList type

```ts
type IAwardList = Array<{
   goodscfg: {
     goodsicon: string; // picture
   };
   displayName: string; // name
   propType: string; // description
   displayOverduetime: string; // Redemption validity period
   propsPrice: string; // price
   propsNum: string; // quantity
   isShowCheck: boolean; // Whether to display the selection box
   isChecked: boolean; // Whether it is selected
}>
```