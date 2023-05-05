<template>
  <div class="wrap">
    <PressMessageDetail
      :list="msgList"
      :is-show-solo="isSolo"
      @send="send"
    />

    <press-picker
      v-if="picker.show"
      :title="picker.title"
      :select-list="picker.userList"
      @onClickConfirm="picker.confirm"
      @onRemove="picker.show = false"
    />
  </div>
</template>
<script>
import PressMessageDetail from 'src/packages/press-message-detail/press-message-detail.vue';
import { IM } from 'src/packages/common/im/im';
import { getUserSig } from 'src/utils/im/sig';

const IMHandler = new IM({ appId: 1400800161 });

const userList = [
  {
    label: 'Little 1',
    value: 'Little 1',
  },
  {
    label: 'Little 2',
    value: 'Little 2',
  },
];

const MSG_LIST = [
  {
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    id: 1,
    msgType: 'TIME',
    content: {
      text: '昨天 11:10',
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
    teamInvite: true,
    avatar: 'https://dummyimage.com/44x44',
  },
  {
    id: 6,
    msgType: 'MESSAGE_TEXT',
    teamInvite: false,
    isSolo: true,
    isMine: true,
    avatar: 'https://dummyimage.com/44x44',
    content: {
      text: '来一局1V1看看操作',
    },
  },
];


function formatMessageList(list) {
  return list.map((item, index) => ({
    id: index,
    content: {
      text: item.payload.text,
    },
    msgType: 'MESSAGE_TEXT',
    avatar: 'https://dummyimage.com/44x44',
    isMine: true,
  }));
}

export default {
  components: {
    PressMessageDetail,
  },
  data() {
    return {
      msgList: MSG_LIST,
      isSolo: true,
      userList,
      picker: {
        show: false,
        title: '请选择你的用户名',
        userList,
        confirm: this.onConfirmUser,
      },
      chatInfo: {
        from: '',
        to: 'Little 2',
      },
    };
  },
  mounted() {
    const user = localStorage.getItem('IM_USER');
    if (!user) {
      this.picker.show = true;
    }
  },
  methods: {
    getMessageList(uid) {
      console.log('uid', uid);
      IMHandler.getMessageList({
        conversationId: `C2C${uid}`,

      }).then((res) => {
        console.log('[getIMMessageList] res', res);
        const list = formatMessageList(res?.data?.messageList || []);
        console.log('[list]: ', list);
        this.msgList = list;
      })
        .catch((err) => {
          console.log('[getIMMessageList] err', err);
        });
    },
    async send(content) {
      console.log('chatInfo', this.chatInfo);
      if (!this.chatInfo.to) return;

      IMHandler.sendMessage({
        to: this.chatInfo.to,
        text: content,
      }).then((res) => {
        console.log('[sendIMMessage] res: ', res);
      })
        .catch((err) => {
          console.log('[sendIMMessage] err: ', err);
        });
    },
    onConfirmOtherUser(item) {
      this.picker.show = false;
      console.log('[item]', item);
      this.getMessageList(item.value);
      this.chatInfo = {
        ...this.chatInfo,
        to: item.value,
      };
    },
    onConfirmUser(item) {
      this.picker.show = false;
      this.chatInfo = {
        ...this.chatInfo,
        from: item.value,
      };

      setTimeout(() => {
        this.picker = {
          ...this.picker,
          show: true,
          title: '请选择你的聊天对象',
          confirm: this.onConfirmOtherUser,
        };
      }, 300);

      console.log('[onConfirmUser] item', item);

      getUserSig(item.value).then((userSig) => {
        IMHandler.login({
          userId: item.value,
          userSig,
        }).then(() => {
          console.log('tttttttt');
        })
          .catch(() => {
            console.log('ccccccc');
          })
          .finally(() => {
            console.log('ffffff');
          });
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
.wrap {
  height: 100%;
}
</style>
