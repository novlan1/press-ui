<template>
  <div
    class="press-picker-toolbar"
    :class="customClass"
  >
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
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    emit(...args) {
      this.$emit('emit', ...args);
    },
  },
};
</script>

<style scoped lang="scss" src="./css/toolbar.scss">
</style>
