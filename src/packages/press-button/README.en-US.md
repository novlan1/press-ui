---
url : pages/press/button/button
---

## Button

Buttons are used to trigger an action, such as submitting a form.

## Usage

### Button Type

Five types are supported: `default`, `primary`, `info`, `warning`, and `danger`, and the default is `default`.

```html
<press-button type="default">default button</press-button>
<press-button type="primary">Primary button</press-button>
<press-button type="info">Information button</press-button>
<press-button type="warning">Warning button</press-button>
<press-button type="danger">Danger button</press-button>
```

### plain button

Set the button as a plain button through the `plain` attribute, the text of the plain button is the button color, and the background is white.

```html
<press-button plain type="primary">plain button</press-button>
<press-button plain type="info">plain button</press-button>
```

### thin border

Setting the `hairline` property can enable a 0.5px border, based on a pseudo-class.

```html
<press-button plain hairline type="primary">thin border button</press-button>
<press-button plain hairline type="info">thin border button</press-button>
```

### Disabled state

The button is disabled through the `disabled` attribute, and the `click` event of the button will not be triggered at this time.

```html
<press-button disabled type="primary">Disabled state</press-button>
<press-button disabled type="info">Disabled state</press-button>
```

### Loading Status

```html
<press-button loading type="primary" />
<press-button loading type="primary" loading-type="spinner" />
<press-button loading type="info" loading-text="Loading..." />
```

### Button shape

```html
<press-button square type="primary">square button</press-button>
<press-button round type="info">round button</press-button>
```

### icon button

Set the button icon through the `icon` property, which supports all icons in the Icon component, and can also pass in the icon URL.

```html
<press-button icon="star-o" type="primary" />
<press-button icon="star-o" type="primary">button</press-button>
<press-button icon="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar.png" type="info">
   button
</press-button>
```

### Button Size

Support `large`, `normal`, `small`, `mini` four sizes, the default is `normal`.

```html
<press-button type="primary" size="large">Large button</press-button>
<press-button type="primary" size="normal">Normal button</press-button>
<press-button type="primary" size="small">Small button</press-button>
<press-button type="primary" size="mini">Mini button</press-button>
```

### Block level elements

The element type of the button can be set as a block-level element through the `block` attribute.

```html
<press-button type="primary" block>block-level elements</press-button>
```

### Custom Colors

The color of the button can be customized through the `color` property.

```html
<press-button color="#7232dd">Monochrome button</press-button>
<press-button color="#7232dd" plain>Monochrome button</press-button>
<press-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
   gradient button
</press-button>
```

### E-SPORT

The `type` field has been expanded, which can be the following types.

```html
<press-button type="e-sport-primary">primary</press-button>
<press-button type="e-sport-primary-bg">primary-bg</press-button>
<press-button type="e-sport-primary-bg-lg">primary-bg-lg</press-button>
<press-button type="e-sport-primary-bg-xl">primary-bg-xl</press-button>
<press-button type="e-sport-secondary">secondary</press-button>
<press-button type="e-sport-border">border</press-button>
```


### E-SPORT-DISABLE


Add `disabled` to the button of `E-SPORT` type, which is the disabled state.

```html
<press-button disabled type="e-sport-primary">primary</press-button>
<press-button disabled type="e-sport-primary-bg">primary-bg</press-button>
<press-button disabled type="e-sport-primary-bg-lg">primary-bg-lg</press-button>
<press-button disabled type="e-sport-primary-bg-xl">primary-bg-xl</press-button>
<press-button disabled type="e-sport-secondary">secondary</press-button>
<press-button disabled type="e-sport-border">border</press-button>
```

### E-SPORT-LOADING


Adding `loading` to the `E-SPORT` type button means the loading state.

```html
<press-button loading type="e-sport-primary">primary</press-button>
<press-button loading type="e-sport-primary-bg">primary-bg</press-button>
<press-button loading type="e-sport-primary-bg-lg">primary-bg-lg</press-button>
<press-button loading type="e-sport-primary-bg-xl">primary-bg-xl</press-button>
<press-button loading type="e-sport-secondary">secondary</press-button>
<press-button loading type="e-sport-border">border</press-button>
```





## API

### Props

