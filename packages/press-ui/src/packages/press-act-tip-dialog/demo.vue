<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(item, index) of dialogTypeList"
      :key="index"
      :title="item.title"
    >
      <press-cell
        v-for="(info) of item.list"
        :key="info.name"
        :title="info.title"
        is-link
        @click="onShowDialog(info.name)"
      />
    </demo-block>

    <PressActTipDialog
      :show="show"
      :title="title"
      :message="message"
      :show-cancel-button="showCancelButton"
      :show-confirm-button="showConfirmButton"
      :cancel-button-text="cancelButtonText"
      :confirm-button-text="confirmButtonText"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import PressActTipDialog from 'src/packages/press-act-tip-dialog/press-act-tip-dialog.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';


export default {
  name: 'ActTipDialog',
  i18n: {
    'zh-CN': {
      oneButton: '提示弹窗',
      twoButtons: '确认弹窗',
    },
    'en-US': {
      oneButton: 'Prompt Dialog',
      twoButtons: 'Confirm Dialog',
    },
  },
  components: {
    PressActTipDialog,
    PressCell,
  },
  data() {
    return {
      show: true,
      title: this.t('dialog.title'),
      message: 'Some Tips',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: this.t('cancel'),
      confirmButtonText: this.t('confirm'),
      dialogTypeList: [
        {
          title: this.t('basicUsage'),
          list: [
            {
              name: 'one',
              title: this.t('oneButton'),
            },
            {
              name: 'two',
              title: this.t('twoButtons'),
            },
          ],
        },
      ],
    };
  },
  methods: {
    cancel(show) {
      this.show = !show;
    },
    confirm(show) {
      this.show = !show;
    },

    onShowDialog(type) {
      if (type === 'two') {
        this.showCancelButton = true;
        this.show = true;
        return;
      }

      if (type === 'one') {
        this.showCancelButton = false;
        this.show = true;
        return;
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
