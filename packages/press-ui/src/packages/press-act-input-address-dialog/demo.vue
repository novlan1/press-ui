<template>
  <div
    class="demo-wrap"
    :class="curGameClass"
  >
    <ActDemo
      :custom-style-str="styleMap[customStyle].label"
      :show.sync="show"
      :hide-tip-style.sync="hideTipStyle"
      :use-tip-class.sync="useTipClass"
      @onCustom="onCustom"
    >
      <PressActInputAddressDialog
        :show.sync="show"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :props-data.sync="propsData"
        @clickButton="clickButton"
      />
    </ActDemo>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />

    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import ActDemo from 'src/pages/components/act-demo/act-demo.vue';
import PressActInputAddressDialog from 'press-ui/press-act-input-address-dialog/press-act-input-address-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-input-address-dialog/demo-helper/style-list';

const PROPS_DATA = {
  name: '名字',
  mobile: '123456789',
  zipcode: '888888',
  district: '地区1',
  detail_addr: '详细地址:',
  province: '',
  city: '',
};

export default {
  components: {
    PressActInputAddressDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActInputAddressDialog', STYLE_LIST, 'pvp-vertical'),
  ],
  data() {
    return {
      show: true,
      propsData: PROPS_DATA,
    };
  },

  mounted() {
  },
  methods: {
    clickButton() {
      console.log('[clickButton]', this.propsData);
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
