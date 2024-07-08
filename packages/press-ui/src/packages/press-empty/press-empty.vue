<template>
  <div
    class="press-empty"
    :class="emptyClass"
    :style="customStyle"
  >
    <press-icon
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
          :style="imageCustomStyle"
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
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import PressIcon from '../press-icon/press-icon.vue';

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
      type: String,
      default: '',
    },
    customStyle: {
      type: String,
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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: $empty-padding;

  &__image {
    width: $empty-image-size;
    height: $empty-image-size;

    // 【修改点】增加水平垂直居中，方便用户传入自定义图片
    display: flex;
    align-items: center;
    justify-content: center;

    &:empty {
      display: none;
    }

    &__img {
      width: 100%;
      height: 100%;
    }
  }

  &__image:not(:empty) + &__image {
    display: none;
  }

  &__description {
    margin-top: $empty-description-margin-top;
    padding: $empty-description-padding;
    color: $empty-description-color;
    font-size: $empty-description-font-size;
    color: $color-gray-4;
    line-height: $empty-description-line-height;
    text-align: center;

    &:empty {
      display: none;
    }
  }

  &__description:not(:empty) + &__description {
    display: none;
  }

  &__bottom {
    margin-top: $empty-bottom-margin-top;
  }
}
</style>
<style scoped lang="scss" src="./css/index.scss">
</style>
