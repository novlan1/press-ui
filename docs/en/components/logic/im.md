# IM

Instant messaging related, including encapsulation of official API, formatting of message data, etc.

## IM

The encapsulation of IM-related APIs supports H5, WeChat applets, and QQ applets.

### Initialization

```ts
import { IM } from 'press-ui/common/im/im';

const TIM_APP_ID = 123;

const IMHandler = new IM({
   appId: TIM_APP_ID,
});
```

### Log in

```ts
// Log in
IMHandler. innerLogin({
   userId: '123',
   userSig: '123',
}).then(() => {});


// Sign out
IMHandler. innerLogout()
   .then(() => {});


// update personal information
IMHandler. updateMyProfile(profile)
   .then(() => {});
```



### Session related

```ts
// Get the full session list
IMHandler. getConversationList()
   .then(() => {});


// delete a session
IMHandler. deleteConversation('conversationId')
   .then(() => {});


// Set all unread messages of all sessions as read
IMHandler. sendAllMegRead()
   .then(() => {});


// Report all unread messages in a session as read
IMHandler.setMessageRead('conversationId')
   .then(() => {});
```


### Message related


```ts
// Send a message
IMHandler. sendMessage({
   to: '123',
   text: '123'
}).then(() => {});


// get message list
IMHandler. getMessageList({
   id: 'C2C123',
   nextMsgId: 'xxx',
}).then(() => {});
```




### Set the callback

```ts
const callback = () => {};

// received a new message
IMHandler.setReceivedMessagesListener(callback);


// account is kicked out
IMHandler.setKickedOutListener(callback);


// IM status becomes ready
IMHandler. setReadyListener(callback);


// session list changes
IMHandler.setConversationUpdateListener(callback);


// message unread count change
IMHandler.setUnreadMsgCountUpdatedListener(callback);
```

### other

`waitReady`

```ts
// wait for the status to become ready and then execute
IMHandler. waitReady()
   .then(() => {});
```

There are also some instance attributes:

```ts
// Whether it is ready state
console.log(IMHandler.isReady);

// Are you logged in
console.log(IMHandler.isOnline);
```

## Message list processing

Processing of message list data, including:

- insert time
- Delete recalled messages
- format json text
- User information processing


```ts
import { baseFormatMessageDetailList } from 'press-ui/common/im/message-detail/format';

const messageList = baseFormatMessageDetailList(list, myInfo, oppositeInfo, lastTimeStampTag);
```




## common problem

### Why encapsulation?

This tool is an encapsulation of [official API](https://web.sdk.qcloud.com/im/doc/zh-cn/index.html), which is convenient for "one line of code" calling on the business side and reduces usage costs.

For example, when setting event callbacks, the business side does not need to refer to the constants of status and events, so the development efficiency is high and the code is clear.

In addition, many APIs can only be executed after `ready`, such as `getMessageList`, `sendMessage`, `updateMyProfile`, after using this tool, it will automatically wait for `ready`.