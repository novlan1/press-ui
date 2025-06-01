---
url : pages/press/switch/switch
---

## Switch 


Used to toggle between on and off states.

## Code Demo

### Basic usage

```html
<press-switch :checked="checked" @change="onChange" />
```

```javascript
export default{
   data() {
     return {
       checked: true,
     }
   },
   methods: {
     onChange(value) {
       // Need to manually update the checked status
       this. checked = value;
     }
   }
}
```

### Disabled state

```html
<press-switch :checked="checked" disabled />
```

### LoadingPlus Status

```html
<press-switch :checked="checked" loading />
```

### Custom size

```html
<press-switch :checked="checked" size="24px" />
```

### Custom Colors

```html
<press-switch
   :checked="checked"
   active-color="#07c160"
   inactive-color="#ee0a24"
/>
```

### Asynchronous control

```html
<press-switch :checked="checked" @change="onChange" />

<!-- #ifndef H5 -->
<PressDialogPlus
   id="tip-match-comm-tips-dialog"
/>
<!-- #endif -->
```

```js
import PressDialogPlusHandler from 'press-ui/press-dialog-plus';

export default {
   data() {
     return {
       checked: true,
     }
   },
   methods: {
     onChange(value) {
       PressDialogPlusHandler. show({
         title: 'Prompt',
         content: 'Whether to toggle the switch',
         confirmText: 'Confirm',
         cancelText: 'Cancel',
       }).then(() => {
         this. checked = value;
       });
     },
   }
}
```

### E-SPORT

```html
<PressSwitch
   custom-class="press-switch--e-sport"
   :checked="checked"
   @change="onChange"
/>
```

## API

### Props

| Parameter      | Description                               | Type      | Default   |
| -------------- | ----------------------------------------- | --------- | --------- |
| name           | Identifier when submitted within the form | _string_  | -         |
| checked        | toggle checked state                      | _any_     | `false`   |
| loading        | Whether it is loading state               | _boolean_ | `false`   |
| disabled       | Whether it is disabled                    | _boolean_ | `false`   |
| size           | switch size                               | _string_  | `30px`    |
| active-color   | Background color when opened              | _string_  | `#1989fa` |
| inactive-color | background color when inactive            | _string_  | `#fff`    |
| active-value   | The value when turned on                  | _any_     | `true`    |
| inactive-value | value when inactive                       | _any_     | `false`   |

### Events

| Event Name | Description                     | Parameters                                   |
| ---------- | ------------------------------- | -------------------------------------------- |
| change     | switch state switching callback | event.detail: whether the switch is selected |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |
| node-class   | dot style class       |

## Theme customization

<theme-config />