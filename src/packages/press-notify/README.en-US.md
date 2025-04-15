---
url : pages/press/notify/notify
---

## Notify

A message prompt is displayed at the top of the page, and two methods of function call and component call are supported.

## Code Demo

### Basic usage

```js
import { showNotify } from 'press-ui/press-notify';

showNotify('notification content');
```

```html
<!-- Add the corresponding node in the page -->
<press-notify id="press-notify" />
```

### Notification Type

Support `primary`, `success`, `warning`, `danger` four notification types, the default is `danger`.

```js
// main notification
showNotify({ type: 'primary', message: 'notification content' });

// success notification
showNotify({ type: 'success', message: 'Notification content' });

// hazard notification
showNotify({ type: 'danger', message: 'notification content' });

// warning notification
showNotify({ type: 'warning', message: 'notification content' });
```

### Custom Notifications

Customize the color and display duration of message notifications.

```js
showNotify({
   message: 'custom color',
   color: '#ad0000',
   background: '#ffe1e1',
});

showNotify({
   message: 'custom duration',
   duration: 1000,
});
```

### Custom selectors

```js
showNotify({
   message: 'Custom node selector',
   duration: 1000,
   selector: '#custom-selector',
});
```

```html
<!-- Add a custom node in the page -->
<press-notify id="custom-selector" />
```

## API

### method

| method name                                           | description        | parameters           | return value                                               |
| ----------------------------------------------------- | ------------------ | -------------------- | ---------------------------------------------------------- |
| showNotify, Notify                                    | Display prompt     | `options \| message` | notify instance                                            |
| closeNotify, Notify.clear                             | close notification | `options`            | `void`                                                     |
| setNotifyDefaultOptions, Notify.setDefaultOptions     | `options`          | `void`               | Modify the default configuration, effective for all Notify |
| resetNotifyDefaultOptions, Notify.resetDefaultOptions | -                  | `void`               | Reset the default configuration, effective for all Notify  |

### Options

| Parameter        | Description                                                                                          | Type       | Default          |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ---------------- |
| type             | type, optional values are `primary` `success` `warning`                                              | _string_   | `danger`         |
| message          | display copy, support newline via `\n`                                                               | _string_   | `''`             |
| duration         | display duration (ms), when the value is 0, the notify will not disappear                            | _number_   | `3000`           |
| selector         | custom node selector                                                                                 | _string_   | `press-notify`   |
| color            | font color                                                                                           | _string_   | `#fff`           |
| top              | top distance                                                                                         | _number_   | `0`              |
| background       | background color                                                                                     | _string_   | -                |
| context          | the selection range of the selector, you can pass in the this of the custom component as the context | _object_   | the current page |
| onClick          | Callback function when clicked                                                                       | _function_ | -                |
| onOpened         | callback function after full display                                                                 | _function_ | -                |
| onClose          | Callback function when closing                                                                       | _function_ | -                |
| safeAreaInsetTop | Whether to leave a top safe distance (status bar height)                                             | _boolean_  | `false`          |

## Theme customization

<theme-config />