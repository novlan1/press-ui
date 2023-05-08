---
url : pages/press/toast/toast
---

## Toast 


A black translucent prompt pops up in the middle of the page, which is used in scenarios such as message notification, loading prompt, and operation result prompt.


## Code Demo

### Text Prompt

```javascript
import Toast from 'press-ui/press-toast/press-toast';

Toast('I am a prompt copywriter, it is recommended not to exceed fifteen characters~');
```

```html
<press-toast id="press-toast" />
```

### Loading Tips

Use the `Toast.loading` method to display the loading prompt, use the `forbidClick` attribute to disable the background click, and use the `loadingType` attribute to customize the loading icon type.

```javascript
Toast.loading({
   message: 'Loading...',
   forbidClick: true,
});

// custom loading icon
Toast.loading({
   message: 'Loading...',
   forbidClick: true,
   loadingType: 'spinner',
});
```

### Success/Failure Prompt

```javascript
Toast.success('successful copywriting');
Toast.fail('Failed copywriting');
```

### Dynamic update prompt

```javascript
const toast = Toast.loading({
   duration: 0, // keep displaying toast
   forbidClick: true,
   message: 'Countdown 3 seconds',
   selector: '#custom-selector',
});

let second = 3;
const timer = setInterval(() => {
   second--;
   if (second) {
     toast.setData({
       message: `Countdown ${second} seconds`,
     });
   } else {
     clearInterval(timer);
     Toast. clear();
   }
}, 1000);
```

```html
<press-toast id="custom-selector" />
```

### OnClose callback function

```javascript
Toast({
   type: 'success',
   message: 'Submitted successfully',
   onClose: () => {
     console.log('Execute OnClose function');
   },
});
```

## API

### method

| method name               | parameters           | return value   | description                                                |
| ------------------------- | -------------------- | -------------- | ---------------------------------------------------------- |
| Toast                     | `options \| message` | toast instance | display hint                                               |
| Toast.loading             | `options \| message` | toast instance | display loading prompt                                     |
| Toast.success             | `options \| message` | toast instance | display success prompt                                     |
| Toast.fail                | `options \| message` | toast instance | display failure prompt                                     |
| Toast.clear               | `clearAll`           | `void`         | close the prompt                                           |
| Toast.setDefaultOptions   | `options`            | `void`         | Modify the default configuration, effective for all Toasts |
| Toast.resetDefaultOptions | -                    | `void`         | Reset the default configuration, effective for all Toasts  |

### Options

| Parameter   | Description                                                                                          | Type       | Default          |
| ----------- | ---------------------------------------------------------------------------------------------------- | ---------- | ---------------- |
| type        | Prompt type, optional values are `loading` `success` `fail` `html`                                   | _string_   | `text`           |
| position    | position, optional values are `top` `middle` `bottom`                                                | _string_   | `middle`         |
| message     | content                                                                                              | _string_   | `''`             |
| mask        | Whether to display the mask layer                                                                    | _boolean_  | `false`          |
| forbidClick | Whether to forbid background clicks                                                                  | _boolean_  | `false`          |
| loadingType | loading icon type, optional value is `spinner`                                                       | _string_   | `circular`       |
| zIndex      | z-index level                                                                                        | _number_   | `1000`           |
| duration    | display duration (ms), when the value is 0, the toast will not disappear                             | _number_   | `2000`           |
| selector    | custom selector                                                                                      | _string_   | `press-toast`    |
| context     | the selection range of the selector, you can pass in the this of the custom component as the context | _object_   | the current page |
| onClose     | Callback function when closing                                                                       | _Function_ | -                |

### Slot

| Name | Description    |
| ---- | -------------- |
| -    | Custom Content |

## Theme customization

<theme-config />
