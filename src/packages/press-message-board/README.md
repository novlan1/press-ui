---
url : pages/press/message-board/message-board
---

## MessageBoard 留言板

留言板功能。

为方便使用，留言板内部为两个组件，一个是留言列表，一个是输入框。


## 代码演示

### 基本用法


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
    nick: '杨',
    create_time: '15:00',
    comm_list: [
      {
        comm_id: '1670481120121557488',
        content_info: 'adf',
        msg_id: '1670481115967648602',
        level: 1,
        uid: 'good_uid',
        nick: '杨',
        create_time: '15:00',
      },
    ],
  },
   {
    msg_id: '1670481095713238877',
    content_info: '欢迎 杨 进入房间',
    msg_type: 2,
    uid: 'good_uid',
    nick: '杨',
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


| 参数       | 说明     | 类型    | 默认值 |
| ---------- | -------- | ------- | ------ |
| list       | 消息列表 | _Array_ | `[]`   |
| captainUid | 队长uid  | string  | -      |


### MessageBoardList Event


| 事件名     | 说明     | 回调参数            |
| ---------- | -------- | ------------------- |
| replyClick | 点击回复 | 消息item，消息index |

### MessageBoardInput Props


| 参数                 | 说明                       | 类型               | 默认值  |
| -------------------- | -------------------------- | ------------------ | ------- |
| value                | 输入内容                   | _string_           | -       |
| sendBtnEnable        | 是否可以发送               | _boolean_          | `false` |
| textAreaIsFocus      | 是否聚焦                   | _boolean_          | `false` |
| inputBottom          | 距底部高度                 | _[number, string]_ | `0`     |
| placeholder          | 占位文字                   | _boolean_          | `false` |
| textAreaIsAutoHeight | 是否自动调整高度           | _boolean_          | `false` |
| adjustPosition       | 对应小程序adjust-position  | _boolean_          | `false` |
| showConfirmBar       | 对应小程序show-confirm-bar | _boolean_          | `false` |


### MessageBoardInput Event


| 事件名               | 说明             | 回调参数  |
| -------------------- | ---------------- | --------- |
| input                | 输入事件         | 输入内容  |
| clickInput           | 点击输入框       | -         |
| sendMsg              | 发送消息         | 输入内容  |
| keyboardheightchange | 键盘高度发生变化 | 原始event |
| blur                 | 失去焦点         | -         |



