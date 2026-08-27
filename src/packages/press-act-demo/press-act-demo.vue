<template>
  <div class="press-act-demo">
    <PressDemoBlock
      v-if="showBasicUsage"
      :title="t('basicUsage')"
    >
      <PressCell
        v-for="(item, index) of innerDemoList"
        :key="index"
        :title="item.title"
        is-link
        @click="onShowDialog(item)"
      />
    </PressDemoBlock>

    <PressDemoBlock
      :title="t('custom')"
    >
      <PressCell
        title="样式类型"
        is-link
        :value="customStyleStr"
        @click="onCustom"
      />

      <!-- #ifdef H5 -->
      <PressToggleHeader />
      <!-- #endif -->

      <PressCell
        title="隐藏Tip样式"
        center
        :border="false"
      >
        <template #right-icon>
          <PressSwitch
            custom-class="press-switch--e-sport"
            :checked="hideTipStyle"
            @change="$emit('update:hideTipStyle', !hideTipStyle)"
          />
        </template>
      </PressCell>

      <PressCell
        title="使用Tip类名"
        center
        :border="false"
      >
        <template #right-icon>
          <PressSwitch
            custom-class="press-switch--e-sport"
            :checked="useTipClass"
            @change="$emit('update:useTipClass', !useTipClass)"
          />
        </template>
      </PressCell>

      <slot name="custom" />
    </PressDemoBlock>

    <slot />
  </div>
</template>
<script>
import { getHideHeaderMixin } from '../mixins/hide-header/index';
import PressCell from '../press-cell/press-cell.vue';
import PressDemoBlock from '../press-demo-block/press-demo-block.vue';

import PressSwitch from '../press-switch/press-switch.vue';
import PressToggleHeader from '../press-toggle-header/press-toggle-header.vue';


export default {
  name: 'PressActDemo',
  i18n: {
    'zh-CN': {
      show: '显示',
      hideHead: '隐藏',
      showHead: '显示',
    },
    'en-US': {
      show: 'Show',
      hideHead: 'Hide',
      showHead: 'Show',
    },
  },
  components: {
    PressSwitch,
    PressCell,
    PressToggleHeader,
    PressDemoBlock,
  },
  mixins: [
    getHideHeaderMixin(),
  ],
  props: {
    customStyleStr: {
      type: String,
      default: '',
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    showBasicUsage: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    demoList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
    };
  },
  computed: {
    innerDemoList() {
      const { demoList } = this;
      const list = demoList.length ? demoList : [{ title: this.t('show') }];
      return list;
    },
  },
  methods: {
    onCustom() {
      this.$emit('onCustom');
    },
    onShowDialog(item) {
      this.$emit('update:show', true, item);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
