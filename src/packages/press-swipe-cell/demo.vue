<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      section-style="margin:0;"
    >
      <press-swipe-cell
        :right-width="65"
        :left-width="65"
        @click="onClick"
        @close="onClose"
        @open="onOpen"
      >
        <div
          slot="left"
          class="left"
        >
          {{ t('select' ) }}
        </div>
        <div class="content">
          {{ t('content') }}
        </div>
        <div
          slot="right"
          class="right"
        >
          {{ t('delete') }}
        </div>
      </press-swipe-cell>
    </demo-block>
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      select: '选择',
      delete: '删除',
      collect: '收藏',
      title: '单元格',
      confirm: '确定删除吗？',
      cardTitle: '商品标题',
      beforeClose: '异步关闭',
      customContent: '自定义内容',
    },
    'en-US': {
      select: 'Select',
      delete: 'Delete',
      collect: 'Collect',
      title: 'Cell',
      confirm: 'Are you sure to delete?',
      cardTitle: 'Title',
      beforeClose: 'Before Close',
      customContent: 'Custom Content',
    },
  },

  data() {
    return {
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onClick(...args) {
      console.log('onClick.args', args);
    },
    onClose(...args) {
      console.log('onClose.args', args);
    },
    onOpen(...args) {
      console.log('onOpen.args', args);
    },
  },
};
</script>

<style scoped lang="scss">
.demo-wrap {
  ::v-deep .press-swipe-cell__left,
  ::v-deep .press-swipe-cell__right {
    background-color: #f44;
  }

  .content {
    height: 44px;
    line-height: 44px;
    padding-left: 20px;
    background: #f7f8fa;
  }
}
</style>

