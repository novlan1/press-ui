---
url: pages/press/p-c-login/p-c-login
---

## PCLogin

PC login pop-up window.

## Introduction

```ts
import PressPCLogin from 'press-ui/press-p-c-login/press-p-c-login';

export default {
   components: {
     PressPCLogin,
   }
}
```

## Code Demo

### Basic usage


```html
<PressPCLogin
   :show.sync="show"
   @close="closeDialog"
   @jumpToLoginWX="jumpToLoginWX"
   @jumpToLoginQQ="jumpToLoginQQ"
/>
```

```ts
export default {
   components: {
     PressPCLogin,
   },
   data() {
     let show = false;
     // #ifdef H5
     show = true;
     // #endif

     return {
       show,
     };
   },
   methods: {
     showDialog() {
       this.show = true;
     },
     jumpToLoginWX() {
       this.onGTip('[jumpToLoginWX]');
       this.show = false;
     },
     jumpToLoginQQ() {
       this.onGTip('[jumpToLoginQQ]');
       this.show = false;
     },
     closeDialog() {
       console.log('closeDialog');
     },
   },
};
```


## API

### Props

| Parameters            | Description                     | Type      | Default value |
| --------------------- | ------------------------------- | --------- | ------------- |
| show                  | Whether to display              | _boolean_ | `false`       |
| show-q-q              | Whether to display QQ login     | _boolean_ | `true`        |
| show-w-x              | Whether to display WeChat login | _boolean_ | `true`        |
| destroyed-when-closed | Whether to destroy when closed  | _boolean_ | `false`       |

### Events

| Event name    | Description                                | Parameters |
| ------------- | ------------------------------------------ | ---------- |
| close         | Triggered when the pop-up window is closed | -          |
| jumpToLoginQQ | Click QQ to log in                         | -          |
| jumpToLoginWX | Click WeChat to log in                     | -          |