# IM 即时通信

即时通信相关，包含对官方API的封装、消息数据的格式化等。

## 1. TIM

获取 TIM，利用条件编译区分不同平台。

```ts
import { TIM } from 'press-ui/common/im/helper/tim'
```

## 2. IM

对 IM 相关 API 的封装，支持H5、微信小程序、QQ小程序。

### 2.1. 初始化

```ts
import { IM } from 'press-ui/common/im/im';

const TIM_APP_ID = 123;

const IMHandler = new IM({
  appId: TIM_APP_ID,
});
```

### 2.2. 登录

```ts
// 登录
IMHandler.innerLogin({
  userId: '123',
  userSig: '123',
}).then(() => {});


// 登出
IMHandler.innerLogout()
  .then(() => {});


// 更新个人资料
IMHandler.updateMyProfile(profile)
  .then(() => {});
```



### 2.3. 会话相关

```ts
// 获取全量的会话列表
IMHandler.getConversationList()
  .then(() => {});


// 删除某条会话
IMHandler.deleteConversation('conversationId')
  .then(() => {});


// 将所有会话的未读消息全部设置为已读
IMHandler.sendAllMegRead()
  .then(() => {});


// 将某会话下所有未读消息已读上报
IMHandler.setMessageRead('conversationId')
  .then(() => {});
```


### 2.4. 消息相关


```ts
// 发送消息
IMHandler.sendMessage({
  to: '123',
  text: '123'
}).then(() => {});


// 获取消息列表
IMHandler.getMessageList({
  id: 'C2C123',
  nextMsgId: 'xxx',
}).then(() => {});
```




### 2.5. 设置回调

```ts
const callback = () => {};

// 接收到新消息
IMHandler.setReceivedMessagesListener(callback);


// 账号被踢出
IMHandler.setKickedOutListener(callback);


// IM状态变为ready
IMHandler.setReadyListener(callback);


// 会话列表变化
IMHandler.setConversationUpdateListener(callback);


// 消息未读数变化
IMHandler.setUnreadMsgCountUpdatedListener(callback);
```

### 2.6. 其他

`waitReady`

```ts
// 等待状态变为ready后执行
IMHandler.waitReady()
  .then(() => {});
```

还有一些实例属性：

```ts
// 是否为ready状态
console.log(IMHandler.isReady);

// 是否已登录
console.log(IMHandler.isOnline);
```

## 3. 消息列表处理

对消息列表数据的处理，包括：

- 插入时间
- 删除撤回的消息
- 格式化json文本
- 用户信息处理


```ts
import { baseFormatMessageDetailList } from 'press-ui/common/im/message-detail/format';

const messageList = baseFormatMessageDetailList(list, myInfo, oppositeInfo, lastTimeStampTag);
```




## 4. 常见问题

### 4.1. 为什么封装？

本工具是对[官方API](https://web.sdk.qcloud.com/im/doc/zh-cn/index.html)的封装，方便业务侧“一行代码”调用，减少使用成本。

比如设置事件回调时，业务侧不需引用状态、事件的常量，开发效率高，代码清晰。

另外，很多API需`ready`后才可执行，比如`getMessageList`、`sendMessage`、`updateMyProfile`，使用本工具后，会自动等待`ready`。

### 4.2. Message Detail

`Message Detail` 模块已迁移至 `Press Plus` 中，可批量替换 `press-ui/common/im/message-detail/*` 至  `press-plus/common/im/message-detail/*`。
