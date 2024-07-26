<template>
  <div class="press-act-demo">
    <PressDemoBlock
      v-if="showBasicUsage"
      :title="t('basicUsage')"
    >
      <press-cell
        :title="t('show')"
        is-link
        @click="onShowDialog"
      />
    </PressDemoBlock>

    <PressDemoBlock
      :title="t('custom')"
    >
      <press-cell
        title="样式类型"
        is-link
        :value="customStyleStr"
        @click="onCustom"
      />

      <!-- #ifdef H5 -->
      <PressToggleHeader />
      <!-- #endif -->

      <press-cell
        title="隐藏Tip样式"
        center
        :border="false"
      >
        <template #right-icon>
          <press-switch
            custom-class="press-switch--e-sport"
            :checked="hideTipStyle"
            @change="$emit('update:hideTipStyle', !hideTipStyle)"
          />
        </template>
      </press-cell>

      <press-cell
        title="使用Tip类名"
        center
        :border="false"
      >
        <template #right-icon>
          <press-switch
            custom-class="press-switch--e-sport"
            :checked="useTipClass"
            @change="$emit('update:useTipClass', !useTipClass)"
          />
        </template>
      </press-cell>

      <slot name="custom" />
    </PressDemoBlock>

    <slot />
  </div>
</template>
<script>
import PressSwitch from '../press-switch/press-switch.vue';
import PressCell from '../press-cell/press-cell.vue';
import PressToggleHeader from '../press-toggle-header/press-toggle-header.vue';
import PressDemoBlock from '../press-demo-block/press-demo-block.vue';
import { getHideHeaderMixin } from '../mixins/hide-header/index';


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
  },
  data() {
    return {
    };
  },
  methods: {
    onCustom() {
      this.$emit('onCustom');
    },
    onShowDialog() {
      this.$emit('update:show', true);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
