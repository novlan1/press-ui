---
url : pages/press/field/field
---

## Field 


Users can enter or edit text in the text box.



## Code Demo

### Basic usage

```html
<press-cell-group>
   <press-field
     :value="value"
     placeholder="Please enter a username"
     :border="false"
     @change="onChange"
   />
</press-cell-group>
```

```js
export default {
   data() {
     return {
       value: '',
     }
   },
   methods: {
     onChange(val) {
       console. log(val);
     },
   }
};
```

### Custom Type

Define different types of input boxes according to the `type` attribute.

```html
<press-cell-group>
   <press-field
     :value="username"
     required
     clearable
     label="username"
     icon="question-o"
     placeholder="Please enter a username"
     @click-icon="onClickIcon"
   />

   <press-field
     :value="password"
     type="password"
     label="password"
     placeholder="Please enter a password"
     required
     :border="false"
   />
</press-cell-group>
```

### Disable the input box

```html
<press-cell-group>
   <press-field
     value="Input box is disabled"
     label="username"
     left-icon="contact"
     disabled
     :border="false"
   />
</press-cell-group>
```

### Error message

Add the corresponding error message through the `error` or `error-message` attribute.

```html
<press-cell-group>
   <press-field
     :value="username"
     label="username"
     placeholder="Please enter a username"
     error
   />
   <press-field
     :value="phone"
     label="Mobile phone number"
     placeholder="Please enter your phone number"
     error-message="The mobile phone number format is wrong"
     :border="false"
   />
</press-cell-group>
```

### Content alignment

The alignment of the content can be set through the `input-align` property.

```html
<press-cell-group>
   <press-field
     :value="username"
     label="username"
     placeholder="Please enter a username"
     input-align="right"
   />
</press-cell-group>
```

### Highly adaptive

For textarea, the height can be adjusted by the `autosize` property.

```html
<press-cell-group>
   <press-field
     :value="message"
     label="message"
     type="textarea"
     placeholder="Please enter a message"
     autosize
     :border="false"
   />
</press-cell-group>
```

### Insert button

A button can be inserted at the end of the input box through the button slot.

```html
<press-cell-group>
   <press-field
     :value="sms"
     center
     clearable
     label="SMS verification code"
     placeholder="Please enter SMS verification code"
     :border="false"
     use-button-slot
   >
     <press-button slot="button" size="small" type="primary">
       Send the verification code
     </press-button>
   </press-field>
</press-cell-group>
```

## API

### Props

