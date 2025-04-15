---
url : pages/press/popup-plus/popup-plus
---

## PopupPlus 

The pop-up layer container is used to display pop-up windows, information prompts and other content, and supports multiple pop-up layers to be superimposed and displayed.

## Code Demo

### Basic usage

Use the `show` attribute to control whether the popup layer is displayed.

```html
<press-cell title="Show Popup" is-link @click="showPopup" />

<press-popup :show="show" @close="onClose">Content</press-popup>
```

```javascript
Page({
   data: {
     show: false,
   },

   showPopup() {
     this.setData({ show: true });
   },

   onClose() {
     this.setData({ show: false });
   },
});
```

### popup location

Set the pop-up position through the `position` property, which is centered by default, and can be set to `top`, `bottom`, `left`, `right`.

```html
<press-popup
   :show="show"
   position="top"
   custom-style="height: 20%;"
   @close="onClose"
/>
```

### close icon

After setting the `closeable` property, a close icon will be displayed in the upper right corner of the popup layer, and the icon can be customized through the `close-icon` property, and the position of the icon can be customized by using the `close-icon-position` property.

```html
<press-popup
   :show="show"
   closeable
   position="bottom"
   custom-style="height: 20%"
   @close="onClose"
/>

<!-- custom icon -->
<press-popup
   :show="show"
   closeable
   close-icon="close"
   position="bottom"
   custom-style="height: 20%"
   @close="onClose"
/>

<!-- icon location -->
<press-popup
   :show="show"
   closeable
   close-icon-position="top-left"
   position="bottom"
   custom-style="height: 20%"
   @close="onClose"
/>
```

### Rounded pop-up window

After setting the `round` property, the pop-up window will add different rounded corner styles according to the pop-up position.

```html
<press-popup
   :show="show"
   round
   position="bottom"
   custom-style="height: 20%"
   @close="onClose"
/>
```

### Disable scrolling through

When using components, you will find that when the content part scrolls to the bottom, continuing to swipe will cause the underlying page to scroll, which is scroll penetration.

Currently, components can handle partial scroll penetration through the `lock-scroll` prop. **However, due to the applet itself, there will still be scrolling penetration in the content area of the pop-up window. ** However, we provide a recommended solution for developers to completely solve scroll penetration:

#### [page-meta](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html)

When the minimum version of the Mini Program base library is above 2.9.0, you can use the [page-meta](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html) component to dynamically modify page style

```html
<!-- page-meta can only be the first node in the page -->
<page-meta :page-style="show ? 'overflow: hidden;' : ''" />

<press-popup :show="show" catch:touchstart />
```

## API

### Props

| Parameter              | Description                                                       | Type               | Default  |
| ---------------------- | ----------------------------------------------------------------- | ------------------ | -------- |
| show                   | Whether to show the popup layer                                   | _boolean_          | `false`  |
| z-index                | z-index level                                                     | _number_           | `100`    |
| overlay                | Whether to show the overlay                                       | _boolean_          | `true`   |
| position               | Popup position, optional values are `top` `bottom` `right` `left` | _string_           | `center` |
| duration               | animation duration in milliseconds                                | _number \| object_ | `300`    |
| round                  | Whether to show rounded corners                                   | _boolean_          | `false`  |
| custom-style           | custom popup layer style                                          | _string_           | `''`     |
| overlay-style          | custom overlay style                                              | _string_           | `''`     |
| close-on-click-overlay | Whether to close the overlay on click                             | _boolean_          | `true`   |
| closeable              | Whether to show the close icon                                    | _boolean_          | `false`  |
| close-icon             | close icon name or image link                                     | _string_           | `cross`  |
| safe-area-inset-bottom | Whether to set a bottom safety distance for iPhoneX               | _boolean_          | `true`   |
| safe-area-inset-top    | Whether to leave a top safe distance (status bar height)          | _boolean_          | `false`  |
| lock-scroll            | Whether to lock background scrolling                              | _boolean_          | `true`   |

### Events

| Event Name    | Description                              | Parameters |
| ------------- | ---------------------------------------- | ---------- |
| close         | Triggered when the popup layer is closed | -          |
| click-overlay | Triggered when the overlay is clicked    | -          |
| before-enter  | trigger before entering                  | -          |
| enter         | Entering trigger                         | -          |
| after-enter   | Triggered after entering                 | -          |
| before-leave  | Fires before leaving                     | -          |
| leave         | fires while leaving                      | -          |
| after-leave   | fires after leaving                      | -          |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |