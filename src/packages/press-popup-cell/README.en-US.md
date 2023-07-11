---
url : pages/press/popup-cell/popup-cell
---

## PopupCell 

The cells wrapped by the popup layer include `cell`, `checkbox`, `button`, `switch`, `tab` and other types, and function calls are recommended.


### Basic usage

Pre-buried in the template first.

```html
<PressPopupCell
   :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
   mode="functional"
/>
```

```ts
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';

function showPopupCell(options) {
   return showFunctionalComponent({
     selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL}`,
     ...options,
   });
}

export default {
   components: {
     PressPopupCell
   },
   methods: {
     onShowBasicPopupCell() {
       showPopupCell({
         closeIcon: true,
         title: 'Popup Cell',
         cellList: [{
           label: 'Decisive method',
           value: 'One game wins',
         },
         {
           label: 'Ban bit',
           value: 'Ban 4 heroes each',
         },
         ],
       }).catch(({ context }) => {
         context. closeDialog();
       });
     },
   }
}
```


### Custom Type

Currently supports `cell`, `checkbox`, `button`, `switch`, `tab` and other types.


```ts
export default {
   data() {
     return {
        customType: {
         checkboxType: {
           title: 'Checkbox',
           cellList: [
             {
               label: 'The game is full of people',
               description: 'The competition can be played when there are at least 10 players from both parties. ',
               type: 'checkbox',
             },
             {
               label: 'Manual start',
               description: 'The administrator manually clicks to start the game, so that the players can start the game. ',
               type: 'checkbox',
               checked: true,
             },
           ],
         },
         tabType: {
           title: 'Tab',
           cellList: [
             {
               type: 'tab',
               label: 'group',
               active: 'winner',
               tabList: [
                 {
                   label: 'winner group',
                   value: 'winner',
                 }, {
                   label: 'Loser Bracket',
                   value: 'loser',
                 },
               ],
             },
           ],
         },
         switchType: {
           title: 'Switch',
           cellList: [
             {
               label: 'Peak Showdown',
               description: 'There is no limit to heroes in the last round, and the lineups of both sides are invisible',
               type: 'switch',
             },
           ],
         },
         buttonType: {
           title: 'Button',
           bottomButton: 'Cancel',
           cellList: [
             {
               label: 'Batch setting timed start',
               type: 'button',
             },
             {
               label: 'Batch setting cut-off playing time',
               type: 'button',
             },
           ],
         },
       },
     }
   },
   methods: {
     onShowCustomType(type) {
       const options = this. customType[type] || {};
       showPopupCell({
         closeIcon: true,
         ...options,
       }).catch(({ context }) => {
         context. closeDialog();
       });
     },
   }
}
```


## API

### PopupCell Props

|     property name      |   type    | default value | description                               |
| :--------------------: | :-------: | :-----------: | :---------------------------------------- |
|       show-title       | _boolean_ |    `true`     | Whether to show the title                 |
|         title          | _string_  |       -       | popup window title                        |
|         button         | _string_  |       -       | popup title button                        |
|     border-button      | _boolean_ |    `false`    | Whether the border button is line style   |
|        z-index         | _string_  |     `99`      | popup level                               |
|      popup-class       | _string_  |       -       | class name                                |
| close-on-click-overlay | _boolean_ |    `true`     | Whether to click the overlay to close     |
|       close-icon       | _boolean_ |    `false`    | Whether to display the close icon         |
|       arrow-icon       | _boolean_ |    `false`    | Whether to display as a back arrow        |
|          mode          | _string_  |       -       | pass `functional` when calling a function |
|        cellList        |  _Array_  |       -       | `cell` list                               |
|          tip           | _string_  |       -       | bottom tip                                |


### PopupCell Events

| event name |   description   | return value |
| :--------: | :-------------: | :----------: |
|   cancel   | Click to cancel |      -       |
|  confirm   |    Click OK     |      -       |

### PopupCell Item Props

| property name |                   type                    | default value |                      description                      |
| :-----------: | :---------------------------------------: | :-----------: | :---------------------------------------------------: |
|     label     |                 _string_                  |       -       |                     `cell` title                      |
|     value     |                 _string_                  |       -       |      `cell` content, valid when `type` is `cell`      |
|     type      |                 _string_                  |    `cell`     | `cell` type, can be `cell/switch/checkbox/button/tab` |
|     open      |                 _boolean_                 |       -       |    Whether to open, valid when `type` is `switch`     |
|   disabled    |                 _boolean_                 |       -       |   Whether to disable, valid when `type` is `switch`   |
|    tabList    | _Array<{label: string, active: boolean}>_ |       -       |        `tab` list, valid when `type` is `tab`         |
|    checked    |                 _boolean_                 |       -       |  Whether to enable, valid when `type` is `checkbox`   |


### PopupCell Item Events


| event name |   description    | return value |
| :--------: | :--------------: | :----------: |
|   click    | click `cellItem` |      -       |