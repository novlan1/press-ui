<!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component-->
<template>
  <div
    v-if="dataShow"
    class="press-dialog"
    :class="dataCustomClass"
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

      <PressField
        v-if="dataShowField"
        custom-class="press-dialog__field"
        title-width="0"
        :placeholder="dataFieldPlaceHolder"
        :value="dataFieldValue"
        :model-value="dataFieldValue"
        @change="onChangeField"
      />

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

        <template v-else-if="dataConfirmText || mShowButtonLoading">
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
import { getVirtualHostOptions } from '../common/component-handler/press-component';
import { toPromise } from '../common/format/function';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';
import PressButton from '../press-button/press-button.vue';
import PressField from '../press-field/press-field.vue';

import { dialogProps } from './computed';
import { getDialogMixin } from './dialog-mixin';


export default {
  name: 'PressDialogPlus',
  options: {
    ...getVirtualHostOptions(true, false),
    styleIsolation: 'shared',
  },
  components: {
    PressButton,
    PressField,
  },
  mixins: [getDialogMixin(dialogProps), ScrollViewPureMixin],
  props: {
    ...dialogProps,
  },
  emits: ['confirm', 'cancel', 'onLongPressImage', 'onClickImage'],
  data() {
    return {
      resolve: '',
      reject: '',
      promise: '',
      mShowButtonLoading: false,

      // ...getPropsData(this, dialogProps),

      inputValue: '',
    };
  },
  watch: {
    // ...getPropsWatch(dialogProps),
    dataFieldValue: {
      handler(value) {
        this.inputValue = value;
      },
      immediate: true,
    },
  },
  mounted() {
  },
  methods: {
    // setData(data) {
    //   setPropsToData.call(this, data);
    // },
    preventTouchMove() {
      return;
    },
    confirm() {
      if (this.dataDialogType === 2) {
        if (this.mShowButtonLoading) {
          return;
        }
        this.mShowButtonLoading = true;
      }

      if (typeof this.dataOnConfirmClick === 'function') {
        toPromise(this.dataOnConfirmClick(this))
          .then((value) => {
            if (value) {
              this.resolveConfirm();
            }
          })
          .catch(() => {});
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
    onChangeField(value) {
      this.inputValue = value;
    },

  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
