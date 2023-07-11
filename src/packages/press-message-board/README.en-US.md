---
url : pages/press/message-board/message-board
---

## MessageBoard 

Message board function.

For the convenience of use, there are 3 components inside the message board, which are message list, message `item`, and input box.


## Code Demo

### Basic usage


```html
<div class="wrap">
   <div class="demo-list-wrap">
     <PressMessageBoardList
       custom-class="demo-message-list"
     >
       <PressMessageBoardItem
         v-for="(item, index) of msgList"
         :key="index"
         :item="item"
         captain-uid="good_uid"
         :caption-badge-at-right="false"
       />
     </PressMessageBoardList>
   </div>

   <div class="demo-input-wrap">
     <PressMessageBoardInput
       v-model="msgContent"
       :send-btn-enable="sendBtnEnable"
       @clickInput="clickInput"
       @sendMsg="sendMsg"
     />
   </div>
</div>
```

```ts
import PressMessageBoardInput from 'src/packages/press-message-board/press-message-board-input.vue';
import PressMessageBoardList from 'src/packages/press-message-board/press-message-board-list.vue';
import PressMessageBoardItem from 'src/packages/press-message-board/press-message-board-item.vue';


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
     PressMessageBoardItem,
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
     },
   }
}
```

## API




### MessageBoardItem Props


| Parameter              | Description                               | Type      | Default |
| ---------------------- | ----------------------------------------- | --------- | ------- |
| item                   | message content                           | _Object_  | `{}`    |
| captain-uid            | captain uid                               | _string_  | -       |
| captain-badge-at-right | Whether the captain badge is on the right | _boolean_ | false   |
| colon                  | Whether to display the colon              | _boolean_ | true    |
| reply-colon            | Whether to show the colon in the reply    | _boolean_ | true    |

### MessageBoardItem Event


| Event Name | Description    | Callback Parameters         |
| ---------- | -------------- | --------------------------- |
| replyClick | Click to reply | message item, message index |


### MessageBoardInput Props


| Parameter                | Description                            | Type               | Default |
| ------------------------ | -------------------------------------- | ------------------ | ------- |
| value                    | input content                          | _string_           | -       |
| send-btn-enable          | Whether to enable sending              | _boolean_          | `false` |
| text-area-is-focus       | Whether to focus                       | _boolean_          | `false` |
| input-bottom             | height from bottom                     | _[number, string]_ | `0`     |
| placeholder              | placeholder text                       | _boolean_          | `false` |
| text-area-is-auto-height | Whether to adjust height automatically | _boolean_          | `false` |
| adjust-position          | Corresponding applet adjust-position   | _boolean_          | `false` |
| show-confirm-bar         | Corresponding applet show-confirm-bar  | _boolean_          | `false` |


### MessageBoardInput Event


| Event Name           | Description             | Callback Parameters |
| -------------------- | ----------------------- | ------------------- |
| input                | input event             | input content       |
| clickInput           | click input box         | -                   |
| sendMsg              | send message            | input content       |
| keyboardheightchange | keyboard height changes | original event      |
| blur                 | lose focus              | -                   |