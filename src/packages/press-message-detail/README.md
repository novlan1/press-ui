---
url : pages/press/message-detail/message-detail
---

## MessageDetail 消息详情

IM聊天详情。

### 基本用法

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


| 参数      | 说明           | 类型      | 默认值  |
| --------- | -------------- | --------- | ------- |
| list      | 消息列表       | _Array_   | `[]`    |
| loading   | 是否显示加载中 | _boolean_ | `false` |
| showInput | 是否显示输入框 | _boolean_ | `true`  |


### Event


| 事件名   | 说明     | 回调参数 |
| -------- | -------- | -------- |
| loadMore | 加载更多 | -        |
| send     | 发送消息 | 消息内容 |


