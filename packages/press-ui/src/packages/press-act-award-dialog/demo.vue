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
      <PressActAwardDialog
        sub-btn-text="订阅"
        :show.sync="show"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :issubscribe="isSubscribe"
        @clickSub="isSubscribe = !isSubscribe"
        @clickButton="show = false"
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
import PressActAwardDialog from 'press-ui/press-act-award-dialog/press-act-award-dialog.vue';
// import PressActAwardDialog from 'src/lib/act-award-dialog';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-award-dialog/demo-helper/style-list';
// import 'src/lib/lib-style/act-award-dialog.css';

export default {
  components: {
    PressActAwardDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActAwardDialog', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
      isSubscribe: true,
    };
  },

  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
</style>
