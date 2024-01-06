---
url : pages/press/message-list/message-list
---

## MessageList 


It can be used to display the IM message list.

### Basic Usage

```html
<PressMessageList
   :list="list"
   @onClickDetail="onClickDetail"
/>
```

```ts
export default {
   data() {
     return {
       list: [{
         id: '1',
         nick: 'This is the nickname,
         content: 'Here is the content of the message',
         unreadCount: 99,
         time: '08-20 11:32',
         avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
       }],
     }
   },
   methods: {
     onClickDetail(item) {
       console.log('Clicked: ', item);
     },
     onDelete(item) {
       console.log('Deleting: ', item);
     },
   }
}
```

## API

### Props


| Parameter | Description  | Type                                   | Default |
| --------- | ------------ | -------------------------------------- | ------- |
| list      | message list | _Array<{nick, content, time, avatar}>_ | `[]`    |


### Event


| Event Name    | Description        | Callback Parameters |
| ------------- | ------------------ | ------------------- |
| onClickDetail | click message item | message `item`      |
| onDelete      | Click to delete    | Message `item`      |


## common problem

### unique `id`

The `id` of each item in `list` should be unique, otherwise `swipe-cell` will not be closed after deleting a certain message.
