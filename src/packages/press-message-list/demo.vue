<template>
  <div class="wrap">
    <PressMessageList
      :list="list"
      :loading="loading"
      :use-lazy="false"
      @onClickDetail="onClickDetail"
      @onDelete="onDelete"
    />
  </div>
</template>
<script>
import PressMessageList from 'src/packages/press-message-list/press-message-list.vue';


const DEMO_LIST = [{
  nick: '显示加载中',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LOADING',
  unreadCount: '99',
  time: '13:02',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示空状态',
  content: '这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容，这里是超长内容',
  type: 'HOLD_EMPTY',
  time: '昨天 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
{
  nick: '显示列表',
  content: '这里是消息内容，这里是消息内容消息内容',
  type: 'HOLD_LIST',
  time: '08-20 11:32',
  avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/wechat_avatar.png',
},
];

let timer;

export default {
  components: {
    PressMessageList,
  },
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.list = DEMO_LIST;
      this.loading = false;
    }, 1000);

    // timer = setTimeout(() => {
    //   this.list = [];
    // }, 6000);
  },
  methods: {
    onClickDetail(item) {
      console.log('点击了: ', item.type);

      if (item.type === 'HOLD_LIST') {
        clearTimeout(timer);
        this.list = DEMO_LIST;
        this.loading = false;
      } else if (item.type === 'HOLD_LOADING') {
        this.loading = true;
        this.list = [];
      } else if (item.type === 'HOLD_EMPTY') {
        this.list = [];
        this.loading = false;
      }
    },
    onDelete(item) {
      let idx = -1;
      // 正式项目应请求后台删除
      this.list.forEach((it, index) => {
        if (item.type === it.type) {
          idx = index;
        }
      });
      console.log('正在删除: ', item.type, idx);
      this.list.splice(idx, 1);
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
