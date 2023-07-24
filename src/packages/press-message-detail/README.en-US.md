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
   }
}
```

## API

### Props


| Parameter | Description                                                                                             | Type      | Default |
| --------- | ------------------------------------------------------------------------------------------------------- | --------- | ------- |
| list      | list of message details                                                                                 | _Array_   | `[]`    |
| loading   | whether it is loading                                                                                   | _Boolean_ | `false` |
| offset    | The `load` event is triggered when the distance between the scrollbar and the top is less than `offset` | _Number_  | `300`   |



### Event


| Event Name        | Description                          | Callback Parameters                             |
| ----------------- | ------------------------------------ | ----------------------------------------------- |
| onScroll          | `onScroll-view` scrolling            | `event`                                         |
| clickAvatar       | click on the avatar                  | `messageItem`                                   |
| clickPic          | click on the picture in the message  | `pickUrl, messageItem`                          |
| checkDetail       | Click to view details in the message | `link, messageItem`                             |
| reSend            | resend                               | `messageItem`                                   |
| agreeExchangeCard | Agree to exchange business cards     | `messageItem`                                   |
| goSetCardPage     | Jump to card setting page            | `messageItem`                                   |
| makePhoneCall     | Make a call                          | `phone, contactItem, messageItem`               |
| clickCopy         | click to copy                        | `selector, copyValue, contactItem, messageItem` |
| loadMore          | pull up to load more                 | -                                               |


### scrollToBottom

The parent component can call `scrollToBottom` in `press-message-detail` to make the chat message scroll to the bottom.

```ts
export default {
   mounted() {
     fetchData().then((list) => {
       this.list = list;
       setTimeout(() => {
         this.$refs[this.pressMessageDetailRef].scrollToBottom();
       });
     });
   },
}
```

## common problem

### The direction of page scrolling on Android models is opposite to the direction of finger sliding

The element after the component cannot be set to `position: absolute; top: 0;bottom: 0`.