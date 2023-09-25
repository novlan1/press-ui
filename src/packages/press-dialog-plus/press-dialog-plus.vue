<template>
  <div class="press-dialog-index">
    <press-popup
      :show="dataShow"
      :z-index="dataZIndex"
      :overlay="dataOverlay"
      :transition="dataTransition"
      :custom-class="'press-dialog press-dialog--'+(dataTheme)+' '+(dataClassName)"
      :custom-style="'width: '+(utils.addUnit(dataWidth))+';'+(dataCustomStyle)"
      :overlay-style="dataOverlayStyle"
      :close-on-click-overlay="dataCloseOnClickOverlay"
      @close="onClickOverlay"
    >
      <div
        v-if="dataTitle || dataUseTitleSlot"
        :class="true ? utils.bem2('dialog__header', { isolated: !(dataMessage || dataUseSlot) }) : ''"
      >
        <slot
          v-if="dataUseTitleSlot"
          name="title"
        />
        <template v-else-if="dataTitle">
          {{ dataTitle }}
        </template>
      </div>

      <slot v-if="dataUseSlot" />
      <div
        v-else-if="dataMessage"
        :class="true ? utils.bem2('dialog__message', [dataTheme, dataMessageAlign, { hasTitle: dataTitle }]) : ''"
      >
        <span class="press-dialog__message-text">
          {{ dataMessage }}
        </span>
      </div>

      <!-- <press-goods-action
        v-if="theme === 'round-button'"
        custom-class="press-dialog__footer--round-button"
      >
        <press-goods-action-button
          v-if="dataShowCancelButton"
          size="large"
          :loading="loading.cancel"
          class="press-dialog__button press-hairline--right"
          custom-class="press-dialog__cancel"
          :custom-style="'color: '+(dataCancelButtonColor)"
          @click="onCancel"
        >
          {{ dataCancelButtonText }}
        </press-goods-action-button>
        <press-goods-action-button
          v-if="dataShowConfirmButton"
          size="large"
          class="press-dialog__button"
          :loading="loading.confirm"
          custom-class="press-dialog__confirm"
          :custom-style="'color: '+(dataConfirmButtonColor)"
          :open-type="dataConfirmButtonOpenType"
          :lang="lang"
          :business-id="businessId"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
          @click="onConfirm"
          @getuserinfo="onGetUserInfo"
          @contact="onContact"
          @getphonenumber="onGetPhoneNumber"
          @error="onError"
          @launchapp="onLaunchApp"
          @opensetting="onOpenSetting"
        >
          {{ dataConfirmButtonText }}
        </press-goods-action-button>
      </press-goods-action> -->

      <div
        v-if="true"
        class="press-hairline--top press-dialog__footer"
      >
        <press-button
          v-if="dataShowCancelButton"
          size="large"
          :loading="loading.cancel"
          class="press-dialog__button press-hairline--right"
          custom-class="press-dialog__cancel"
          :custom-style="'color: '+(dataCancelButtonColor)"
          @click="onCancel"
        >
          {{ dataCancelButtonText }}
        </press-button>
        <press-button
          v-if="dataShowConfirmButton"
          size="large"
          class="press-dialog__button"
          :loading="loading.confirm"
          custom-class="press-dialog__confirm"
          :custom-style="'color: '+(dataConfirmButtonColor)"
          :open-type="dataConfirmButtonOpenType"
          :lang="lang"
          :business-id="businessId"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
          @click="onConfirm"
          @getuserinfo="onGetUserInfo"
          @contact="onContact"
          @getphonenumber="onGetPhoneNumber"
          @error="onError"
          @launchapp="onLaunchApp"
          @opensetting="onOpenSetting"
        >
          {{ dataConfirmButtonText }}
        </press-button>
      </div>
    </press-popup>
  </div>
</template>
<script>
import PressPopup from '../press-popup-plus/press-popup-plus.vue';
import PressButton from '../press-button/press-button.vue';
// import VanGoodsAction from '../goods-action/index.vue';
// import VanGoodsActionButton from '../goods-action-button/index.vue';

