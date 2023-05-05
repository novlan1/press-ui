---
url : pages/press/action-sheet/action-sheet
---

## ActionSheet

The modal panel that pops up at the bottom contains multiple options related to the current situation.

## Usage

### Basic usage

An array of `actions` needs to be passed in. Each item in the array is an object, and the properties of the object are shown in the table below the document.

```html
<press-action-sheet
   :show="show"
   :actions="actions"
   @close="onClose"
   @select="onSelect"
/>
```

```javascript
export default {
   data() {
     return {
       show: false,
       actions: [
         {
           name: 'Options',
         },
         {
           name: 'Options',
         },
         {
           name: 'Options',
           subname: 'Description information',
           openType: 'share',
         },
       ],
     }
   },
   methods: {
     onClose() {
       this.setData({ show: false });
     },

     onSelect(event) {
       console.log(event.detail);
     },
   }
};
```

### Show cancel button

After setting the `cancel-text` property, a cancel button will be displayed at the bottom, and the current menu will be closed after clicking.

```html
<press-action-sheet
   :show="show"
   :actions="actions"
   cancel-text="cancel"
/>
```

### Display description information

After setting the `description` attribute, a description will be displayed above the option.

```html
<press-action-sheet
   :show="show"
   :actions="actions"
   description="This is a description"
/>
```

### Option Status

Options can be set to a loaded state or a disabled state.

```html
<press-action-sheet
   :show="show"
   :actions="actions"
   cancel-text="cancel"
/>
```

```javascript
export default {
   data() {
     return {
       show: false,
       actions: [
         { name: 'coloring options', color: '#ee0a24' },
         { loading: true },
         { name: 'Disable option', disabled: true },
       ],
     }
   },
});
```

### Custom panel

Display the title bar by setting the `title` property, and you can use the slot to customize the menu content.

```html
<press-action-sheet :show="show" title="title">
   <view>content</view>
</press-action-sheet>
```

### WeChat Open Capability

An array of `actions` needs to be passed in. Each item in the array is an object, and the properties of the object are shown in the table below the document.

```html
<press-action-sheet
   :show="show"
   :actions="actions"
   @close="onClose"
   @getuserinfo="onGetUserInfo"
/>
```

```javascript
export default {
   data() {
     return {
       show: false,
       actions: [
         { name: 'Get user information', color: '#07c160', openType: 'getUserInfo' },
       ],
     }
   },
   methods: {
     onClose() {
       this.setData({ show: false });
     },

     onGetUserInfo(e) {
       console.log(e.detail);
     },
   }
};
```

## API

### Props

| Parameter              | Description                                         | Type      | Default |
| ---------------------- | --------------------------------------------------- | --------- | ------- |
| show                   | Whether to show the action panel                    | _boolean_ | -       |
| actions                | menu options                                        | _Array_   | `[]`    |
| title                  | title                                               | _string_  | -       |
| description `v1.0.0`   | description above the option                        | _string_  | -       |
| z-index                | z-index level                                       | _number_  | `100`   |
| cancel-text            | cancel button text                                  | _string_  | -       |
| overlay                | whether to show the overlay                         | _boolean_ | -       |
| round `v1.0.0`         | Whether to show rounded corners                     | _boolean_ | `true`  |
| close-on-click-action  | Whether to close the option after clicking          | _boolean_ | `true`  |
| close-on-click-overlay | Whether to close the menu when clicking the overlay | _boolean_ | -       |
| safe-area-inset-bottom | Whether to set a bottom safety distance for iPhoneX | _boolean_ | `true`  |

### Events

| Event Name     | Description                                                                                                                                                                                                                                      | Parameters                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| select         | Triggered when the option is selected, not triggered when it is disabled or loaded                                                                                                                                                               | event.detail: the object corresponding to the option |
| close          | fires when close                                                                                                                                                                                                                                 | -                                                    |
| cancel         | fires when the cancel button is clicked                                                                                                                                                                                                          | -                                                    |
| click-overlay  | Triggered when the overlay is clicked                                                                                                                                                                                                            | -                                                    |
| getuserinfo    | When the user clicks the button, the obtained user information will be returned, and the detail data of the callback is consistent with that returned by wx.getUserInfo, <a href="#/action-sheet#actions">openType</a>=" valid when getUserInfo" | -                                                    |
| contact        | Customer service message callback, valid when <a href="#/action-sheet#actions">openType</a>="contact"                                                                                                                                            | -                                                    |
| getphonenumber | Callback to get the user's phone number, valid when <a href="#/action-sheet#actions">openType</a>="getPhoneNumber"                                                                                                                               | -                                                    |
| error          | When the open capability is used, an error callback occurs, valid when <a href="#/action-sheet#actions">openType</a>="launchApp"                                                                                                                 | -                                                    |
| launchapp      | The callback for successfully opening the APP, valid when <a href="#/action-sheet#actions">openType</a>="launchApp"                                                                                                                              | -                                                    |
| opensetting    | Callback after opening the authorization setting page, valid when <a href="#/action-sheet#actions">openType</a>="openSetting"                                                                                                                    | -                                                    |


### actions

`actions` in `API` is an array of objects, each object in the array configures each column, and each column has the following `key`:

| key name         | description                                                                                                                                                                                                                                                                                                             | type      | default value        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------- |
| name             | title                                                                                                                                                                                                                                                                                                                   | _string_  | -                    |
| subname          | subtitle                                                                                                                                                                                                                                                                                                                | _string_  | -                    |
| color            | option text color                                                                                                                                                                                                                                                                                                       | _string_  | -                    |
| loading          | Whether it is loading state                                                                                                                                                                                                                                                                                             | _boolean_ | -                    |
| disabled         | Whether it is disabled or not                                                                                                                                                                                                                                                                                           | _boolean_ | -                    |
| className        | add extra class class name for the corresponding column                                                                                                                                                                                                                                                                 | _string_  | -                    |
| openType         | WeChat open capability, for specific support, please refer to [WeChat official document](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)                                                                                                                                                        | _string_  | -                    |
| lang             | Specifies the language for returning user information, zh_CN for Simplified Chinese, zh_TW for Traditional Chinese, en for English                                                                                                                                                                                      | _string_  | `en`                 |
| sessionFrom      | session source, valid when openType="contact"                                                                                                                                                                                                                                                                           | _string_  | -                    |
| sendMessageTitle | In-conversation message card title, valid when openType="contact"                                                                                                                                                                                                                                                       | _string_  | current title        |
| sendMessagePath  | Click on the message card in the session to jump to the applet path, valid when openType="contact"                                                                                                                                                                                                                      | _string_  | Current sharing path |
| sendMessageImg   | In-conversation message card image, valid when openType="contact"                                                                                                                                                                                                                                                       | _string_  | Screenshot           |
| showMessageCard  | Whether to display the message card in the session, set this parameter to true, the user enters the customer service session and the "Mini Program to be sent" prompt will be displayed in the lower right corner, and the user can quickly send the Mini Program message after clicking, openType="contact" Valid when | _string_  | `false`              |
| appParameter     | When opening the APP, the parameters passed to the APP, valid when openType=launchApp                                                                                                                                                                                                                                   | _string_  | -                    |


## Theme customization

<theme-config />