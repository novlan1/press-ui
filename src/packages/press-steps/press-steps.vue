<template>
  <div class="press-steps-index">
    <div :class="stepsClass">
      <div class="press-step__wrapper">
        <div
          v-for="(item,index) in (steps)"
          :key="index"
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
            <div :class="['press-step__desc', descClass]">
              {{ item.desc }}
            </div>
          </div>
          <div class="press-step__circle-container">
            <template v-if="index !== active">
              <PressIcon
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

            <PressIcon
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
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { GREEN, GRAY_DARK } from '../common/constant/color';
import utils from '../common/utils/utils';

import PressIcon from '../press-icon/press-icon.vue';

import status from './index-status';


export default {
  name: 'PressSteps',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
  },
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
    descClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: ['click-step'],
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
<style scoped lang="scss" src="./css/index.scss">
</style>
