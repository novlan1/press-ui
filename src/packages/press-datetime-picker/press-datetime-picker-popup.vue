<template>
  <div
    v-if="innerShow"
    class="press-datetime-picker-popup"
  >
    <PressPopup
      :show-title="getPropOrData('showTitle')"
      :close-icon="getPropOrData('closeIcon')"
      :arrow-icon="getPropOrData('arrowIcon')"
      :title="getPropOrData('title')"
      :button="getPropOrData('button')"
      :border-button="getPropOrData('borderButton')"
      :z-index="getPropOrData('zIndex')"
      :popup-class="getPropOrData('popupClass')"
      :close-on-click-overlay="getPropOrData('closeOnClickOverlay')"
      :custom-style="getPropOrData('customStyle')"
      @confirm="confirm"
      @cancel="cancel"
    >
      <div class="press-datetime-picker-popup__picker">
        <PressDatetimePicker
          ref="picker"
          :value="getPropOrData('datetimePicker.value')"
          :show-toolbar="getPropOrData('datetimePicker.showToolbar') || false"
          :item-height="getPropOrData('datetimePicker.itemHeight') || 56"
          :type="getPropOrData('datetimePicker.type') || 'datetime'"
          :max-date="getPropOrData('datetimePicker.maxDate')"
          :min-date="getPropOrData('datetimePicker.minDate')"
          :immediate-check="immediateCheck"
          :formatter="timeFormatter"
          :filter="timeFilter"
          @input="onInput"
        />
      </div>

      <div
        v-if="tip"
        class="press-datetime-picker-popup__tip"
      >
        {{ tip }}
      </div>
    </PressPopup>
  </div>
</template>

<script>
import { functionalMixin } from '../mixins/functional';
import { PRESS_POPUP_CELL_PROPS } from '../press-popup-cell/computed';
import PressPopup from '../press-popup/press-popup.vue';

import PressDatetimePicker from './press-datetime-picker.vue';


let gThis;

const componentProps = {
  ...PRESS_POPUP_CELL_PROPS,
  datetimePicker: {
    type: Object,
    default: () => ({}),
  },
  tip: {
    type: String,
    default: '',
  },
};

export default {
  name: 'PressDatetimePickerPopup',
  options: {
    virtualHost: true,
  },
  components: {
    PressPopup,
    PressDatetimePicker,
  },
  mixins: [functionalMixin(componentProps)],
  props: {
  },
  emits: [],
  data() {
    return {
      currentValue: this.getPropOrData('datetimePicker.value'),
    };
  },
  computed: {
    immediateCheck() {
      const res = this.getPropOrData('datetimePicker.immediateCheck') || true;
      return res;
    },
  },
  watch: {
  },
  created() {
    gThis = this;
  },
  mounted() {
  },
  methods: {
    noop() {},
    emitEvent(action) {
      const params = { context: this, value: this.currentValue };
      this.$emit(action);
      this.promiseCallback(action, params);
    },
    confirm() {
      this.emitEvent('confirm');
    },
    cancel() {
      this.emitEvent('cancel');
    },
    onInput(value) {
      this.currentValue = value;
      this.getPropOrData('datetimePicker.input')?.(value);
    },
    timeFilter(type, values, current) {
      const result = gThis.getPropOrData('datetimePicker.filter') || null;
      if (result) {
        return result(type, values, current);
      }
      return values;
    },
    timeFormatter(type, value, current) {
      const result = gThis.getPropOrData('datetimePicker.formatter') || null;
      if (result) {
        return result(type, value, current);
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.press-datetime-picker-popup {
  &__picker {
  }
  &__tip {
  }
}
</style>
