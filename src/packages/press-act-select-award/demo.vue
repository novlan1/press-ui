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
      <PressActSelectAward
        :show.sync="show"
        :list="MOCK_AWARD_LIST"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        @clickCloseButton="clickCloseButton"
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
import PressActSelectAward from 'src/packages/press-act-select-award/press-act-select-award.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-select-award/demo-helper/style-list';

const MOCK_AWARD_LIST = [{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币1',
  leftGiftTips: 'leftGiftTips',
  leftGiftCount: 5,
},
{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币2',
  leftGiftTips: 'leftGiftTips',
},
{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币3',
  leftGiftTips: 'leftGiftTips',
}];

export default {
  components: {
    PressActSelectAward,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActSelectAward', STYLE_LIST, 'pvp-vertical'),
  ],
  data() {
    return {
      show: true,
      MOCK_AWARD_LIST,
    };
  },

  mounted() {
  },
  methods: {
    clickCloseButton() {
      this.onGTip('[clickCloseButton]');
      this.show = false;
    },
    clickButton(item) {
      console.log('[clickButton]', item);
      this.onGTip('[clickButton]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
