---
url : pages/press/dialog/dialog
---

## Dialog 

The pop-up modal box is often used for message prompts, message confirmation, or to complete specific interactive operations in the current page, and supports function calls and component calls.


## Code Demo

### notification

Used to prompt some messages, only contains a confirmation button.

```html
<press-dialog id="press-dialog" />
```

```javascript
import { showDialog } from 'press-ui/press-dialog/handler';

showDialog({
   title: 'Title',
   message: 'Pop-up window content',
}).then(() => {
   // on close
});

showDialog({
   message: 'Pop-up window content',
}).then(() => {
   // on close
});
```

### Message Confirmation

Used for confirmation messages, containing cancel and confirm buttons.

```html
<press-dialog id="press-dialog" />
```

```javascript
import { showConfirmDialog } from 'press-ui/press-dialog/handler';

showConfirmDialog({
   title: 'Title',
   message: 'Pop-up window content',
})
   .then(() => {
     // on confirm
   })
   .catch(() => {
     // on cancel
   });
```

### Rounded button style

Set the theme option to `round-button` to display rounded button style popups.

```html
<press-dialog id="press-dialog" />
```

```javascript
import { showDialog } from 'press-ui/press-dialog/handler';

showDialog({
   title: 'Title',
   message: 'Pop-up window content',
   theme: 'round-button',
}).then(() => {
   // on close
});

showDialog({
   message: 'Pop-up window content',
   theme: 'round-button',
}).then(() => {
   // on close
});
```

### Asynchronous shutdown

Through the `beforeClose` attribute, a callback function can be passed in to perform specific operations before the popup window is closed.

```html
<press-dialog id="press-dialog" />
```

```javascript
import { showConfirmDialog } from 'press-ui/press-dialog/handler';

const beforeClose = (action) => new Promise((resolve) => {
   setTimeout(() => {
     if (action === 'confirm') {
       resolve(true);
     } else {
       // intercept cancel operation
       resolve(false);
     }
   }, 1000);
});

showConfirmDialog({
   title: 'Title',
   message: 'popup content'
   beforeClose
});
```

### Component call

If you need to embed components or other custom content in the pop-up window, you can use the component call method.

```html
<press-dialog
   use-slot
   title="title"
   :show="show"
   show-cancel-button
   confirm-button-open-type="getUserInfo"
   @close="onClose"
   @getuserinfo="getUserInfo"
>
   <img src="https://img.yzcdn.cn/1.jpg" />
</press-dialog>
```

```js
export default {
   data() {
     return {
       show: true,
     }
   },
   methods: {
     getUserInfo(detail) {
       console. log(detail);
     },

     onClose() {
       this. show = false;
     },
   }
};
```

## API

### method

| method name                                           | parameters | return value | description                                                 |
| ----------------------------------------------------- | ---------- | ------------ | ----------------------------------------------------------- |
| showDialog, Dialog, Dialog.alert                      | `options`  | `Promise`    | Show message alert popup                                    |
| showConfirmDialog, Dialog.confirm                     | `options`  | `Promise`    | Show message confirmation popup                             |
| setDialogDefaultOptions, Dialog.setDefaultOptions     | `options`  | `void`       | Modify the default configuration, effective for all Dialogs |
| resetDialogDefaultOptions, Dialog.resetDefaultOptions | -          | `void`       | Reset the default configuration, effective for all Dialogs  |
| closeDialog, Dialog.close                             | -          | `void`       | close the popup                                             |
| stopDialogLoading, Dialog.stopLoading                 | -          | `void`       | The loading state of the stop button                        |

### Options

When calling `Dialog` through a function, the following options are supported:

