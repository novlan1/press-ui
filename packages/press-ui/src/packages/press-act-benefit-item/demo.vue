<template>
  <div
    class="demo-wrap"
    :class="curGameClass"
  >
    <div class="component-wrap">
      <PressActBenefitItem
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        @clickGiftDetail="clickGiftDetail"
        @clickGetTaskReward="clickGetTaskReward"
        @clickMerc="clickMerc"
      />
    </div>

    <ActDemo
      :custom-style-str="styleMap[customStyle].label"
      :hide-tip-style.sync="hideTipStyle"
      :use-tip-class.sync="useTipClass"
      :show-basic-usage="false"
      @onCustom="onCustom"
    />

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
import PressActBenefitItem from 'press-ui/press-act-benefit-item/press-act-benefit-item.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-benefit-item/demo-helper/style-list';
import ActDemo from 'src/pages/components/act-demo/act-demo.vue';


export default {
  components: {
    PressActBenefitItem,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActBenefitItem', STYLE_LIST, 'pvp-vertical'),
  ],
  data() {
    return {
    };
  },

  mounted() {
  },
  methods: {
    clickGiftDetail() {
      this.onGTip('[clickGiftDetail]');
    },
    clickGetTaskReward() {
      this.onGTip('[clickGetTaskReward]');
    },
    clickMerc() {
      this.onGTip('[clickMerc]');
    },
  },
};
</script>
<style scoped lang="scss">
.component-wrap {
  margin: 20px 0 50px;
}
</style>
