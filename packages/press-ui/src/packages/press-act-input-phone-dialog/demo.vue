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
      <PressActInputPhoneDialog
        :show.sync="show"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :is-agree-protocol.sync="isAgreeProtocol"
        :need-phone-check="true"
        protocol-name="Press UI 协议"
        @clickButton="clickButton"
        @clickProtocol="clickProtocol"
        @clickUserProtocol="clickUserProtocol"
        @clickCloseButton="clickCloseButton"
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
import PressActInputPhoneDialog from 'press-ui/press-act-input-phone-dialog/press-act-input-phone-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-input-phone-dialog/demo-helper/style-list';


export default {
  components: {
    PressActInputPhoneDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActInputPhoneDialog', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
      isAgreeProtocol: false,
    };
  },

  mounted() {
  },
  methods: {
    clickButton() {
      this.onGTip('[clickButton]');
    },
    clickProtocol() {
      this.onGTip('[clickProtocol]');
    },
    clickUserProtocol() {
      this.onGTip('[clickUserProtocol]');
    },
    clickCloseButton() {
      this.onGTip('[clickCloseButton]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
