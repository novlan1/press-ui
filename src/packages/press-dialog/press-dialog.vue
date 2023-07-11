<!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component-->
<template>
  <div
    v-if="dataShow"
    class="press-dialog"
    :style="{zIndex: `${dataZIndex}`}"
    @click.stop="touchRemove"
    @touchmove.stop="preventTouchMove"
  >
    <div class="press-dialog__content-wrap">
      <p class="press-dialog__title">
        {{ dataTitle }}
      </p>
      <scroll-view
        v-if="dataUseScrollView && dataHtmlContent"
        scroll-y="true"
        class="press-dialog__content"
        v-html="dataHtmlContent"
      />

      <p
        v-else-if="dataHtmlContent"
        class="press-dialog__content"
        v-html="dataHtmlContent"
      />

      <p
        v-if="!dataHtmlContent"
        class="press-dialog__content"
      >
        {{ dataContent }}
      </p>

      <div
        v-if="dataSrc"
        class="press-dialog__img-wrap"
      >
        <img
          v-if="dataSrc"
          class="press-dialog__img"
          :show-menu-by-longpress="true"
          :src="dataSrc"
          @click.stop="handleClickImage"
          @longpress="handleLongPressImage"
        >
      </div>
      <div class="press-dialog__btn--wrap">
        <template v-if="dataCancelText && dataCancelText.length > 0">
          <div
            class="press-dialog__btn--spacing"
          >
            <PressButton
              type="e-sport-secondary"
              custom-style="width: 100px;height: 36px;"
              @click="cancel"
            >
              {{ dataCancelText }}
            </PressButton>
          </div>

          <PressButton
            type="e-sport-primary-bg"
            :loading="mShowButtonLoading"
            custom-style="width: 100px;height: 36px;"
            @click="confirm"
          >
            {{ mShowButtonLoading ? '' : dataConfirmText }}
          </PressButton>
        </template>

        <template v-else>
          <PressButton
            type="e-sport-primary-bg"
            :loading="mShowButtonLoading"
            custom-style="width: 148px;height: 36px;"
            @click="confirm"
          >
            {{ mShowButtonLoading ? '' : dataConfirmText }}
          </PressButton>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import PressButton from '../press-button/press-button.vue';
import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';
import { dialogProps } from './computed';

export default {
  name: 'PressDialog',
  components: {
    PressButton,
  },
  props: {
    ...dialogProps,
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
      resolve: '',
      reject: '',
      promise: '',
      mShowButtonLoading: false,

      ...getPropsData(this, dialogProps),
    };
  },
  watch: {
    ...getPropsWatch(dialogProps),
  },
  mounted() {
  },
  methods: {
    setData(data) {
      setPropsToData.call(this, data);
    },
    preventTouchMove() {
      return;
    },
    confirm() {
      if (this.dataDialogType === 2) {
        if (this.mShowButtonLoading) {
          return;
        }
        this.mShowButtonLoading = true;
        if (typeof this.dataOnConfirmClick === 'function') {
          this.dataOnConfirmClick(this)
            .then(() => {
              this.resolveConfirm();
            })
            .catch(() => {
            });
        }
      } else {
        this.resolveConfirm();
      }
    },
    resolveConfirm() {
      if (this.resolve) {
        this.resolve('confirm');
      }
      this.$emit('confirm');
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel() {
      if (typeof this.dataOnClickCancel === 'function') {
        this.dataOnClickCancel(this);
      }
      if (typeof this.reject === 'function') {
        this.reject('cancel');
      }
      this.$emit('cancel');
      this.remove();
    },
    // 弹出messageBox,并创建promise对象
    showDialog() {
      this.dataShow = true;

      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    touchRemove() {
      if (this.dataCanTouchRemove) {
        this.remove();
      }
      this.$emit('cancel');
    },
    remove() {
      this.dataShow = false;
      this.mShowButtonLoading = false;
    },
    destroy() {
    },
    handleLongPressImage() {
      if (typeof this.dataOnLongPressImage === 'function') {
        this.dataOnLongPressImage();
      }
      this.$emit('onLongPressImage');
    },
    handleClickImage() {
      if (typeof this.dataOnClickImage === 'function') {
        this.dataOnClickImage();
      }
      this.$emit('onClickImage');
    },

  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
