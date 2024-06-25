<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      section-style="margin:0;"
    >
      <press-swipe-cell
        :right-width="65"
        :left-width="65"
        :async-close="asyncClose"
        @click="onClick"
        @close="onClose"
        @open="onOpen"
      >
        <template #left>
          <div
            class="left"
          >
            {{ t('select' ) }}
          </div>
        </template>

        <div class="content">
          {{ t('content') }}
        </div>

        <template #right>
          <div
            class="right"
          >
            {{ t('delete') }}
          </div>
        </template>
      </press-swipe-cell>
    </demo-block>
  </div>
</template>
<script>
import PressSwipeCell from 'src/packages/press-swipe-cell/press-swipe-cell.vue';


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
  components: {
    PressSwipeCell,
  },
  data() {
    return {
      asyncClose: false,
    };
  },
  methods: {
    onClick(val) {
      console.log('onClick.val', val);
      this.onGTip(`click ${val}`);
    },
    onClose(...args) {
      console.log('onClose.args', args);
      this.onGTip('close');
    },
    onOpen(...args) {
      console.log('onOpen.args', args);
      this.onGTip('open');
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

