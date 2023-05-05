---
url : pages/press/message-list/message-list
---

## MessageList 消息列表


可用于IM消息列表的展示。

### 基本用法

```html
<PressMessageList
  :list="list"
  :loading="loading"
  :use-lazy="false"
  @onClickDetail="onClickDetail"
/>
```

```ts
const DEMO_LIST = [{
  nick: 'HOLD LOADING',
  content: '这里是消息内容，这里是消息内容消息内容',
  unreadCount: '99',
  time: '13:02',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: 'HOLD EMPTY',
  content: '这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容',
  time: '昨天 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: 'HOLD LIST',
  content: '这里是消息内容，这里是消息内容消息内容',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
}];

export default {
  data() {
    return {
      loading: false,
      list: DEMO_LIST,
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


| 参数    | 说明               | 类型                                   | 默认值  |
| ------- | ------------------ | -------------------------------------- | ------- |
| list    | 消息列表           | _Array<{nick, content, time, avatar}>_ | `[]`    |
| loading | 是否显示加载中     | _boolean_                              | `false` |
| useLazy | 头像是否使用v-lazy | _boolean_                              | `false` |


### Event


| 事件名        | 说明         | 回调参数 |
| ------------- | ------------ | -------- |
| onClickDetail | 点击消息条目 | 消息Item |
| onDelete      | 点击删除     | 消息Item |


