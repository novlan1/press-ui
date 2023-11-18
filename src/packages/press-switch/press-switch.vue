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
      <press-loading
        v-if="loading"
        :color="loadingColor"
        custom-class="press-switch__loading"
      />
    </div>
  </div>
</template>
<script>
import PressLoading from '../press-loading-plus/press-loading-plus.vue';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

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
  // classes: ['node-class'],
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
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-switch {
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: var(--switch-width, $switch-width);
  height: var(--switch-height, $switch-height);
  background-color: var(--switch-background-color, $switch-background-color);
  border: var(--switch-border, $switch-border);
  border-radius: var(--switch-node-size, $switch-node-size);
  transition: background-color
    var(--switch-transition-duration, $switch-transition-duration);

  &__node {
    position: absolute;
    top: var(--switch-node-top, $switch-node-top);
    left: var(--switch-node-left, $switch-node-left);
    border-radius: 100%;
    z-index: var(--switch-node-z-index, $switch-node-z-index);
    width: var(--switch-node-size, $switch-node-size);
    height: var(--switch-node-size, $switch-node-size);
    background-color: var(
      --switch-node-background-color,
      $switch-node-background-color
    );
    box-shadow: var(--switch-node-box-shadow, $switch-node-box-shadow);
    transition: var(--switch-transition-duration, $switch-transition-duration)
      cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  ::v-deep &__loading {
    position: absolute !important;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
  }

  &--on {
    background-color: var(
      --switch-on-background-color,
      $switch-on-background-color
    );

    .press-switch__node {
      transform: translateX(
        calc(
          var(--switch-width, $switch-width) -
            var(--switch-node-size, $switch-node-size) -
            var(--switch-node-left, $switch-node-left) * 2
        )
      );
    }
  }

  &--disabled {
    opacity: var(--switch-disabled-opacity, $switch-disabled-opacity);
  }
}
</style>
<style scoped lang="scss">
// 【修改点】适配e-sport
.press-switch--e-sport {
  --switch-width: 0.88rem;
  --switch-height: 0.48rem;
  --switch-border: none;

  --switch-on-background-color: #5bbdfa;
  --switch-background-color: #dfe2ea;

  --switch-node-size: 0.4rem;
  --switch-node-top: 0.04rem;
  --switch-node-left: 0.04rem;
}
</style>
