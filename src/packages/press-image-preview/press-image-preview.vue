<template>
  <PressOverlay
    :show="innerShow"
    :custom-style="`background: rgba(0, 0, 0, 0.9);z-index: ${getPropOrData('zIndex')};`"
    @click="onClickOverlay"
  >
    <div
      class="press-image-preview"
      :style="imagePreviewStyle"
      :class="[getPropOrData('customClass')]"
    >
      <div
        v-if="getPropOrData('showIndex')"
        class="press-image-preview__index"
      >
        {{ active+1 }}/{{ getPropOrData('images').length }}
      </div>

      <div
        :class="[
          'press-image-preview__close-icon',
          `press-image-preview__close-icon--${getPropOrData('closeIconPosition')}`
        ]"
        @click.stop="onClose"
      >
        <PressIconPlus
          v-if="getPropOrData('closeable')"
          :name="getPropOrData('closeIcon')"
        />
      </div>

      <swiper
        class="press-image-preview__swipe"
        :current="active"
        @change="onChange"
      >
        <swiper-item
          v-for="(image, index) of getPropOrData('images')"
          :key="index"
          class="press-image-preview__swipe-item"
          @click="onClickSwiperItem"
        >
          <img
            class="press-image-preview__image"
            :src="image"
            fit="contain"
          >
        </swiper-item>
      </swiper>
      <div />
    </div>
  </PressOverlay>
</template>
<script>
import PressOverlay from '../press-overlay/press-overlay.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { functionalMixin } from '../mixins/functional';


const imagePreviewProps = {
  images: {
    type: Array,
    default: () => [],
  },
  startPosition: {
    type: [Number, String],
    default: 0,
  },
  transition: {
    type: String,
    default: 'press-fade',
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  asyncClose: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeIcon: {
    type: String,
    default: 'clear',
  },
  closeIconPosition: {
    type: String,
    default: 'top-right',
  },
  zIndex: {
    type: Number,
    default: 10,
  },
};

export default {
  name: 'PressImagePreview',
  components: {
    PressOverlay,
    PressIconPlus,
  },
  mixins: [functionalMixin(imagePreviewProps)],
  props: {
    ...imagePreviewProps,
  },
  emits: ['close', 'change'],
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    imagePreviewStyle() {
      return this.getPropOrData('customStyle');
    },
  },
  watch: {
    startPosition: 'setActive',
    show(val) {
      if (val) {
        this.setActive(+this.getPropOrData('startPosition'));
        this.$nextTick(() => {
          // this.resize();
          // this.$refs.swipe.swipeTo(+this.startPosition, { immediate: true });
        });
      } else {
        this.$emit('close', {
          index: this.active,
          url: this.getPropOrData('images')[this.active],
        });
      }
    },
  },
  mounted() {
  },
  methods: {
    showImagePreview(options) {
      this.showDialog(options);
      this.setActive(options.startPosition || 0);
    },
    onClosed() {
    },
    onChange(event) {
      // swiper包装了event，可以用event.detail
      const { current = 0 } = event.detail;
      this.setActive(current);
    },
    emitClose() {
      if (!this.getPropOrData('asyncClose')) {
        this.$emit('close');
        this.innerShow = false;
        this.promiseCallback('confirm');
      } else {
        this.promiseCallback('cancel');
      }
    },
    onClose() {
      this.emitClose();
    },
    onClickOverlay() {
      this.onClose();
    },
    onClickSwiperItem() {
      this.onClose();
    },
    setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/var.scss";

.press-image-preview {
  position: fixed;
  // top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - var(--window-top, 0px));
  z-index: 2;

  &__swipe {
    height: 100%;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  }

  &__cover {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__image {
    width: 100%;
    transition-property: transform;

    &--vertical {
      width: auto;
      height: 100%;
    }

    img {
      // disable desktop browser image drag
      -webkit-user-drag: none;
    }

    .van-image,
    .press-image {
      &__error {
        top: 30%;
        height: 40%;
      }

      &__error-icon {
        font-size: 36px;
      }

      &__loading {
        background-color: transparent;
      }
    }
  }

  &__index {
    position: absolute;
    top: $padding-md;
    left: 50%;
    color: $image-preview-index-text-color;
    font-size: $image-preview-index-font-size;
    line-height: $image-preview-index-line-height;
    text-shadow: $image-preview-index-text-shadow;
    transform: translate(-50%, 0);
  }

  ::v-deep &__overlay {
    background-color: $image-preview-overlay-background-color;
  }

  &__close-icon {
    position: absolute;
    z-index: $image-preview-close-icon-z-index;
    color: $image-preview-close-icon-color;
    font-size: $image-preview-close-icon-size;
    cursor: pointer;

    &:active {
      color: $image-preview-close-icon-active-color;
    }

    &--top-left {
      top: $image-preview-close-icon-margin;
      left: $image-preview-close-icon-margin;
    }

    &--top-right {
      top: $image-preview-close-icon-margin;
      right: $image-preview-close-icon-margin;
    }

    &--bottom-left {
      bottom: $image-preview-close-icon-margin;
      left: $image-preview-close-icon-margin;
    }

    &--bottom-right {
      right: $image-preview-close-icon-margin;
      bottom: $image-preview-close-icon-margin;
    }
  }
}
</style>
