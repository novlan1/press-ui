<template>
  <div
    class="press-empty"
    :class="emptyClass"
    :style="wrapStyle"
  >
    <PressIcon
      v-if="isESportType"
      type="empty"
      size="10.66667vmin"
      custom-class="press-icon--e-sport"
    />

    <div
      v-else-if="isHor"
      class="press-empty__icon--hor"
    />

    <template v-else>
      <div class="press-empty__image">
        <slot name="image" />
      </div>
      <div class="press-empty__image">
        <img
          v-if="image"
          class="press-empty__image__img"
          :src="computed.imageUrl(image)"
          :style="innerImageCustomStyle"
        >
      </div>
    </template>

    <div class="press-empty__description">
      <slot name="description" />
    </div>

    <div class="press-empty__description">
      {{ description }}
    </div>

    <div class="press-empty__bottom">
      <slot />
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { style } from '../common/utils/style';
import PressIcon from '../press-icon/press-icon.vue';

import computed from './computed';


const EXTRA_TYPE_MAP = {
  E_SPORT: 'e-sport',
  HOR: 'hor',
};

export default {
  name: 'PressEmpty',
  components: {
    PressIcon,
  },
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  props: {
    description: { type: String, default: '' },
    type: { type: String, default: '' },
    image: {
      type: String,
      default: 'default',
    },
    imageCustomStyle: {
      type: [String, Object],
      default: '',
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      computed,
    };
  },
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
    innerImageCustomStyle() {
      return style(this.imageCustomStyle);
    },
    isESportType() {
      return this.type === EXTRA_TYPE_MAP.E_SPORT;
    },
    isHor() {
      return this.type === EXTRA_TYPE_MAP.HOR;
    },
    emptyClass() {
      const { isESportType, customClass, isHor } = this;

      return [
        isESportType ? 'press-empty--e-sport' : '',
        isHor ? 'press-empty--hor' : '',
        customClass,
      ].join(' ');
    },
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
