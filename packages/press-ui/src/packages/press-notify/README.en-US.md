---
url : pages/press/notify/notify
---

## Notify

A message prompt is displayed at the top of the page, and two methods of function call and component call are supported.

## Code Demo

### Basic usage

```js
import Notify from 'press-ui/press-notify';

Notify('notification content');
```

```html
<!-- Add the corresponding node in the page -->
<press-notify id="press-notify" />
```

### Notification Type

Support `primary`, `success`, `warning`, `danger` four notification types, the default is `danger`.

```js
// main notification
Notify({ type: 'primary', message: 'notification content' });

// success notification
Notify({ type: 'success', message: 'Notification content' });

// hazard notification
Notify({ type: 'danger', message: 'notification content' });

// warning notification
Notify({ type: 'warning', message: 'notification content' });
```

### Custom Notifications

Customize the color and display duration of message notifications.

```js
Notify({
   message: 'custom color',
   color: '#ad0000',
   background: '#ffe1e1',
});

Notify({
   message: 'custom duration',
   duration: 1000,
});
```

### Custom selectors

```js
Notify({
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

| method name  | description        | parameters           | return value    |
| ------------ | ------------------ | -------------------- | --------------- |
| Notify       | Display prompt     | `options \| message` | notify instance |
| Notify.clear | close notification | `options`            | `void`          |

### Options

| Parameter        | Description                                                                                          | Type       | Default          |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ---------------- |
| type `v1.0.0`    | type, optional values are `primary` `success` `warning`                                              | _string_   | `danger`         |
| message `v1.0.0` | display copy, support newline via `\n`                                                               | _string_   | `''`             |
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