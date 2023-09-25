<template>
  <div
    v-if="show"
    class="press-dialog"
  >
    <div class="press-dialog__content">
      <div class="press-dialog__title">
        {{ title }}
      </div>
      <div class="press-dialog__desc">
        {{ message }}
      </div>

      <div class="press-dialog__btn--wrap">
        <div
          v-if="showCancelButton"
          class="press-dialog__btn--cancel"
          @click="cancel"
        >
          {{ cancelButtonText }}
        </div>
        <div
          v-if="showConfirmButton"
          class="press-dialog__btn--confirm"
          @click="confirm"
        >
          {{ confirmButtonText }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { t } from '../locale';

export default {
  name: 'PressActTipDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: t('dialog.title'),
    },
    message: {
      type: String,
      default: t('actTipDialog.prompt'),
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: t('cancel'),
    },
    confirmButtonText: {
      type: String,
      default: t('confirm'),
    },
  },
  emits: ['confirm', 'cancel'],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    confirm() {
      this.$emit('confirm', this.show);
    },

    cancel() {
      this.$emit('cancel', this.show);
    },
  },
};

</script>
<style scoped lang="scss">
.press-dialog {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;

  &__content {
    position: relative;
    width: 5.6rem;
    padding: 0.64rem 0 0;
    background: #fff;
    box-shadow: 0 0 0.02rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.08rem;
  }

  &__title {
    font-size: 0.32rem;
    font-weight: 700;
    color: #4a4a4a;
    margin: 0 0.48rem;
    padding-bottom: 0.44rem;
    text-align: center;
  }

  &__desc {
    font-size: 0.28rem;
    color: #9b9b9b;
    text-align: center;
    margin: 0 0.48rem;
    padding-bottom: 0.4rem;
  }

  &__btn {
    &--wrap {
      display: flex;
      align-items: center;
      height: 0.84rem;
      border-top: 0.02rem solid #d8d8d8;
    }

    &--cancel,
    &--confirm {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      font-size: 0.28rem;
      cursor: pointer;
    }

    &--cancel {
      color: #333;
      border-right: 0.02rem solid #d8d8d8;
    }

    &--confirm {
      flex: 1;
      color: #ff9e74;
    }
  }
}
</style>
