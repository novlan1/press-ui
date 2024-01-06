<template>
  <press-cell
    title="显示头部"
    center
    :border="false"
  >
    <template #right-icon>
      <press-switch
        custom-class="press-switch--e-sport"
        :checked="showHeader"
        @change="onToggleShowHeader"
      />
    </template>
  </press-cell>
</template>
<script>
import PressSwitch from '../../../packages/press-switch/press-switch.vue';
import { getHideHeaderMixin } from '../../../utils/mixin/hide-header';


export default {
  components: {
    PressSwitch,
  },
  mixins: [
    getHideHeaderMixin(),
  ],
};
</script>
