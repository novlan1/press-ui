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
      <PressActGetAwardDialog
        :show.sync="show"
        :hide-tip-style="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :hide-base-style="customStyle !== CUSTOM_STYLE_DEFAULT"
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
import PressActGetAwardDialog from 'press-ui/press-act-get-award-dialog/press-act-get-award-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-get-award-dialog/demo-helper/style-list';


export default {
  components: {
    PressActGetAwardDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActGetAwardDialog', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
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
