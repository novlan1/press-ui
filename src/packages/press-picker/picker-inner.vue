<template>
  <PressPopup
    :close-icon="!arrowIcon"
    :show-back-arrow="arrowIcon"
    :title="title"
    :button="t('picker.confirm')"
    mode="white"
    :horizontal="horizontal"
    :width-number="54"
    popup-class="press-popup-picker"
    :class="tip ? 'press-picker__tip' : ''"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <div
      v-if="tip"
      class="press-picker--tip"
    >
      {{ tip }}
    </div>
    <PressPickerView
      ref="picker"
      :data="data"
      :has-tip="!!tip"
      :current="current"
      :horizontal="horizontal"
      :virtual-list-threshold="virtualListThreshold"
      @currentIndexChanged="onCurrentIndexChanged"
    />
  </PressPopup>
</template>
<script>
import PressPopup from '../press-popup/press-popup.vue';
import PressPickerView from '../press-picker-view/press-picker-view.vue';
import { t } from '../locale';

export default {
  components: {
    PressPopup,
    PressPickerView,
  },
  props: {
    // 弹窗标题
    title: {
      type: String,
      default: '',
      required: false,
    },
    // 左上角是否显示为返回箭头
    arrowIcon: {
      type: Boolean,
      default: false,
    },
    // 提示
    tip: {
      type: String,
      default: '',
      required: false,
    },
    // 列表数据
    // [{label: '文本', value: '值'}]
    data: {
      type: Array,
      default: () => ([]),
      required: true,
    },
    current: {
      type: Object,
      default: null,
      required: false,
    },
    virtualListThreshold: {
      type: Number,
      default: 50,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  emits: ['onSelect', 'onCancel'],
  data() {
    return {
      currentIndex: -1,
    };
  },
  mounted() {
  },
  methods: {
    t,
    onCurrentIndexChanged(index) {
      this.currentIndex = index;
    },
    onConfirm() {
      if (this.$refs?.picker) {
        this.$emit('onSelect', this.$refs.picker.getCurrentItem());
      } else {
        this.$emit('onSelect', this.data?.[this.currentIndex]);
      }
    },
    onCancel() {
      this.$emit('onCancel');
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
