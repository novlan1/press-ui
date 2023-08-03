<template>
  <div
    class="press-empty"
    :class="customClass"
  >
    <press-icon
      v-if="isESportType"
      type="empty"
      color="#bfc3e1"
      custom-class="customClass"
      size="30"
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

const E_SPORT_TYPE = 'e-sport';

export default {
  name: 'PressEmpty',
  components: {
    PressIcon,
  },
  options: {
    ...defaultOptions,
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
    ...defaultProps,
  },
  data() {
    return {
      computed,
    };
  },
  computed: {
    isESportType() {
      return this.type === E_SPORT_TYPE;
    },
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

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

.customClass {
  font-size: 0.8vmin;
  color: $color-gray-4;
  min-height: 0.84vmin;
}
</style>
