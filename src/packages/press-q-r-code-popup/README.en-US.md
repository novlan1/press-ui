---
url: pages/press/q-r-code-popup/q-r-code-popup
---

## QRCodePopup 


## Introduction

```ts
import PressQRCodePopup from 'press-ui/press-q-r-code-popup/press-q-r-code-popup';

export default {
   components: {
     PressQRCodePopup,
   }
}
```

## Code Demo

### Basic usage

```html
<PressQRCodePopup
   v-if="show"
   :qr-code-url="currentUrl"
   :type="type"
   @onCancel="show = false"
/>
```

```ts
export default {
   components: {
     PressQRCodePopup,
   },
   data() {
     let currentUrl = 'https://baidu.com';
     // #ifdef H5
     currentUrl = document.location.href;
     // #endif

     return {
       currentUrl,
       show: false,
       type: 1,
     };
   },
   methods: {
     showDialog() {
       this.show = true;
     },
   },
};
```

## API

### Props

| Parameters  | Description                                               | Type     | Default value |
| ----------- | --------------------------------------------------------- | -------- | ------------- |
| qr-code-url | QR code URL                                               | _string_ | -             |
| type        | Scan code type, optional values are `1`(QQ), `2`(WeChat)  | _number_ | `2`           |
| title       | Title, automatically generated based on `type` when empty | _string_ | -             |



### Events

| Event name | Description     | Parameters |
| ---------- | --------------- | ---------- |
| onCancel   | Click to cancel | -          |