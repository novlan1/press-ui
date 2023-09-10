---
url : pages/press/message-board/message-board
---

## MessageBoard 留言板

留言板功能。

为方便使用，留言板内部为3个组件，分别是留言列表、留言`item`、输入框。


## 引入

```ts
import PressMessageBoard from 'press-ui/press-message-board/press-message-board';

export default {
  components: {
    PressMessageBoard,
  }
}
```

## 代码演示

### 基本用法


```html
<div class="wrap">
  <div class="demo-list-wrap">
    <PressMessageBoardList
      custom-class="demo-message-list"
    >
      <PressMessageBoardItem
        v-for="(item,index) of msgList"
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


| 参数                   | 说明                 | 类型      | 默认值 |
| ---------------------- | -------------------- | --------- | ------ |
| item                   | 消息内容             | _object_  | `{}`   |
| captain-uid            | 队长uid              | _string_  | -      |
| captain-badge-at-right | 队长图标是否在右边   | _boolean_ | false  |
| colon                  | 是否显示冒号         | _boolean_ | true   |
| reply-colon            | 是否显示回复中的冒号 | _boolean_ | true   |

### MessageBoardItem Event


| 事件名     | 说明     | 回调参数            |
| ---------- | -------- | ------------------- |
| replyClick | 点击回复 | 消息item，消息index |


### MessageBoardInput Props


| 参数                     | 说明                         | 类型               | 默认值  |
| ------------------------ | ---------------------------- | ------------------ | ------- |
| value                    | 输入内容                     | _string_           | -       |
| send-btn-enable          | 是否可以发送                 | _boolean_          | `false` |
| text-area-is-focus       | 是否聚焦                     | _boolean_          | `false` |
| input-bottom             | 距底部高度                   | _[number, string]_ | `0`     |
| placeholder              | 占位文字                     | _boolean_          | `false` |
| text-area-is-auto-height | 是否自动调整高度             | _boolean_          | `false` |
| adjust-position          | 对应小程序`adjust-position`  | _boolean_          | `false` |
| show-confirm-bar         | 对应小程序`show-confirm-bar` | _boolean_          | `false` |


### MessageBoardInput Event


| 事件名               | 说明             | 回调参数  |
| -------------------- | ---------------- | --------- |
| input                | 输入事件         | 输入内容  |
| clickInput           | 点击输入框       | -         |
| sendMsg              | 发送消息         | 输入内容  |
| keyboardheightchange | 键盘高度发生变化 | 原始event |
| blur                 | 失去焦点         | -         |