| Parameter          | Description                                                                                                                                                                                                | Type      | Default              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------- |
| id                 | identifier                                                                                                                                                                                                 | _string_  | -                    |
| type               | button type, optional values are `primary` `info` `warning` `danger` <br> and `e-sport-primary` `e-sport-primary-bg` `e-sport-primary-bg -lg` `e-sport-primary-bg-xl` `e-sport-secondary` `e-sport-border` | _string_  | `default`            |
| size               | button size, optional values are `normal` `large` `small` `mini`                                                                                                                                           | _string_  | `normal`             |
| color `v1.0.0`     | button color, support `linear-gradient` gradient color                                                                                                                                                     | _string_  | -                    |
| icon               | Left icon name or image link, optional values see [Icon component](#/icon)                                                                                                                                 | _string_  | -                    |
| class-prefix       | Icon class name prefix, same as [class-prefix attribute](#/icon) of Icon component                                                                                                                         | _string_  | `press-icon`         |
| plain              | Whether it is a plain button                                                                                                                                                                               | _boolean_ | `false`              |
| block              | Whether it is a block level element                                                                                                                                                                        | _boolean_ | `false`              |
| round              | Whether it is a round button                                                                                                                                                                               | _boolean_ | `false`              |
| square             | whether it is a square button                                                                                                                                                                              | _boolean_ | `false`              |
| disabled           | Whether to disable the button                                                                                                                                                                              | _boolean_ | `false`              |
| hairline           | Whether to use 0.5px border                                                                                                                                                                                | _boolean_ | `false`              |
| loading            | Whether to display loading status                                                                                                                                                                          | _boolean_ | `false`              |
| loading-text       | loading status prompt text                                                                                                                                                                                 | _string_  | -                    |
| loading-type       | loading status icon type, optional value is `spinner`                                                                                                                                                      | _string_  | `circular`           |
| loading-size       | loading icon size                                                                                                                                                                                          | _string_  | `20px`               |
| custom-style       | custom style                                                                                                                                                                                               | _string_  | -                    |
| open-type          | WeChat open capability, for specific support, please refer to [WeChat official document](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)                                           | _string_  | -                    |
| app-parameter      | When opening the APP, the parameter passed to the APP                                                                                                                                                      | _string_  | -                    |
| lang               | Specifies the language to return user information, zh_CN Simplified Chinese, <br>zh_TW Traditional Chinese, en English                                                                                     | _string_  | `en`                 |
| session-from       | session-from                                                                                                                                                                                               | _string_  | -                    |
| business-id        | customer service message sub-merchant id                                                                                                                                                                   | _number_  | -                    |
| send-message-title | In-conversation message card title                                                                                                                                                                         | _string_  | Current title        |
| send-message-path  | In-conversation message card click to jump to the applet path                                                                                                                                              | _string_  | Current sharing path |
| send-message-img   | sendMessageImg                                                                                                                                                                                             | _string_  | screenshot           |
| show-message-card  | Show in-session message card                                                                                                                                                                               | _string_  | `false`              |
| dataset            | button dataset, when the open-type is `share`, you can see the incoming value in `event.target.dataset.detail` of the onShareAppMessage event                                                              | _any_     | -                    |
| form-type          | used for form components, optional values are `submit` `reset`, clicking will trigger the submit/reset event of the form component respectively                                                            | _string_  | -                    |


### Events

| Event Name     | Description                                                                                                                                                          | Parameters |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| click          | Triggered when the button is clicked and the button state is not loaded or disabled                                                                                  | -          |
| getuserinfo    | When the user clicks this button, it will return the obtained user information,<br>The value obtained from the return parameter detail is the same as wx.getUserInfo | -          |
| contact        | Customer service message callback                                                                                                                                    | -          |
| getphonenumber | Callback to get the user's phone number                                                                                                                              | -          |
| error          | An error callback occurred when using an open capability                                                                                                             | -          |
| opensetting    | callback after opening the authorization setting page                                                                                                                | -          |
| chooseavatar   | When the value of open-type is chooseAvatar, the callback after choosing the avatar                                                                                  |

> Button provides a click event instead of a native tap event. When the button is disabled, the click event will not be triggered, but the tap event will still be triggered.



### External style classes

| class name    | description              |
| ------------- | ------------------------ |
| custom-class  | root node style class    |
| loading-class | loading icon style class |


## Theme customization

<theme-config />

