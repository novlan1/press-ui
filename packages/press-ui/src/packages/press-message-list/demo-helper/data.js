export const MOCK_MESSAGE_LIST = Array.from({ length: 110 }).map((_, i) => ({
  id: i,
  nick: '这是昵称这是昵称这是昵称这是昵称这是昵称这是昵称这是昵称',
  content: '这里是消息内容，这里是消息内容消息内容，这里是消息内容，这里是消息内容消息内容',
  unreadCount: i,
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
  showRedDot: i % 5 === 0,
}));
