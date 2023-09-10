<template>
  <div class="press-picker-toolbar">
    <div
      v-if="showToolbar"
      class="press-picker__toolbar toolbar-class"
    >
      <div
        class="press-picker__cancel"
        hover-class="press-picker__cancel--hover"
        hover-stay-time="70"
        data-type="cancel"
        @click="emit"
      >
        {{ cancelButtonText }}
      </div>
      <div
        v-if="title"
        class="press-picker__title press-ellipsis"
      >
        {{
          title
        }}
      </div>
      <div
        class="press-picker__confirm"
        hover-class="press-picker__confirm--hover"
        hover-stay-time="70"
        data-type="confirm"
        @click="emit"
      >
        {{ confirmButtonText }}
      </div>
    </div>
  </div>
</template>

<script>
import { t } from '../locale';

export default {
  props: {
    title: { type: String, default: '' },
    showToolbar: Boolean,
    cancelButtonText: {
      type: String,
      default: t('picker.cancel'),
    },
    confirmButtonText: {
      type: String,
      default: t('picker.confirm'),
    },
  },
  methods: {
    emit(...args) {
      this.$emit('emit', ...args);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-picker {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    height: var(--picker-toolbar-height, $picker-toolbar-height);
    line-height: var(--picker-toolbar-height, $picker-toolbar-height);
  }

  &__cancel,
  &__confirm {
    padding: var(--picker-action-padding, $picker-action-padding);
    font-size: var(--picker-action-font-size, $picker-action-font-size);

    &--hover {
      opacity: $active-opacity;
    }
  }

  &__confirm {
    color: var(--picker-confirm-action-color, $picker-confirm-action-color);
  }

  &__cancel {
    color: var(--picker-cancel-action-color, $picker-cancel-action-color);
  }

  &__title {
    max-width: 50%;
    text-align: center;
    font-weight: var(--font-weight-bold, $font-weight-bold);
    font-size: var(--picker-option-font-size, $picker-option-font-size);
  }
}
</style>
