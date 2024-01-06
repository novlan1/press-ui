---
url: pages/press/bind-login/bind-login
---

## BindLogin


## Introduction

```ts
import PressBindLogin from 'press-ui/press-bind-login/press-bind-login';

export default {
   components: {
     PressBindLogin,
   }
}
```

## Code Demo

### Basic usage

```html
<PressBindLogin
   v-if="show"
   :name="name"
   :description="description"
   :agreement-name="agreementName"
   :next-agreement-name="nextAgreementName"
   :show-next-agreement="showNextAgreement"
   @onCancel="show = false"
   @openAgreement="openAgreement"
   @openNextAgreement="openNextAgreement"
   @clickQQLogin="clickQQLogin"
   @clickWXLogin="clickWXLogin"
/>
```

```ts
export default {
   data() {
     let show = false;
     // #ifdef H5
     show = true;
     // #endif

     return {
       show,
       name: 'Press UI',
       description: 'Press UI is a set of Vue component libraries that supports basic uni-app H5, WeChat applet, QQ applet, APP, supports non-uni-app ordinary H5 projects, and is compatible with Vue2 and Vue3',
       agreementName: 'Press UI usage agreement',
       nextAgreementName: 'Press UI Privacy Agreement',
       showNextAgreement: true,
     };
   },
   methods: {
     showDialog() {
       this.show = true;
     },
     openAgreement() {
       this.onGTip('[openAgreement]');
     },
     openNextAgreement() {
       this.onGTip('[openNextAgreement]');
     },
     clickQQLogin() {
       this.onGTip('[clickQQLogin]');
     },
     clickWXLogin() {
       this.onGTip('[clickWXLogin]');
     },
   },
};
```

## API

### Props

| Parameters          | Description                       | Type      | Default value                                                 |
| ------------------- | --------------------------------- | --------- | ------------------------------------------------------------- |
| title               | title                             | _string_  | `Bind game account`                                           |
| logo                | image                             | _string_  | `https://image-1251917893.file.myqcloud.com/live/tg-logo.png` |
| name                | name                              | _string_  | -                                                             |
| description         | description                       | _string_  | -                                                             |
| show-q-q            | Whether to display QQ login       | _boolean_ | `true`                                                        |
| show-w-x            | Whether to display WeChat login   | _boolean_ | `true`                                                        |
| agreement-name      | Agreement name                    | _string_  | `User Agreement`                                              |
| show-next-agreement | Whether to show another agreement | _boolean_ | `false`                                                       |
| next-agreement-name | Another agreement name            | _string_  | -                                                             |



### Events


| Event name        | Description                | Parameters |
| ----------------- | -------------------------- | ---------- |
| clickQQLogin      | Click QQ login             | -          |
| clickWXLogin      | Click on WeChat to log in  | -          |
| onCancel          | Pop-up window closes       | -          |
| openAgreement     | click agreement            | -          |
| openNextAgreement | Click on another agreement | -          |