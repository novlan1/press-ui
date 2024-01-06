<template>
  <div class="demo-wrap">
    <PressMessageList
      :list="list"
      @onClickDetail="onClickDetail"
      @onDelete="onDelete"
    />
  </div>
</template>
<script>
import PressMessageList from 'src/packages/press-message-list/press-message-list.vue';
import { MOCK_MESSAGE_LIST } from 'src/packages/press-message-list/demo-helper/data';


export default {
  components: {
    PressMessageList,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = MOCK_MESSAGE_LIST;
  },
  methods: {
    onClickDetail(item) {
      this.onGTip(`Click ${item.id}`);
    },
    onDelete(item, cb) {
      let idx = -1;
      // 正式项目应请求后台删除
      this.list.forEach((it, index) => {
        if (item.id === it.id) {
          idx = index;
        }
      });
      this.list.splice(idx, 1);
      this.onGTip(`Delete ${item.id}`);

      if (typeof cb === 'function') {
        cb();
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
