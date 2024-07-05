<template>
  <div
    class="demo-wrap"
    :class="curGameClass"
  >
    <div class="component-wrap">
      <PressActStoreItem
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :props-data="PROPS_DATA"
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
import PressActStoreItem from 'press-ui/press-act-store-item/press-act-store-item.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-store-item/demo-helper/style-list';
import ActDemo from 'src/pages/components/act-demo/act-demo.vue';

const PROPS_DATA = {
  logo: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/0958e81e-3738-35ab-deb8-b9870007c46e',
  name: '深圳市宝安区新湖路店',
  distance: '500m',
  address: '深圳市宝安区新湖路99号壹方城F1 3008号商铺',
  privgrade: 2, // 1 or 2 or empty
  // state: 'lately',
  // state: 'instore',
  state: 'eventbeen',
  status: '状态',
};

export default {
  components: {
    PressActStoreItem,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActStoreItem', STYLE_LIST, 'gp'),
  ],
  data() {
    return {
      PROPS_DATA,
    };
  },

  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
.component-wrap {
  margin: 20px 0 50px;
}
</style>
