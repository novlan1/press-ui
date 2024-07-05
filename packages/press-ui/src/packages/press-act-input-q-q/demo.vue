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
      <PressActInputQQ
        :show.sync="show"
        :qqnumber.sync="qqNumber"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
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
import PressActInputQQ from 'press-ui/press-act-input-q-q/press-act-input-q-q.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-input-q-q/demo-helper/style-list';


export default {
  components: {
    PressActInputQQ,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActInputQQ', STYLE_LIST, 'pvp-vertical'),
  ],
  data() {
    return {
      show: true,
      qqNumber: '1',
    };
  },

  mounted() {
  },
  methods: {
    clickButton() {
      this.onGTip('[clickButton]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
