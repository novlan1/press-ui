---
url: pages/press/message-detail/message-detail
---

## MessageDetail 

IM chat details.

### Basic Usage

```html
<PressMessageDetail
   :msg-list="msgList"
/>
```

```ts
const MSG_LIST = [
   {
     id: 1,
     msgType: 'TIME',
     content: {
       text: '123123',
     },
   },
   {
     id: 2,
     msgType: 'MESSAGE_TEXT',
     avatar: 'https://dummyimage.com/44x44',
     content: {
       text: '123123',
     },
   },
   {
     id: 3,
     msgType: 'MESSAGE_TEXT',
     avatar: 'https://dummyimage.com/44x44',
     content: {
       text: '123123',
     },
   },
   {
     id: 4,
     msgType: 'MESSAGE_TEXT',
     isMine: true,
     avatar: 'https://dummyimage.com/44x44',
     content: {
       text: '123123',
     },
   },
   {
     id: 5,
     msgType: 'MESSAGE_TEXT',
     avatar: 'https://dummyimage.com/44x44',
     content: {
       text: '123123',
     },
   },
];

export default {
   data() {
     return {
       msgList: MSG_LIST,
     }
   },
   methods: {
   }
}
```

## API

### Props


| Parameter | Description                   | Type      | Default |
| --------- | ----------------------------- | --------- | ------- |
| list      | message list                  | _Array_   | `[]`    |
| loading   | Whether to show loading       | _boolean_ | `false` |
| showInput | Whether to show the input box | _boolean_ | `true`  |


###Event


| Event Name | Description  | Callback Parameters |
| ---------- | ------------ | ------------------- |
| loadMore   | Load More    | -                   |
| send       | send message | message content     |