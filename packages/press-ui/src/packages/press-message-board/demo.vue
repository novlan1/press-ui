<template>
  <div class="demo-wrap demo-wrap--flex">
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
          custom-style="padding: 0 20px;"
          @replyClick="replyClick"
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
import PressMessageBoardInput from 'press-ui/press-message-board/press-message-board-input.vue';
import PressMessageBoardList from 'press-ui/press-message-board/press-message-board-list.vue';
import PressMessageBoardItem from 'press-ui/press-message-board/press-message-board-item.vue';
import { MOCK_MESSAGE_BOARD_LIST } from 'src/packages/press-message-board/demo-helper/data';


export default {
  components: {
    PressMessageBoardInput,
    PressMessageBoardList,
    PressMessageBoardItem,
  },
  data() {
    return {
      msgContent: '',
      msgList: MOCK_MESSAGE_BOARD_LIST,
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
        console.log('[watch] msgContent: ', val);
      },
    },
  },
  methods: {
    clickInput() {
      this.onGTip('Click Input');
    },
    sendMsg() {
      console.log('[sendMsg]', this.msgContent);
      this.onGTip(this.msgContent);
    },
    replyClick(...args) {
      console.log('[replyClick]', ...args);
      this.onGTip('Click Reply');
    },
  },
};
</script>
<style lang="scss">
.demo-list-wrap {
  // padding: 0 20px;
  flex: 1;
  overflow: auto;
}
</style>
