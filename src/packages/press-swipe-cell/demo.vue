<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      section-style="margin:0;"
    >
      <PressSwipeCell
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
      </PressSwipeCell>
    </demo-block>

    <demo-block
      :title="t('beforeClose')"
      section-style="margin:0;"
    >
      <PressSwipeCell
        ref="asyncSwipeCell"
        :right-width="65"
        :left-width="65"
        :async-close="true"
        @click="onClick"
        @close="onAsyncClose"
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
      </PressSwipeCell>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressDialog
      id="press-dialog"
      ref="press-dialog"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import { showConfirmDialog } from 'press-ui/press-dialog';
import PressDialog from 'press-ui/press-dialog/press-dialog.vue';
import PressSwipeCell from 'press-ui/press-swipe-cell/press-swipe-cell.vue';


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
    PressDialog,
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
    onOpen(detail) {
      console.log('onOpen.detail', detail);
      this.onGTip(`[open] position: ${detail.position}`);
    },
    onAsyncClose(detail) {
      console.log('onAsyncClose.detail', detail);
      const tryClose = () => {
        // #ifdef MP-TOUTIAO
        this.$refs.asyncSwipeCell?.close();
        // #endif
        instance?.close();
      };
      const { position, instance } = detail;
      switch (position) {
        case 'left':
        case 'cell':
          tryClose();
          break;
        case 'right':
          showConfirmDialog({
            context: this,
            title: '确定删除吗？',
          })
            .then(() => {
              console.log('close');
              tryClose();
            })
            .catch((err) => {
              console.log('err', err);
            });
          break;
      }
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

