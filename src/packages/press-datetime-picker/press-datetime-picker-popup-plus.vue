<template>
  <PressPopupPlus
    :show="show"
    :z-index="zIndex"
    position="bottom"
    :close-on-click-overlay="closeOnClickOverlay"
    @click-overlay="clickOverlay"
    @close="cancel"
  >
    <PressDatetimePicker
      :value="datetimePicker.value"
      :show-toolbar="datetimePicker.showToolbar || false"
      :item-height="datetimePicker.itemHeight || 56"
      :type="datetimePicker.type || 'datetime'"
      :max-date="datetimePicker.maxDate"
      :min-date="datetimePicker.minDate"
      :immediate-check="datetimePicker.immediateCheck"
      :title="datetimePicker.title || ''"
      :formatter="formatter"
      :filter="filter"
      @input="input"
      @cancel="cancel"
      @confirm="confirm"
    />
  </PressPopupPlus>
</template>
<script>
import PressPopupPlus from '../press-popup-plus/press-popup-plus.vue';
import PressDatetimePicker from './press-datetime-picker.vue';
import { defaultFormatter } from './helper';


export default {
  name: 'PressDatetimePickerPopupPlus',
  components: {
    PressPopupPlus,
    PressDatetimePicker,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    datetimePicker: {
      type: Object,
      default: () => ({}),
    },
    // 不可通过 datetimePicker.formatter 传入，小程序下，JSON 序列化时会被去掉
    formatter: {
      type: [Function, null],
      default: defaultFormatter,
    },
    filter: {
      type: [Function, null],
      default: null,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    cancel(...args) {
      this.$emit('cancel', ...args);
    },
    confirm(...args) {
      this.$emit('confirm', ...args);
    },
    clickOverlay() {
      this.$emit('click-overlay');
    },
  },
};
</script>