| Parameter             | Description                                                                                                                                                                                          | Type                                        | Default          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------- |
| title                 | title                                                                                                                                                                                                | _string_                                    | -                |
| width                 | popup window width, the default unit is `px`                                                                                                                                                         | _string \| number_                          | `320px`          |
| message               | text content, support newline via `\n`                                                                                                                                                               | _string_                                    | -                |
| messageAlign          | content alignment, optional values are `left` `right`                                                                                                                                                | _string_                                    | `center`         |
| theme                 | style, optional value is `round-button`                                                                                                                                                              | _string_                                    | `default`        |
| zIndex                | z-index level                                                                                                                                                                                        | _number_                                    | `100`            |
| className             | Custom class name, invalid when dialog is inside a custom component                                                                                                                                  | _string_                                    | ''               |
| customStyle           | custom style                                                                                                                                                                                         | _string_                                    | ''               |
| selector              | fromDefine selector                                                                                                                                                                                  | _string_                                    | `press-dialog`   |
| showConfirmButton     | Whether to show the confirm button                                                                                                                                                                   | _boolean_                                   | `true`           |
| showCancelButton      | whether to show cancel button                                                                                                                                                                        | _boolean_                                   | `false`          |
| confirmButtonText     | Text of the confirm button                                                                                                                                                                           | _string_                                    | `Confirm`        |
| cancelButtonText      | Text of the cancel button                                                                                                                                                                            | _string_                                    | `Cancel`         |
| overlay               | Whether to show the overlay                                                                                                                                                                          | _boolean_                                   | `true`           |
| overlayStyle          | custom overlay style                                                                                                                                                                                 | _object_                                    | -                |
| closeOnClickOverlay   | Whether to close the popup when the overlay is clicked                                                                                                                                               | _boolean_                                   | `false`          |
| asyncClose            | Deprecated, will be removed in 2.0.0, please use `beforeClose` attribute instead                                                                                                                     | _boolean_                                   | `false`          |
| beforeClose           | callback function before closing, return `false` to prevent closing, support returning Promise                                                                                                       | _(action) => boolean \| Promise\<boolean\>_ | -                |
| context               | the selection range of the selector, you can pass in the this of the custom component as the context                                                                                                 | _object_                                    | the current page |
| transition            | animation name, optional value is `fade` `none`                                                                                                                                                      | _string_                                    | `scale`          |
| confirmButtonOpenType | The WeChat open capability of the confirmation button, for specific support, please refer to [WeChat Official Documentation](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | _string_                                    | -                |

### OpenType Options

After using `confirmButtonOpenType`, the following options are supported:

| parameter        | description                                                                                                            | type     | default              | open-type     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | -------------------- | ------------- |
| appParameter     | Parameter passed to APP when opening APP                                                                               | _string_ | -                    | `launchApp`   |
| lang             | Specifies the language to return user information, zh_CN Simplified Chinese, <br>zh_TW Traditional Chinese, en English | _string_ | `en`                 | `getUserInfo` |
| sessionFrom      | session origin                                                                                                         | _string_ | -                    | `contact`     |
| businessId       | customer service message sub-merchant id                                                                               | _number_ | -                    | `contact`     |
| sendMessageTitle | In-conversation message card title                                                                                     | _string_ | current title        | `contact`     |
| sendMessagePath  | In-conversation message card click to jump to the applet path                                                          | _string_ | Current sharing path | `contact`     |
| sendMessageImg   | sendMessageImg                                                                                                         | _string_ | screenshot           | `contact`     |
| showMessageCard  | Show in-conversation message card                                                                                      | _string_ | `false`              | `contact`     |

### Props

When calling `Dialog` through components, the following props are supported:

| Parameter                | Description                                                                                                                                                                                      | Type                                        | Default   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | --------- |
| show                     | Whether to show the pop-up window                                                                                                                                                                | _boolean_                                   | -         |
| title                    | title                                                                                                                                                                                            | _string_                                    | -         |
| width                    | popup window width, the default unit is `px`                                                                                                                                                     | _string \| number_                          | `320px`   |
| message                  | text content, support newline via `\n`                                                                                                                                                           | _string_                                    | -         |
| theme                    | style, optional value is `round-button`                                                                                                                                                          | _string_                                    | `default` |
| message-align            | content alignment, optional values are `left` `right`                                                                                                                                            | _string_                                    | `center`  |
| z-index                  | z-index level                                                                                                                                                                                    | _number_                                    | `100`     |
| class-name               | Custom class name, invalid when dialog is inside a custom component                                                                                                                              | _string_                                    | ''        |
| custom-style             | custom style                                                                                                                                                                                     | _string_                                    | ''        |
| show-confirm-button      | Whether to show the confirm button                                                                                                                                                               | _boolean_                                   | `true`    |
| show-cancel-button       | Whether to show the cancel button                                                                                                                                                                | _boolean_                                   | `false`   |
| confirm-button-text      | Text of the confirm button                                                                                                                                                                       | _string_                                    | `Confirm` |
| cancel-button-text       | text of cancel button                                                                                                                                                                            | _string_                                    | `cancel`  |
| confirm-button-color     | font color of confirm button                                                                                                                                                                     | _string_                                    | `#ee0a24` |
| cancel-button-color      | font color of cancel button                                                                                                                                                                      | _string_                                    | `#333`    |
| overlay                  | Whether to show the overlay                                                                                                                                                                      | _boolean_                                   | `true`    |
| overlay-style `v1.0.0`   | custom overlay style                                                                                                                                                                             | _object_                                    | -         |
| close-on-click-overlay   | Whether to close the popup when the overlay is clicked                                                                                                                                           | _boolean_                                   | `false`   |
| use-slot                 | Whether to use custom content slot                                                                                                                                                               | _boolean_                                   | `false`   |
| use-title-slot           | Whether to use custom title slot                                                                                                                                                                 | _boolean_                                   | `false`   |
| async-close              | Deprecated, will be removed in 2.0.0, please use `beforeClose` attribute instead                                                                                                                 | _boolean_                                   | `false`   |
| before-close             | callback function before close, return `false` to prevent close, support return Promise                                                                                                          | _(action) => boolean \| Promise\<boolean\>_ | -         |
| transition               | animation name, optional value is `fade`                                                                                                                                                         | _string_                                    | `scale`   |
| confirm-button-open-type | The WeChat open capability of the confirmation button, for specific support, please refer to [WeChat official documents](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | _string_                                    | -         |

### OpenType Props

After using `confirm-button-open-type`, the following props are supported:

| parameter | description | type | default | open-type |
| --------- | ----------- | ---- | ------- | --------- ||  |
| app-parameter      | Parameter passed to APP when opening APP                                                                               | _string_ | -                    | `launchApp`   |
| lang               | Specifies the language to return user information, zh_CN Simplified Chinese, <br>zh_TW Traditional Chinese, en English | _string_ | `en`                 | `getUserInfo` |
| session-from       | session-from                                                                                                           | _string_ | -                    | `contact`     |
| business-id        | Customer service message sub-merchant id                                                                               | _number_ | -                    | `contact`     |
| send-message-title | In-conversation message card title                                                                                     | _string_ | Current title        | `contact`     |
| send-message-path  | In-conversation message card click to jump to the applet path                                                          | _string_ | Current sharing path | `contact`     |
| send-message-img   | sendMessageImg                                                                                                         | _string_ | screenshot           | `contact`     |
| show-message-card  | Show in-conversation message card                                                                                      | _string_ | `false`              | `contact`     |

### Events

| Event           | Description                                                                                                                                                              | Callback Parameters                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| @close          | Triggered when the pop-up window is closed                                                                                                                               | event.detail: The source that triggers the close event, <br>enumerated as `confirm`, `cancel`, `overlay` |
| @confirm        | Fired when the confirm button is clicked                                                                                                                                 | -                                                                                                        |
| @cancel         | Fired when cancel button is clicked                                                                                                                                      | -                                                                                                        |
| @getuserinfo    | When the confirm button is clicked, the obtained user information will be returned,<br>The value obtained from the return parameter detail is the same as wx.getUserInfo | -                                                                                                        |
| @contact        | Customer service message callback                                                                                                                                        | -                                                                                                        |
| @getphonenumber | Callback to get the user's phone number                                                                                                                                  | -                                                                                                        |
| @error          | An error callback occurred when using open capabilities                                                                                                                  | -                                                                                                        |
| @opensetting    | Callback after opening the authorization setting page                                                                                                                    | -                                                                                                        |

### Slot

| Name  | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| title | Custom `title` display content, if the `title` attribute is set, it will not take effect |
