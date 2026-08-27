<template>
  <PressCell
    title="显示头部"
    center
    :border="false"
  >
    <template #right-icon>
      <PressSwitch
        custom-class="press-switch--e-sport"
        :checked="showHeader"
        @change="onToggleShowHeader"
      />
    </template>
  </PressCell>
</template>
<script>
import { getHideHeaderMixin } from '../mixins/hide-header/index';
import PressCell from '../press-cell/press-cell.vue';
import PressSwitch from '../press-switch/press-switch.vue';


export default {
  name: 'PressToggleHeader',
  components: {
    PressSwitch,
    PressCell,
  },
  mixins: [
    getHideHeaderMixin(),
  ],
};
</script>
