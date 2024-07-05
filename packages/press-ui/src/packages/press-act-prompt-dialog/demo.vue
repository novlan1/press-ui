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
      <PressActPromptDialog
        :show="show"
        :props-data="PROPS_DATA"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        @onClickCloseButton="onClickCloseButton"
        @onClickCancelButton="onClickCancelButton"
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
import PressActPromptDialog from 'press-ui/press-act-prompt-dialog/press-act-prompt-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-prompt-dialog/demo-helper/style-list';


const PROPS_DATA = {
  storePic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/87df22ce-af9a-9a40-a36e-462999144c68.png',
  storeName: '商户名称',
  content: '是否开启该商户的福利领取提醒？',
  subContent: '若你的战绩达到领取标准，会收到站内信通知哦',
  btnText: '立即开启',
  cancelBtnText: '以后再说',
  btnClass: 'tip-comp-dialog-sure',
  cancelBtnClass: '',
  hasHook: false,
  dialogClass: false,
  isGold: true,
};

export default {
  components: {
    PressActPromptDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActPromptDialog', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
      PROPS_DATA,
    };
  },
  methods: {
    onClickCloseButton() {
      this.onGTip('[onClickCloseButton]');
      this.show = false;
    },
    onClickCancelButton() {
      this.onGTip('[onClickCancelButton]');
      this.show = false;
    },
    clickButton() {
      this.onGTip('[clickButton]');
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
