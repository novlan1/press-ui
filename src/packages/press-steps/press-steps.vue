<template>
  <div class="press-steps-index">
    <div :class="stepsClass">
      <div class="press-step__wrapper">
        <div
          v-for="(item,index) in (steps)"
          :key="item.index"
          :data-index="index"
          :class="true ? getStepClass(index) : ''"
          :style="true ? getStepStyle(index) : ''"
          @click="onClick"
        >
          <div
            class="press-step__title"
            :style="index === active ? 'color: ' + activeColor : ''"
          >
            <div>{{ item.text }}</div>
            <div class="desc-class">
              {{ item.desc }}
            </div>
          </div>
          <div class="press-step__circle-container">
            <template v-if="index !== active">
              <press-icon-plus
                v-if="item.inactiveIcon || inactiveIcon"
                :color="status(index, active) === 'inactive' ? inactiveColor: activeColor"
                :name="item.inactiveIcon || inactiveIcon"
                custom-class="press-step__icon"
              />
              <div
                v-else
                class="press-step__circle"
                :style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
              />
            </template>

            <press-icon-plus
              v-else
              :name="item.activeIcon || activeIcon"
              :color="activeColor"
              custom-class="press-step__icon"
            />
          </div>
          <div
            v-if="index !== steps.length - 1"
            class="press-step__line"
            :style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { GREEN, GRAY_DARK } from '../common/constant/color';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import status from './index-status';

export default {
  name: 'PressSteps',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
  },
  classes: ['desc-class'],
  props: {
    icon: { type: String, default: '' },
    steps: { type: Array, default: () => [] },
    active: { type: Number, default: -1 },
    direction: {
      type: String,
      default: 'horizontal',
    },
    activeColor: {
      type: String,
      default: GREEN,
    },
    inactiveColor: {
      type: String,
      default: GRAY_DARK,
    },
    activeIcon: {
      type: String,
      default: 'checked',
    },
    inactiveIcon: { type: String, default: '' },
    ...defaultProps,
  },
  data() {
    return {
      status,
    };
  },
  computed: {
    stepsClass() {
      const { direction, customClass } = this;
      return `${customClass} ${utils.bem2('steps', [direction])}`;
    },
  },
  methods: {
    onClick(event) {
      const { index } = event.currentTarget.dataset;
      this.$emit('click-step', index);
    },
    getStepClass(index) {
      const { direction, active } = this;
      return `${utils.bem2('step', [direction, status(index, active)])} press-hairline`;
    },
    getStepStyle(index) {
      const { active, inactiveColor } = this;
      return status(index, active) === 'inactive' ? `color: ${inactiveColor}` : '';
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-steps {
  overflow: hidden;
  background-color: var(--steps-background-color, $steps-background-color);

  &--horizontal {
    padding: 10px;

    .press-step__wrapper {
      position: relative;
      display: flex;
      overflow: hidden;
    }
  }

  &--vertical {
    padding-left: 10px;

    .press-step__wrapper {
      padding: 0 0 0 20px;
    }
  }
}

.press-step {
  position: relative;
  flex: 1;
  font-size: var(--step-font-size, $step-font-size);
  color: var(--step-text-color, $step-text-color);

  &--finish {
    color: var(--step-finish-text-color, $step-finish-text-color);
  }

  &__circle {
    border-radius: 50%;
    width: var(--step-circle-size, $step-circle-size);
    height: var(--step-circle-size, $step-circle-size);
    background-color: var(--step-circle-color, $step-circle-color);
  }

  &--horizontal {
    padding-bottom: 14px;

    &:first-child {
      .press-step__title {
        transform: none;
      }

      .press-step__circle-container {
        padding: 0 8px 0 0;
        transform: translate3d(0, 50%, 0);
      }
    }

    &:last-child {
      position: absolute;
      right: 0;
      width: auto;

      .press-step__title {
        text-align: right;
        transform: none;
      }

      .press-step__circle-container {
        right: 0;
        padding: 0 0 0 8px;
        transform: translate3d(0, 50%, 0);
      }
    }

    .press-step__circle-container {
      position: absolute;
      bottom: 6px;
      z-index: 1;
      transform: translate3d(-50%, 50%, 0);
      background-color: $white;
      padding: 0 var(--padding-xs, $padding-xs);
    }

    .press-step__title {
      display: inline-block;
      transform: translate3d(-50%, 0, 0);
      font-size: var(
        --step-horizontal-title-font-size,
        $step-horizontal-title-font-size
      );
    }

    .press-step__line {
      position: absolute;
      right: 0;
      bottom: 6px;
      left: 0;
      height: 1px;
      transform: translate3d(0, 50%, 0);
      background-color: var(--step-line-color, $step-line-color);
    }

    &.press-step--process {
      color: var(--step-process-text-color, $step-process-text-color);

      .press-step__icon {
        display: block;
        line-height: 1;
        font-size: var(--step-icon-size, $step-icon-size);
      }
    }
  }

  &--vertical {
    padding: 10px 10px 10px 0;
    line-height: 18px;

    &::after {
      border-bottom-width: 1px;
    }

    &:last-child::after {
      border-bottom-width: none;
    }

    &:first-child {
      &::before {
        position: absolute;
        top: 0;
        left: -15px;
        z-index: 1;
        width: 1px;
        height: 20px;
        content: "";
        background-color: $white;
      }
    }

    .press-step__icon,
    .press-step__circle,
    .press-step__line {
      position: absolute;
      top: 19px;
      left: -14px;
      z-index: 2;
      transform: translate3d(-50%, -50%, 0);
    }

    .press-step__icon {
      line-height: 1;
      font-size: var(--step-icon-size, $step-icon-size);
    }

    .press-step__line {
      z-index: 1;
      width: 1px;
      height: 100%;
      transform: translate3d(-50%, 0, 0);
      background-color: var(--step-line-color, $step-line-color);
    }
  }
}
</style>