| Parameter               | Description                                                                                                                                                     | Type                | Default |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| name                    | Identifier when submitted within the form                                                                                                                       | _string_            | -       |
| label                   | left text of input box                                                                                                                                          | _string_            | -       |
| size                    | cell size, optional value is `large`                                                                                                                            | _string_            | -       |
| value                   | current input value                                                                                                                                             | _string \| number_  | -       |
| type                    | can be set to any native type, such as `number` `idcard` `textarea` `digit`                                                                                     | _string_            | `text`  |
| fixed                   | If the type is `textarea` and it is in a `position:fixed` area, it needs to display the specified attribute fixed as true                                       | _boolean_           | `false` |
| focus                   | get focus                                                                                                                                                       | _boolean_           | `false` |
| border                  | Whether to show the inner border                                                                                                                                | _boolean_           | `true`  |
| disabled                | Whether to disable the input box                                                                                                                                | _boolean_           | `false` |
| readonly                | read only                                                                                                                                                       | _boolean_           | `false` |
| clearable               | whether clear control is enabled                                                                                                                                | _boolean_           | `false` |
| clickable               | Whether to enable click feedback                                                                                                                                | _boolean_           | `false` |
| required                | Whether to show form required asterisks                                                                                                                         | _boolean_           | `false` |
| center                  | Whether to vertically center the content                                                                                                                        | _boolean_           | `false` |
| password                | Whether it is a password type                                                                                                                                   | _boolean_           | `false` |
| title-width             | title width                                                                                                                                                     | _string_            | `6.2em` |
| maxlength               | The maximum input length, when set to -1, there is no limit to the maximum length                                                                               | _number_            | `-1`    |
| placeholder             | placeholder when the input box is empty                                                                                                                         | _string_            | -       |
| placeholder-style       | specify the style of placeholder                                                                                                                                | _string_            | -       |
| custom-style            | custom style                                                                                                                                                    | _string_            | -       |
| is-link                 | Whether to show the right arrow and enable click feedback                                                                                                       | _boolean_           | `false` |
| arrow-direction         | Arrow direction, optional values are `left` `up` `down`                                                                                                         | _string_            | -       |
| show-word-limit         | Whether to display word count, you need to set the `maxlength` attribute                                                                                        | _boolean_           | `false` |
| error                   | Whether to mark the input content in red                                                                                                                        | _boolean_           | `false` |
| error-message           | Bottom error message text, not displayed when empty                                                                                                             | _string_            | `''`    |
| error-message-align     | The alignment of the error message at the bottom, optional values are `center` `right`                                                                          | _string_            | `''`    |
| input-align             | Alignment of input box content, optional values are `center` `right`                                                                                            | _string_            | `left`  |
| autosize                | Whether to adapt the height of the content, only valid for textarea, <br> can pass in objects, such as { maxHeight: 100, minHeight: 50 }, <br> the unit is `px` | _boolean \| object_ | `false` |
| left-icon               | left icon name or image link, optional values see [Icon Component](#/icon)                                                                                      | _string_            | -       |
| right-icon              | Right icon name or image link, see [Icon Component](#/icon) for optional values                                                                                 | _string_            | -       |
| confirm-type            | Set the text of the button at the bottom right corner of the keyboard, only valid when type='text'                                                              | _string_            | `done`  |
| confirm-hold            | Whether to keep the keyboard closed when the button at the bottom right corner of the keyboard is clicked, invalid when type='textarea'                         | _boolean_           | `false` |
| hold-keyboard           | When in focus, the keyboard will not be put away when the page is clicked                                                                                       | _boolean_           | `false` |
| cursor-spacing          | The distance between the bottom of the input box and the keyboard when it is focused                                                                            | _number_            | `50`    |
| adjust-position         | Whether to automatically push up the page when the keyboard pops up                                                                                             | _boolean_           | `true`  |
| show-confirm-bar        | Whether to show the bar with the "Done" button above the keyboard, only valid for textarea                                                                      | _boolean_           | `true`  |
| selection-start         | The starting position of the cursor, valid when auto-gathering, must be used together with selection-end                                                        | _number_            | `-1`    |
| selection-end           | The end position of the cursor, valid when auto-gathering, must be used together with selection-start                                                           | _number_            | `-1`    |
| auto-focus              | autofocus, pull up the keyboard                                                                                                                                 | _boolean_           | `false` |
| disable-default-padding | Whether to remove the default padding under iOS, only valid for textarea                                                                                        | _boolean_           | `true`  |
| cursor                  | Cursor position when focus is specified                                                                                                                         | _number_            | `-1`    |
| clear-trigger           | When to display the clear icon, `always` means display when the input box is not empty, <br>`focus` means display when the input box is focused and not empty   | _string_            | `focus` |
| always-embed            | Force the input to be in the same layer state, and the input will switch to a non-same layer state when it is in focus by default (only valid under iOS)        | _boolean_           | `false` |

### Events

| Event                 | Description                                                                   | Callback Parameters                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| @input                | Triggered when something is entered                                           | event.detail: current input value                                                                                                 |
| @change               | triggered when something is entered                                           | event.detail: current input value                                                                                                 |
| @confirm              | Triggered when the Done button is clicked                                     | event.detail: The current input value                                                                                             |
| @click-icon           | Triggered when the tail icon is clicked                                       | -                                                                                                                                 |
| @focus                | Triggered when the input box is focused                                       | event.detail.value: current input value; <br>event.detail.height: keyboard height                                                 |
| @blur                 | Triggered when the input box loses focus                                      | event.detail.value: current input value; <br>event.detail.cursor: cursor position (if `type` is not `textarea`, the value is `0`) |
| @clear                | Triggered when the control is clicked to clear                                | -                                                                                                                                 |
| @click-input          | Triggered when the input field is clicked                                     | -                                                                                                                                 |
| @linechange           | Called when the line number of the input box changes, only valid for textarea | event.detail = { height: 0, heightRpx: 0, lineCount: 0 }                                                                          |
| @keyboardheightchange | This event is triggered when the keyboard height changes                      | event.detail = { height: height, duration: duration }                                                                             |

### Slot

| Name       | Description                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| label      | Customize the label of the input box, if the `label` property is set, it will not take effect               |
| left-icon  | custom input box header icon                                                                                |
| right-icon | custom input box tail icon                                                                                  |
| button     | custom input box tail button                                                                                |
| input      | Custom input box, after using this slot, the properties and events related to the input box will be invalid |

### External style classes

| class name       | description            |
| ---------------- | ---------------------- |
| label-class      | left text style class  |
| input-class      | input box style class  |
| right-icon-class | right icon style class |

## Theme customization

<theme-config type="field"/>