import { button } from '../mixins/button';
import { GRAY, RED } from '../common/constant/color';
import { toPromise } from '../common/format/function';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import { t } from '../locale';
import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  theme: {
    type: String,
    default: 'default',
  },
  useSlot: Boolean,
  className: { type: String, default: '' },
  customStyle: { type: String, default: '' },
  asyncClose: Boolean,
  messageAlign: { type: String, default: '' },
  beforeClose: { type: [null, Function], default: null },
  overlayStyle: { type: String, default: '' },
  useTitleSlot: Boolean,
  showCancelButton: Boolean,
  closeOnClickOverlay: Boolean,
  confirmButtonOpenType: { type: String, default: '' },
  width: {
    type: [String, Number],
    default: '',
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  confirmButtonText: {
    type: String,
    default: t('confirm'),
  },
  cancelButtonText: {
    type: String,
    default: t('cancel'),
  },
  confirmButtonColor: {
    type: String,
    default: RED,
  },
  cancelButtonColor: {
    type: String,
    default: GRAY,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: String,
    default: 'scale',
  },
  ...defaultProps,
};
export default {
  name: 'PressDialogPlus',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressButton,
  },
  mixins: [button],
  props,
  emits: ['close', 'confirm', 'cancel'],
  data() {
    return {
      ...getPropsData(this, props),

      utils,
      loading: {
        confirm: false,
        cancel: false,
      },
      callback: (() => { }),
    };
  },
  watch: {
    ...getPropsWatch(props),
    dataShow: {
      handler(val) {
        if (!val) {
          this.stopLoading();
        }
      },
    },
  },
  methods: {
    setData(data) {
      setPropsToData.call(this, data);
    },
    onConfirm() {
      this.handleAction('confirm');
    },
    onCancel() {
      this.handleAction('cancel');
    },
    onClickOverlay() {
      this.close('overlay');
    },
    close(action) {
      this.dataShow = false;
      this.$nextTick(() => {
        this.$emit('close', action);
        const { callback } = this;
        if (callback) {
          callback(action, this);
        }
      });
    },
    stopLoading() {
      this.loading.confirm = false;
      this.loading.cancel = false;
    },
    handleAction(action) {
      this.$emit(action, { dialog: this });
      const { dataAsyncClose, dataBeforeClose } = this;
      if (!dataAsyncClose && !dataBeforeClose) {
        this.close(action);
        return;
      }

      this.loading[action] = true;

      if (dataBeforeClose) {
        toPromise(dataBeforeClose(action)).then((value) => {
          if (value) {
            this.close(action);
          } else {
            this.stopLoading();
          }
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

::v-deep .press-dialog {
  top: 45% !important;
  overflow: hidden;
  width: var(--dialog-width, $dialog-width);
  font-size: var(--dialog-font-size, $dialog-font-size);
  border-radius: var(--dialog-border-radius, $dialog-border-radius);
  background-color: var(--dialog-background-color, $dialog-background-color);

  &__header {
    text-align: center;
    padding-top: var(--dialog-header-padding-top, $dialog-header-padding-top);
    font-weight: var(--dialog-header-font-weight, $dialog-header-font-weight);
    line-height: var(--dialog-header-line-height, $dialog-header-line-height);

    &--isolated {
      padding: var(
        --dialog-header-isolated-padding,
        $dialog-header-isolated-padding
      );
    }
  }

  &__message {
    overflow-y: auto;
    text-align: center;
    -webkit-overflow-scrolling: touch;
    font-size: var(--dialog-message-font-size, $dialog-message-font-size);
    line-height: var(--dialog-message-line-height, $dialog-message-line-height);
    max-height: var(--dialog-message-max-height, $dialog-message-max-height);
    padding: var(--dialog-message-padding, $dialog-message-padding);

    &-text {
      word-wrap: break-word;
    }

    &--hasTitle {
      padding-top: var(
        --dialog-has-title-message-padding-top,
        $dialog-has-title-message-padding-top
      );
      color: var(
        --dialog-has-title-message-text-color,
        $dialog-has-title-message-text-color
      );
    }

    &--round-button {
      padding-bottom: $padding-md;
      color: $text-color;
    }

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }

    &--justify {
      text-align: justify;
    }
  }

  &__footer {
    display: flex;

    &--round-button {
      position: relative !important;
      padding: $padding-xs $padding-lg $padding-md !important;
    }
  }

  &__button {
    flex: 1;
  }

  &__confirm,
  &__cancel {
    border: 0 !important;
  }

  &-bounce-enter {
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
  }

  &-bounce-leave-active {
    transform: translate3d(-50%, -50%, 0) scale(0.9);
    opacity: 0;
  }
}

@media (max-width: 321px) {
  ::v-deep .press-dialog {
    width: var(--dialog-small-screen-width, $dialog-small-screen-width);
  }
}
</style>
