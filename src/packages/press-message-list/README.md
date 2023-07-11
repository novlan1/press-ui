---
url : pages/press/message-list/message-list
---

## MessageList 消息列表


可用于IM消息列表的展示。

### 基本用法

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
        nick: '这是昵称,
        content: '这里是消息内容',
        unreadCount: 99,
        time: '08-20 11:32',
        avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
      }],
    }
  },
  methods: {
    onClickDetail(item) {
      console.log('点击了: ', item);
    },
    onDelete(item) {
      console.log('正在删除: ', item);
    },
  }
}
```

## API

### Props


| 参数 | 说明     | 类型                                   | 默认值 |
| ---- | -------- | -------------------------------------- | ------ |
| list | 消息列表 | _Array<{nick, content, time, avatar}>_ | `[]`   |


### Event


| 事件名        | 说明         | 回调参数   |
| ------------- | ------------ | ---------- |
| onClickDetail | 点击消息条目 | 消息`item` |
| onDelete      | 点击删除     | 消息`item` |


## 常见问题

### 唯一`id`

`list`中每一项的`id`应该唯一，否则会出现删除某一条消息后，`swipe-cell`仍未关闭。
