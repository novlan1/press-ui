<template>
  <PickerInner
    :data="selectList"
    :current="selectItem"
    :title="title"
    :show-back-arrow="showBackArrow"
    :tip="tip"
    @onCancel="remove"
    @onSelect="onClickSelect"
  />
</template>

<script>
import PickerInner from './picker-inner.vue';
export default {
  name: 'TipMatchSelectListDialog',
  components: {
    PickerInner,
  },
  props: {
    // 左上角是否显示为返回箭头
    showBackArrow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    // 数据列表
    selectList: {
      type: Array,
      default: () => [], // 默认值不要给null，报错
      required: false,
    },
    selectItem: {
      type: Object,
      default: null,
      required: false,
    },
    // 提示
    tip: {
      type: String,
      default: '',
      required: false,
    },
    onClickConfirm: {
      type: Function,
      default: null,
      required: false,
    },
    onRemove: {
      type: Function,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      isDialogShow: false,
    };
  },
  mounted() {
    this.showDialog();
  },
  methods: {
    // 弹出messageBox,并创建promise对象
    showDialog() {
      this.isDialogShow = true;
    },
    onClickSelect(item) {
      this.$emit('onClickConfirm', item);
      if (this.onClickConfirm) {
        this.onClickConfirm(item);
      }
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    remove() {
      this.$emit('onRemove');
      if (this.onRemove) {
        this.onRemove();
      }
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    destroy() {
      this.$destroy();

      // #ifdef H5
      if (document.body.contains(this.$el)) {
        this.$el?.parentElement?.removeChild?.(this.$el);
        // document.body.removeChild(this.$el);
      }
      // #endif
    },

  },
};
</script>

<style scoped>
</style>
