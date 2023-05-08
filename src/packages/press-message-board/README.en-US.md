---
url : pages/press/message-board/message-board
---

## MessageBoard 

Message board function.

For ease of use, there are two components inside the message board, one is the message list and the other is the input box.


## Code Demo

### Basic Usage


```html
<PressMessageBoardList
   :list="msgList"
   captain-uid="good_uid"
/>
<PressMessageBoardInput
   v-model="msgContent"
   :send-btn-enable="sendBtnEnable"
   @sendMsg="sendMsg"
/>
```

```ts
import PressMessageBoardInput from 'press-ui/press-message-board/press-message-board-input.vue';
import PressMessageBoardList from 'press-ui/press-message-board/press-message-board-list.vue';


const MSG_LIST = [
    {
     msg_id: '1670481115967648602',
     content_info: 'dddd',
     msg_type: 1,
     uid: 'good_uid',
     nick: 'Yang',
     create_time: '15:00',
     comm_list: [
       {
         comm_id: '1670481120121557488',
         content_info: 'adf',
         msg_id: '1670481115967648602',
         level: 1,
         uid: 'good_uid',
         nick: 'Yang',
         create_time: '15:00',
       },
     ],
   },
    {
     msg_id: '1670481095713238877',
     content_info: 'Welcome Yang to enter the room',
     msg_type: 2,
     uid: 'good_uid',
     nick: 'Yang',
     create_time: '13:00',
   },
];

export default {
   components: {
     PressMessageBoardInput,
     PressMessageBoardList,
   },
   data() {
     return {
       msgList: MSG_LIST,
       msgContent: '',
     }
   },
   computed: {
     sendBtnEnable() {
       const res = !!(this.msgContent && this.msgContent.trim().length > 0);
       return res;
     },
   },
   methods: {
      sendMsg() {
       console.log('sendMsg', this.msgContent);
     },
   }
}
```

## API

### MessageBoardList Props


| Parameter  | Description  | Type    | Default |
| ---------- | ------------ | ------- | ------- |
| list       | message list | _Array_ | `[]`    |
| captainUid | captain uid  | string  | -       |


### MessageBoardList Event


| Event Name | Description    | Callback Parameters         |
| ---------- | -------------- | --------------------------- |
| replyClick | Click to reply | message item, message index |

### MessageBoardInput Props


| Parameter            | Description                                | Type               | Default |
| -------------------- | ------------------------------------------ | ------------------ | ------- |
| value                | input content                              | _string_           | -       |
| sendBtnEnable        | Can send                                   | _boolean_          | `false` |
| textAreaIsFocus      | Whether to focus                           | _boolean_          | `false` |
| inputBottom          | height from bottom                         | _[number, string]_ | `0`     |
| placeholder          | placeholder text                           | _boolean_          | `false` |
| textAreaIsAutoHeight | Whether to automatically adjust the height | _boolean_          | `false` |
| adjustPosition       | corresponds to the applet adjust-position  | _boolean_          | `false` |
| showConfirmBar       | Corresponding applet show-confirm-bar      | _boolean_          | `false` |


### MessageBoardInput Event


| Event Name           | Description             | Callback Parameters |
| -------------------- | ----------------------- | ------------------- |
| input                | input event             | input content       |
| clickInput           | click input box         | -                   |
| sendMsg              | send message            | input content       |
| keyboardheightchange | keyboard height changes | original event      |
| blur                 | lose focus              | -                   |
