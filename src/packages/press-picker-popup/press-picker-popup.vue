<template>
  <PressPopup
    :show="show"
    position="bottom"
    :z-index="zIndex"
    :close-on-click-overlay="closeOnClickOverlay"
    @click-overlay="clickOverlay"
    @close="cancel"
  >
    <PressPicker
      ref="picker"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      :title="title"
      :use-momentum="useMomentum"
      :swipe-duration="swipeDuration"
      @change="onChange"
      @cancel="cancel"
      @confirm="confirm"
    />
  </PressPopup>
</template>
<script>
import PressPicker from '../press-picker/press-picker.vue';
import { pickerProps } from '../press-picker/shared';
import PressPopup from '../press-popup/press-popup.vue';


export default {
  name: 'PressPickerPopup',
  components: {
    PressPopup,
    PressPicker,
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
    title: {
      type: String,
      default: '',
    },
    useMomentum: {
      type: Boolean,
      default: false,
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000,
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
