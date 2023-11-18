---
url: pages/press/auth-login/auth-login
---

## AuthLogin 


## Introduction

```ts
import PressAuthLogin from 'press-ui/press-auth-login/press-auth-login';

export default {
   components: {
     PressAuthLogin,
   }
}
```

## Code Demo

### Basic usage

```html
<PressAuthLogin
   v-if="show"
   :after-cancel="afterCancel"
   :after-confirm="afterConfirm"
/>
```

```ts
let that;

export default {
   data() {
     that = this;
     return {
       show: true,
     };
   },
   methods: {
     afterCancel() {
       that.onGTip('[afterCancel]');
       that.show = false;
     },
     afterConfirm() {
       that.onGTip('[afterConfirm]');
       that.show = false;
     },
   },
};
```

### Functional call

Currently only supported on H5 side.

```ts
import PressAuthLogin from 'press-ui/press-auth-login/press-auth-login';
import { initH5Instance } from 'press-ui/common/component-handler/h5-handler';

let that;

export default {
   components: {
     PressAuthLogin,
   },
   data() {
     that = this;
     return {
     };
   },
   methods: {
     showFunctionalDialog() {
       initH5Instance(PressAuthLogin, 'press-auth-login', {
         isShowByFunction: true,
         afterCancel: this.afterCancel,
         afterConfirm: this.afterConfirm,
       });
     },
     afterCancel() {
       that.onGTip('[afterCancel]');
       that.show = false;
     },
     afterConfirm() {
       that.onGTip('[afterConfirm]');
       that.show = false;
     },
   },
};
```

## API

### Props

| Parameters          | Description                                                                 | Type       | Default value                                                          |
| ------------------- | --------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| logo                | icon                                                                        | _string_   | `https://image-1251917893.file.myqcloud.com/Esports/common/gamers.png` |
| tip-desc            | Description copy                                                            | _string_   | `Authorize to log in and get more services`                            |
| btn-text            | Button copy                                                                 | _string_   | `Authorized login`                                                     |
| validate-confirm    | Verification method when clicking confirm, returning `false` will not close | _function_ | -                                                                      |
| after-cancel        | Callback for clicking the close icon                                        | _function_ | -                                                                      |
| after-confirm       | Callback for clicking the confirm button                                    | _function_ | -                                                                      |
| is-show-by-function | Whether it is a functional call                                             | _boolean_  | `false`                                                                |