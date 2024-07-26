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
import PressSwitch from '../press-switch/press-switch.vue';
import PressCell from '../press-cell/press-cell.vue';
import { getHideHeaderMixin } from '../mixins/hide-header/index';


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
