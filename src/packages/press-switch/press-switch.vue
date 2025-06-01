<template>
  <div
    :class="switchClass"
    :style="switchStyle"
    @click.stop="onClick"
  >
    <div
      class="press-switch__node "
      :class="nodeClass"
    >
      <PressLoading
        v-if="loading"
        :color="loadingColor"
        custom-class="press-switch__loading"
      />
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';

import PressLoading from '../press-loading/press-loading.vue';

import computed from './computed';


export default {
  name: 'PressSwitch',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressLoading,
  },
  field: true,
  props: {
    open: { type: [Boolean, null], default: null },
    checked: { type: Boolean, default: false },
    loading: Boolean,
    disabled: Boolean,
    activeColor: { type: String, default: '' },
    inactiveColor: { type: String, default: '' },
    size: {
      type: String,
      default: '30',
    },
    activeValue: {
      type: Boolean,
      default: true,
    },
    inactiveValue: {
      type: Boolean,
      default: false,
    },
    nodeClass: { type: String, default: '' },
    ...defaultProps,
  },
  emits: ['click', 'input', 'change', 'onSwitchChange'],
  computed: {
    realChecked() {
      const { open, checked } = this;
      if (typeof open === 'boolean') {
        return open;
      }
      return checked;
    },
    switchClass() {
      const { realChecked, activeValue, disabled, customClass } = this;
      return `${utils.bem2('switch', { on: realChecked === activeValue, disabled })} ${customClass}`;
    },
    switchStyle() {
      const { size, realChecked, activeColor, inactiveColor, activeValue } = this;
      return computed.rootStyle({ size, checked: realChecked, activeColor, inactiveColor, activeValue });
    },
    loadingColor() {
      const { realChecked, activeColor, inactiveColor, activeValue } = this;
      return computed.loadingColor({ checked: realChecked, activeColor, inactiveColor, activeValue });
    },
  },
  methods: {
    onClick() {
      const { activeValue, inactiveValue, disabled, loading } = this;
      const checked = this.realChecked === activeValue;
      const value = checked ? inactiveValue : activeValue;

      this.$emit('click', checked);
      if (disabled || loading) {
        return;
      }

      this.$emit('input', value);
      this.$emit('change', value);

      // 兼容之前的switch
      this.$emit('onSwitchChange', value);
    },
  },
};


</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
<style scoped lang="scss" src="./css/e-sport.scss">
</style>
