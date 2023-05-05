<template>
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
</template>
<script>
import PressMessageBoardInput from 'src/packages/press-message-board/press-message-board-input.vue';
import PressMessageBoardList from 'src/packages/press-message-board/press-message-board-list.vue';
import PressMessageBoardItem from 'src/packages/press-message-board/press-message-board-item.vue';

const msgList = [
  {
    msg_id: '1670485673629351213',
    content_info: 'ceshi',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:50',
    comm_list: [

    ],
  },
  {
    msg_id: '1670485668576858426',
    content_info: '123123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:46',
    comm_list: [

    ],
  },
  {
    msg_id: '1670485588505754223',
    content_info: 'adfadf',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:30',
    comm_list: [

    ],
  },
  {
    msg_id: '1670485583523443686',
    content_info: 'ceshi',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:20',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481134496246346',
    content_info: 'adf',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:10',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481115967648602',
    content_info: 'dddd',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '15:00',
    comm_list: [
      {
        comm_id: '1670481120121557488',
        content_info: 'adf',
        content_type: 1,
        msg_id: '1670481115967648602',
        level: 1,
        uid: 'good_uid',
        nick: '杨',
        create_time: '15:00',
        comm_list: [
          {
            comm_id: '1670481123933696154',
            content_info: 'adfaf',
            content_type: 1,
            msg_id: '1670481115967648602',
            parent_comm_id: '1670481120121557488',
            level: 2,
            uid: 'good_uid',
            nick: '杨',
            parent_uid: 'good_uid',
            create_time: '15:00',
            parent_nick: '杨',
          },
          {
            comm_id: '1670481131496864773',
            content_info: 'adf',
            content_type: 1,
            msg_id: '1670481115967648602',
            parent_comm_id: '1670481120121557488',
            level: 2,
            uid: 'good_uid',
            nick: '杨',
            parent_uid: 'good_uid',
            create_time: '15:00',
            parent_nick: '杨',
          },
          {
            comm_id: '1670485592609623296',
            content_info: 'adf',
            content_type: 1,
            msg_id: '1670481115967648602',
            parent_comm_id: '1670481120121557488',
            level: 2,
            uid: 'good_uid',
            nick: '杨',
            parent_uid: 'good_uid',
            create_time: '15:00',
            parent_nick: '杨',
          },
          {
            comm_id: '1670485595478648922',
            content_info: 'adfadf',
            content_type: 1,
            msg_id: '1670481115967648602',
            parent_comm_id: '1670481120121557488',
            level: 2,
            uid: 'good_uid',
            nick: '杨',
            parent_uid: 'good_uid',
            create_time: '15:00',
            parent_nick: '杨',
          },
        ],
      },
      {
        comm_id: '1670481123933696154',
        content_info: 'adfaf',
        content_type: 1,
        msg_id: '1670481115967648602',
        parent_comm_id: '1670481120121557488',
        level: 2,
        uid: 'good_uid',
        nick: '杨',
        parent_uid: 'good_uid',
        create_time: '14:50',
        parent_nick: '杨',
      },
      {
        comm_id: '1670481131496864773',
        content_info: 'adf',
        content_type: 1,
        msg_id: '1670481115967648602',
        parent_comm_id: '1670481120121557488',
        level: 2,
        uid: 'good_uid',
        nick: '杨',
        parent_uid: 'good_uid',
        create_time: '14:30',
        parent_nick: '杨',
      },
      {
        comm_id: '1670485592609623296',
        content_info: 'adf',
        content_type: 1,
        msg_id: '1670481115967648602',
        parent_comm_id: '1670481120121557488',
        level: 2,
        uid: 'good_uid',
        nick: '杨',
        parent_uid: 'good_uid',
        create_time: '14:20',
        parent_nick: '杨',
      },
      {
        comm_id: '1670485595478648922',
        content_info: 'adfadf',
        content_type: 1,
        msg_id: '1670481115967648602',
        parent_comm_id: '1670481120121557488',
        level: 2,
        uid: 'good_uid',
        nick: '杨',
        parent_uid: 'good_uid',
        create_time: '14:10',
        parent_nick: '杨',
      },
    ],
  },
  {
    msg_id: '1670481108894319571',
    content_info: '123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '14:00',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481104059792043',
    content_info: '123123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:50',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481102986754195',
    content_info: '123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:40',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481101621544612',
    content_info: '123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:30',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481099293567941',
    content_info: '123123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:20',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481098433932835',
    content_info: '123',
    content_type: 1,
    msg_type: 1,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:10',
    comm_list: [

    ],
  },
  {
    msg_id: '1670481095713238877',
    content_info: '欢迎 杨 进入房间',
    content_type: 1,
    msg_type: 2,
    uid: 'good_uid',
    nick: '杨',
    create_time: '13:00',
    comm_list: [

    ],
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
      msgContent: '',
      msgList,
    };
  },
  computed: {
    sendBtnEnable() {
      const res = !!(this.msgContent && this.msgContent.trim().length > 0);
      return res;
    },
  },
  watch: {
    msgContent: {
      handler(val) {
        console.log('watch.msgContent', val);
      },
    },
  },
  methods: {
    clickInput() {

    },
    onChange(value) {
      console.log('onChange.value', value);
      this.msgContent = value;
    },
    sendMsg() {
      console.log('sendMsg', this.msgContent);
    },
  },
};
</script>
<style  lang="scss">
@import "src/packages/base/mixin.scss";
.demo-list-wrap {
  padding: 0 20px;
  // height: 100vh;
}
.demo-input-wrap {
  padding-bottom: 20px;
}
</style>
