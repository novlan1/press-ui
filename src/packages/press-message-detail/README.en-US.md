---
url: pages/press/message-detail/message-detail
---

## MessageDetail 

IM chat details.

### Basic Usage

```html
  <PressMessageDetail
   :list="list"
   @onScroll="onScroll"
   @touchMove="touchMove"
   @clickAvatar="clickAvatar"
   @makePhoneCall="makePhoneCall"
   @goSetCardPage="goSetCardPage"
   @reSend="reSend"
   @checkDetail="checkDetail"
   @agreeExchangeCard="agreeExchangeCard"
   @clickCopy="clickCopy"
/>
```

```ts

export default {
   data() {
     return {
       list: [],
     }
   },
   methods: {
     onScroll() {},
     touchMove() {},
     clickAvatar() {},
     makePhoneCall() {},
     goSetCardPage() {},
     reSend() {},
     checkDetail() {},
     agreeExchangeCard() {},
     clickCopy() {},
   }
}
```

## API

### Props


| Parameter | Description             | Type    | Default |
| --------- | ----------------------- | ------- | ------- |
| list      | list of message details | _Array_ | `[]`    |


### Event


| Event Name        | Description                          | Callback Parameters                             |
| ----------------- | ------------------------------------ | ----------------------------------------------- |
| onScroll          | `onScroll-view` scrolling            | `event`                                         |
| touchMove         | manual dragging                      | `event`                                         |
| clickAvatar       | click on the avatar                  | `messageItem`                                   |
| clickPic          | Click on the picture in the message  | `pickUrl, messageItem`                          |
| checkDetail       | Click to view details in the message | `link, messageItem`                             |
| reSend            | resend                               | `messageItem`                                   |
| agreeExchangeCard | Agree to exchange business cards     | `messageItem`                                   |
| goSetCardPage     | Jump to card setting page            | `messageItem`                                   |
| makePhoneCall     | Make a call                          | `phone, contactItem, messageItem`               |
| clickCopy         | click to copy                        | `selector, copyValue, contactItem, messageItem` |