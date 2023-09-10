---
url : pages/press/message-detail/message-detail
---

## MessageDetail 消息详情

IM聊天详情。

## 引入

```ts
import PressMessageDetail from 'press-ui/press-message-detail/press-message-detail';

export default {
  components: {
    PressMessageDetail,
  }
}
```

## 代码演示

### 基本用法

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


| 参数    | 说明                                           | 类型      | 默认值  |
| ------- | ---------------------------------------------- | --------- | ------- |
| list    | 消息详情列表                                   | _array_   | `[]`    |
| loading | 是否在加载中                                   | _boolean_ | `false` |
| offset  | 滚动条与顶部距离小于 `offset` 时触发`load`事件 | _number_  | `300`   |



### Event


| 事件名            | 说明                 | 回调参数                                        |
| ----------------- | -------------------- | ----------------------------------------------- |
| onScroll          | `onScroll-view`滚动  | `event`                                         |
| clickAvatar       | 点击头像             | `messageItem`                                   |
| clickPic          | 点击消息中的图片     | `pickUrl, messageItem`                          |
| checkDetail       | 点击消息中的查看详情 | `link, messageItem`                             |
| reSend            | 重新发送             | `messageItem`                                   |
| agreeExchangeCard | 同意交换名片         | `messageItem`                                   |
| goSetCardPage     | 跳转名片设置页面     | `messageItem`                                   |
| makePhoneCall     | 拨打电话             | `phone, contactItem, messageItem`               |
| clickCopy         | 点击复制             | `selector, copyValue, contactItem, messageItem` |
| loadMore          | 上拉加载更多         | -                                               |


### scrollToBottom

父组件可以调用`press-message-detail`中的`scrollToBottom`，使聊天消息滚动到底部。

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

## 常见问题

### 安卓机型下页面滚动方向与手指滑动方向相反

组件后一个元素不能设置为`position: absolute; top: 0;bottom: 0`。
