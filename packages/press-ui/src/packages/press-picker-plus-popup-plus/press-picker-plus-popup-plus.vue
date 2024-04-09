<template>
  <PressPopupPlus
    :show="show"
    position="bottom"
    :z-index="zIndex"
    :close-on-click-overlay="closeOnClickOverlay"
    @click-overlay="clickOverlay"
    @close="cancel"
  >
    <PressPickerPlus
      ref="picker"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @change="onChange"
      @cancel="cancel"
      @confirm="confirm"
    />
  </PressPopupPlus>
</template>
<script>
import PressPopupPlus from '../press-popup-plus/press-popup-plus.vue';
import PressPickerPlus from '../press-picker-plus/press-picker-plus.vue';
import { pickerProps } from '../press-picker-plus/shared';


export default {
  name: 'PressPickerPlusPopupPlus',
  components: {
    PressPopupPlus,
    PressPickerPlus,
  },
  props: {
    ...pickerProps,
    show: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    defaultIndex: {
      type: Number,
      default: 0,
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
    cancel(...args) {
      this.$emit('cancel', ...args);
    },
    confirm(...args) {
      this.$emit('confirm', ...args);
    },
    clickOverlay() {
      this.$emit('click-overlay');
    },
    onChange(...args) {
      this.$emit('change', ...args);
    },
  },
};
</script>
