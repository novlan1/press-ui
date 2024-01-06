<template>
  <div>
    <demo-block
      v-if="showBasicUsage"
      :title="t('basicUsage')"
    >
      <press-cell
        :title="t('show')"
        is-link
        @click="onShowDialog"
      />
    </demo-block>

    <demo-block
      :title="t('custom')"
    >
      <press-cell
        title="样式类型"
        is-link
        :value="customStyleStr"
        @click="onCustom"
      />

      <!-- #ifdef H5 -->
      <ToggleHeader />
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
    </demo-block>

    <slot />
  </div>
</template>
<script>
import PressSwitch from '../../../packages/press-switch/press-switch.vue';
import { getHideHeaderMixin } from '../../../utils/mixin/hide-header';


export default {
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
