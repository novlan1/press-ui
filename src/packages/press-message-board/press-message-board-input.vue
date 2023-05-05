<template>
  <!-- :style="{ paddingBottom: `${inputBottom}px` }" -->
  <div
    class="press-message-board-input"
    :custom-class="customClass"
    :style="{ transform: `translateY(-${inputBottom}px)` }"
  >
    <!-- div模拟输入框 -->
    <div
      id="msg-footer-input"
      ref="msgFooterInput"
      class="press-message-board-input__wrap"
      @click="clickInput()"
    >
      <input
        id="msg-footer-textarea"
        class="press-message-board-input__input"
        :value="value"
        placeholder-style="color:#596297"
        :show-confirm-bar="showConfirmBar"
        :placeholder="placeholder"
        maxlength="100"
        :auto-height="textAreaIsAutoHeight"
        :adjust-position="adjustPosition"
        :focus="textAreaIsFocus"
        :confirm-type="confirmType"
        @focus="onFocus"
        @input="onInput"
        @blur="onBlur"
        @keyboardheightchange="keyboardheightchange"
      >
    </div>
    <div
      class="press-message-board-input__btn"
      :class="{'press-message-board-input__btn--disabled': !sendBtnEnable}"
      @click.stop="sendMsg()"
    >
      <p
        class="press-message-board-input__btn__send"
      >
        {{ sendBtnText }}
      </p>
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    sendBtnEnable: {
      type: Boolean,
      default: false,
    },
    // inputBottom: {
    //   type: [Number, String],
    //   default: 0,
    // },
    placeholder: {
      type: String,
      default: '说点什么...',
    },
    textAreaIsAutoHeight: {
      type: [Boolean, String],
      default: false,
    },
    adjustPosition: {
      type: Boolean,
      default: false,
    },
    textAreaIsFocus: {
      type: Boolean,
      default: false,
    },
    showConfirmBar: {
      type: Boolean,
      default: false,
    },
    sendBtnText: {
      type: String,
      default: '发送',
    },
    confirmType: {
      type: String,
      default: 'send',
    },
    ...defaultProps,
  },
  data() {
    return {
      inputBottom: 0,
    };
  },
  computed: {

  },
  mounted() {
  },
  // onPageShow() {
  //   console.log('[onPageShow]');
  //   uni.onKeyboardHeightChange((res) => { // 监听键盘高度变化
  //     // const systemInfo = uni.getSystemInfoSync();
  //     const keyHeight = res.height;
  //     console.log('[onKeyboardHeightChange] res', res);
  //     // - (systemInfo.screenHeight - systemInfo.windowHeight + systemInfo.safeAreaInsets.bottom);

  //     this.inputBottom = `${keyHeight > 0 ? keyHeight : 0}`;
  //   });
  // },
  // onPageHide() {
  //   uni.offKeyboardHeightChange();
  // },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
    clickInput() {
      this.$emit('clickInput');
    },
    sendMsg() {
      this.$emit('sendMsg', this.value);
    },
    keyboardheightchange(res) {
      // this.$emit('keyboardheightchange', e);
      const keyHeight = res.detail && res.detail.height;
      console.log('[keyboardheightchange] res', res);
      // - (systemInfo.screenHeight - systemInfo.windowHeight + systemInfo.safeAreaInsets.bottom);

      this.inputBottom = `${keyHeight > 0 ? keyHeight : 0}`;
    },
    onBlur() {
      this.$emit('blur');
    },
    onFocus() {
      this.$emit('focus');
    },
  },
};

</script>
<style lang="scss" scoped>
@import "../base/layout.scss";
@import "../base/mixin.scss";

.press-message-board-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.32rem;
  padding-bottom: 0.32rem;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 0.32rem);
  padding-bottom: calc(env(safe-area-inset-bottom) + 0.32rem);
  background-color: $color-white;
  box-shadow: 0 -0.04rem 0.08rem rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;

  &__wrap ::v-deep {
    display: flex;
    align-items: center;
    flex: 1;

    .uni-input-placeholder {
      width: 100%;
      @include single-line-ellipsis();
    }
  }

  &__input {
    display: inline-block;
    width: 100%;
    min-height: 0.72rem;
    height: 0.72rem;
    margin: 0 auto;
    border-left: 0.16rem solid #eef0f6;
    border-right: 0.16rem solid #eef0f6;
    flex: 1;
    border-radius: 0.08rem;
    background-color: #eef0f6;
    font-size: $font-xm;
    caret-color: $color-black;
    box-sizing: border-box;

    &::placeholder {
      color: $color-gray;
    }
  }

  &__btn {
    margin-left: 0.16rem;
    @include primary-btn(2rem, 0.72rem, $font-l);
    @include btn-default-bg;

    &--disabled {
      @include disabled-btn(2rem, 0.72rem, $font-l);

      &::after {
        display: none;
      }

      &::before {
        display: none;
      }
    }

    &__send {
      z-index: 3;
    }
  }
}
</style>
