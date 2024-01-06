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
      <PressActModifyPhoneDialog
        :show.sync="show"
        :is-disable-get-code="isDisableGetCode"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        @clickButton="clickButton"
        @clickGetCodeButton="clickGetCodeButton"
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
import PressActModifyPhoneDialog from 'src/packages/press-act-modify-phone-dialog/press-act-modify-phone-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-modify-phone-dialog/demo-helper/style-list';


export default {
  components: {
    PressActModifyPhoneDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActModifyPhoneDialog', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
      isDisableGetCode: false,
    };
  },

  mounted() {
  },
  methods: {
    clickButton() {
      this.onGTip('[clickButton]');
    },
    clickGetCodeButton() {
      this.onGTip('[clickGetCodeButton]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
