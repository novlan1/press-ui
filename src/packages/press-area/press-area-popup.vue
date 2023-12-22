<template>
  <div>
    <PressPopupPlus
      v-if="!isESport"
      :show="show"
      position="bottom"
      @input="popupChanged"
    >
      <PressArea
        ref="pressArea"
        title="选择地区"
        :area-list="areaList"
        :value="value"
        @cancel="popupChanged(false)"
        @confirm="confirm"
      />
    </PressPopupPlus>

    <PressPopup
      v-else
      :is-show="show"
      button="确定"
      :close-icon="true"
      title="选择地区"
      @confirm="confirm"
      @cancel="popupChanged(false)"
    >
      <PressArea
        ref="pressArea"
        :area-list="areaList"
        :value="value"
        :show-toolbar="false"
      />
    </PressPopup>
  </div>
</template>
<script>
import PressPopup from '../press-popup/press-popup';
import PressPopupPlus from '../press-popup-plus/press-popup-plus';
import PressArea from './press-area';


export default {
  name: 'PressAreaPopup',
  components: {
    PressPopup,
    PressPopupPlus,
    PressArea,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    areaList: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    isESport() {
      return this.type === 'e-sport';
    },
  },
  methods: {
    popupChanged(val) {
      this.$emit('update:show', val);
    },
    confirm() {
      this.popupChanged(false);
      const values = this.$refs.pressArea.getValues();
      const indexes = this.$refs.pressArea.getIndexes();
      this.$emit('confirm', values, indexes);
    },
  },
};
</script>
