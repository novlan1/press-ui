<template>
  <div class="press-dialog-index">
    <PressPopup
      :show="dataShow"
      :z-index="dataZIndex"
      :overlay="dataOverlay"
      :transition="dataTransition"
      :custom-class="'press-dialog press-dialog--'+(dataTheme)+' '+(dataClassName)"
      :custom-style="popupCustomStyle"
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

      <div
        v-if="true"
        class="press-hairline--top press-dialog__footer"
      >
        <PressButton
          v-if="dataShowCancelButton"
          size="large"
          :loading="loading.cancel"
          :class="cancelButtonClass"
          :custom-class="cancelButtonCustomClass"
          :custom-style="computedCancelButtonStyle"
          @click="onCancel"
        >
          {{ dataCancelButtonText }}
        </PressButton>
        <PressButton
          v-if="dataShowConfirmButton"
          size="large"
          class="press-dialog__button"
          :loading="loading.confirm"
          custom-class="press-dialog__confirm"
          :custom-style="computedConfirmButtonStyle"
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
        </PressButton>
      </div>
    </PressPopup>
  </div>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { GRAY, RED } from '../common/constant/color';
import { toPromise } from '../common/format/function';
import { style } from '../common/utils/style';

import { nextTick } from '../common/utils/system';
import utils from '../common/utils/utils';
import { t } from '../locale';

import { button } from '../mixins/basic/button';

import PressButton from '../press-button/press-button.vue';
import { getDialogMixin } from '../press-dialog-plus/dialog-mixin';
import PressPopup from '../press-popup/press-popup.vue';


const props = {
  show: {
    type: Boolean,
    default: false,
  },
  title: { type: String, default: '' },
  message: { type: String, default: '' },

  useSlot: Boolean,
  useTitleSlot: Boolean,

  className: { type: String, default: '' },
  customStyle: { type: [String, Object], default: '' },

  asyncClose: Boolean,
  beforeClose: { type: [null, Function], default: null },

  theme: {
    type: String,
    default: 'default',
  },
  messageAlign: { type: String, default: '' },
  width: {
    type: [String, Number],
    default: '',
  },
  zIndex: {
    type: Number,
    default: 2000,
  },

  overlay: {
    type: Boolean,
    default: true,
  },
  overlayStyle: { type: String, default: '' },
  transition: {
    type: String,
    default: 'scale',
  },

  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  showCancelButton: Boolean,

  confirmButtonText: {
    type: String,
    default: t('confirm'),
  },
  cancelButtonText: {
    type: String,
    default: t('cancel'),
  },

  confirmButtonStyle: {
    type: [String, Object],
    default: '',
  },
  cancelButtonStyle: {
    type: [String, Object],
    default: '',
  },

  confirmButtonColor: {
    type: String,
    default: RED,
  },
  cancelButtonColor: {
    type: String,
    default: GRAY,
  },

  closeOnClickOverlay: Boolean,
  confirmButtonOpenType: { type: String, default: '' },

  ...defaultProps,
};

export default {
  name: 'PressDialog',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressButton,
  },
  mixins: [button, getDialogMixin(props)],
  props,
  emits: ['close', 'confirm', 'cancel'],
  data() {
    return {
      utils,
      loading: {
        confirm: false,
        cancel: false,
      },
      callback: (() => { }),
    };
  },
  computed: {
    computedConfirmButtonStyle() {
      return style([
        {
          border: 0,
          color: this.dataConfirmButtonColor,
        },
        this.dataConfirmButtonStyle,
      ]);
    },
    computedCancelButtonStyle() {
      return style([
        {
          border: 0,
          color: this.dataCancelButtonColor,
        },
        this.dataCancelButtonStyle,
      ]);
    },
    popupCustomStyle() {
      let width = utils.addUnit(this.dataWidth);

      // #ifdef MP-TOUTIAO
      width = this.dataWidth ? utils.addUnit(this.dataWidth) : '320px';
      // #endif

      return style([
        {
          width,
          // #ifdef MP-TOUTIAO
          top: '45%',
          fontSize: '16px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          // #endif
        },
        this.dataCustomStyle,
      ]);
    },
    cancelButtonClass() {
      let result = 'press-dialog__button';
      // #ifndef MP-WEIXIN
      result += ' press-hairline--right';
      // #endif

      return result;
    },
    cancelButtonCustomClass() {
      let result = 'press-dialog__cancel';
      // #ifdef MP-WEIXIN
      result += ' press-hairline--right';
      // #endif
      return result;
    },
  },
  watch: {
    dataShow: {
      handler(val) {
        if (!val) {
          this.stopLoading();
        }
      },
    },
  },
  methods: {
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
      nextTick(() => {
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
<style scoped lang="scss" src="./css/index.scss">
</style>
