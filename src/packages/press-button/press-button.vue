<template>
  <Button
    :id="id"
    :data-detail="dataset"
    :class="buttonClass"
    hover-class="press-button--active hover-class"
    :lang="lang"
    :form-type="formType"
    :style="buttonStyle"
    :open-type="disabled || loading || (canIUseGetUserProfile && openType === 'getUserInfo') ? '' : openType"
    :business-id="businessId"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :app-parameter="appParameter"
    :aria-label="ariaLabel"
    @click.stop="onFakeClick"
    @getuserinfo="onGetUserInfo"
    @contact="onContact"
    @getphonenumber="onGetPhoneNumber"
    @error="onError"
    @launchapp="onLaunchApp"
    @opensetting="onOpenSetting"
    @chooseavatar="onChooseAvatar"
  >
    <template v-if="isESportLoading">
      <PressLoading
        loading-scenes="btn"
      />
    </template>
    <template v-else-if="loading">
      <press-loading-plus
        custom-class="loading-class"
        :size="loadingSize"
        :type="loadingType"
        :color="loadingColor"
      />
      <div
        v-if="loadingText"
        class="press-button__loading-text"
      >
        {{ loadingText }}
      </div>
    </template>
    <template v-else>
      <press-icon-plus
        v-if="icon"
        size="1.2em"
        :name="icon"
        :class-prefix="classPrefix"
        class="press-button__icon"
        custom-style="line-height: inherit;"
      />
      <div class="press-button__text">
        <slot />
      </div>
    </template>
  </Button>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressLoadingPlus from '../press-loading-plus/press-loading-plus.vue';
import PressLoading from '../press-loading/press-loading.vue';
import { button } from '../mixins/button';
import { canIUseFormFieldButton } from '../common/utils/version';
import utils from '../common/utils/utils';
import { DEFAULT_SIZE_LIST, rootStyle, loadingColor } from './index';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


const eSportTypeClassMap = {
  'e-sport-primary': ['e-sport-primary'],
  'e-sport-primary-bg': ['e-sport-primary', 'e-sport-bg'],
  'e-sport-primary-bg-lg': ['e-sport-primary', 'e-sport-bg', 'e-sport-bg-lg'],
  'e-sport-primary-bg-xl': ['e-sport-primary', 'e-sport-bg', 'e-sport-bg-xl'],
  'e-sport-secondary': ['e-sport-secondary'],
  'e-sport-border': ['e-sport-border'],
};


const mixins = [button];
if (canIUseFormFieldButton()) {
  mixins.push('wx://form-field-button');
}
export default {
  name: 'PressButton',
  options: {
    virtualHost: true,
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressLoadingPlus,
    PressLoading,
  },
  mixins,
  classes: ['hover-class', 'loading-class'],
  props: {
    formType: { type: String, default: '' },
    icon: { type: String, default: '' },
    classPrefix: {
      type: String,
      default: 'press-icon-plus',
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: { type: Boolean, default: false },
    hairline: Boolean,
    disabled: Boolean,
    loadingText: { type: String, default: '' },
    customStyle: { type: String, default: '' },
    loadingType: {
      type: String,
      default: 'circular',
    },
    type: {
      type: String,
      default: 'default',
    },
    dataset: {
      type: [Object, null],
      default: null,
    },
    size: {
      type: [String, Object],
      default: 'normal',
    },
    loadingSize: {
      type: String,
      default: '20px',
    },
    color: { type: String, default: '' },
    ...defaultProps,
  },
  data() {
    return {
      baseStyle: '',
    };
  },
  computed: {
    isESportLoading() {
      return this.loading && eSportTypeClassMap[this.type];
    },
    buttonClass() {
      const {
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        customClass,
      } = this;
      const classSize = DEFAULT_SIZE_LIST.indexOf(size) > -1 ? size : '';

      let eSportClasses = [];
      let typeClass = type;
      if (eSportTypeClassMap[type]) {
        eSportClasses = eSportTypeClassMap[type];
        typeClass = '';
      }
      if (type.indexOf('-disabled') > -1) {
        const realType = type.replace('-disabled', '');
        eSportClasses = [
          ...eSportTypeClassMap[realType],
          'e-sport-disabled',
        ];
      }
      return `${customClass} ${utils.bem2('button', [typeClass, classSize, ...eSportClasses, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }])} ${hairline ? 'press-hairline--surround' : ''}`;
    },
    buttonStyle() {
      const { plain, color, customStyle, size } = this;
      return rootStyle({ plain, color, customStyle, size });
    },
    loadingColor() {
      const { type, color, plain } = this;
      return loadingColor({ type, color, plain });
    },
  },
  methods: {
    onFakeClick(event) {
      const { disabled,  loading } = this;
      if (disabled || loading) return;
      this.onClick(event);
    },
    onClick(event) {
      this.$emit('click', event);
      const { canIUseGetUserProfile, openType, getUserProfileDesc, lang } = this;
      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        uni.getUserProfile({
          desc: getUserProfileDesc || '  ',
          lang: lang || 'en',
          complete: (userProfile) => {
            this.$emit('getuserinfo', userProfile);
          },
        });
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  height: var(--button-default-height, $button-default-height);
  line-height: var(--button-line-height, $button-line-height);
  font-size: var(--button-default-font-size, $button-default-font-size);
  transition: opacity $animation-duration-fast;
  border-radius: var(--button-border-radius, $button-border-radius);

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: inherit;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: " ";
    background-color: $black;
    border-color: $black;
  }

  // reset weapp default border
  &::after {
    border-width: 0;
  }

  // 【修改点】unclickable状态下不用有active样式
  &--active:not(&--unclickable)::before {
    opacity: 0.15;
  }

  // 【修改点】unclickable状态下不用有active样式
  &:active:not(&--unclickable)::before {
    opacity: 0.15;
  }

  // 【修改点】unclickable状态下不隐藏after
  // &--unclickable::after {
  //   display: none;
  // }

  &--default {
    color: var(--button-default-color, $button-default-color);
    background: var(
      --button-default-background-color,
      $button-default-background-color
    );
    border: var(--button-border-width, $button-border-width) solid
      var(--button-default-border-color, $button-default-border-color);
  }

  &--primary {
    color: var(--button-primary-color, $button-primary-color);
    background: var(
      --button-primary-background-color,
      $button-primary-background-color
    );
    border: var(--button-border-width, $button-border-width) solid
      var(--button-primary-border-color, $button-primary-border-color);
  }

  &--info {
    color: var(--button-info-color, $button-info-color);
    background: var(
      --button-info-background-color,
      $button-info-background-color
    );
    border: var(--button-border-width, $button-border-width) solid
      var(--button-info-border-color, $button-info-border-color);
  }

  &--danger {
    color: var(--button-danger-color, $button-danger-color);
    background: var(
      --button-danger-background-color,
      $button-danger-background-color
    );
    border: var(--button-border-width, $button-border-width) solid
      var(--button-danger-border-color, $button-danger-border-color);
  }

  &--warning {
    color: var(--button-warning-color, $button-warning-color);
    background: var(
      --button-warning-background-color,
      $button-warning-background-color
    );
    border: var(--button-border-width, $button-border-width) solid
      var(--button-warning-border-color, $button-warning-border-color);
  }

  &--plain {
    background: var(
      --button-plain-background-color,
      $button-plain-background-color
    );

    &.press-button--primary {
      color: var(
        --button-primary-background-color,
        $button-primary-background-color
      );
    }

    &.press-button--info {
      color: var(--button-info-background-color, $button-info-background-color);
    }

    &.press-button--danger {
      color: var(
        --button-danger-background-color,
        $button-danger-background-color
      );
    }

    &.press-button--warning {
      color: var(
        --button-warning-background-color,
        $button-warning-background-color
      );
    }
  }

  &--large {
    width: 100%;
    height: var(--button-large-height, $button-large-height);
  }

  &--normal {
    padding: 0 6px;
    font-size: var(--button-normal-font-size, $button-normal-font-size);
  }

  &--small {
    min-width: var(--button-small-min-width, $button-small-min-width);
    height: var(--button-small-height, $button-small-height);
    padding: 0 var(--padding-xs, $padding-xs);
    font-size: var(--button-small-font-size, $button-small-font-size);
  }

  // mini图标默认宽度50px，文字不能超过4个
  &--mini {
    display: inline-block;
    min-width: var(--button-mini-min-width, $button-mini-min-width);
    height: var(--button-mini-height, $button-mini-height);
    font-size: var(--button-mini-font-size, $button-mini-font-size);

    & + .press-button--mini {
      margin-left: 5px;
    }
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--round {
    border-radius: var(
      --button-round-border-radius,
      $button-round-border-radius
    );
  }

  &--square {
    border-radius: 0;
  }

  &--disabled {
    opacity: var(--button-disabled-opacity, $button-disabled-opacity);
  }

  &__text {
    display: inline;

    // 修复文字太多换行问题
    white-space: nowrap;
    // 修复文字被背景图片遮挡问题
    position: relative;
    z-index: 1;
  }

  &__loading-text,
  &__icon + &__text:not(:empty) {
    margin-left: $padding-base;
  }

  &__icon {
    min-width: 1em;
    line-height: inherit !important;
    vertical-align: top;
  }

  &--hairline {
    padding-top: 1px; // add 1px padding for text vertical align middle
    border-width: 0;

    &::after {
      border-color: inherit;
      border-width: 1px;
      border-radius: calc(
        var(--button-border-radius, $button-border-radius) * 2
      );
    }

    &.press-button--round::after {
      border-radius: var(
        --button-round-border-radius,
        $button-round-border-radius
      );
    }

    &.press-button--square::after {
      border-radius: 0;
    }

    &.press-hairline--surround::after {
      border-width: 1px;
    }
  }
}
</style>
<style scoped lang="scss">
@import "../common/style/var.scss";

@mixin bgMixin(
  $beforeWidth: $button-e-sport-bg-before-md-width,
  $beforeHeight: $button-e-sport-bg-before-md-height,
  $beforeBg: $button-e-sport-bg-before-md-img,
  $beforeBottom: 0,
  $afterWidth: $button-e-sport-bg-after-md-width,
  $afterHeight: $button-e-sport-bg-after-md-height,
  $afterBg: $button-e-sport-bg-after-md-img,
  $afterTop: $button-e-sport-bg-after-md-top
) {
  &::before {
    position: absolute;
    bottom: $beforeBottom;
    left: 0;
    content: "";
    width: $beforeWidth;
    height: $beforeHeight;
    background: url($beforeBg) no-repeat center;
    background-size: contain;
    pointer-events: none;

    transform: unset; // 去掉press-btn自带before的影响
    top: unset;
    right: unset;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: $afterTop;
    right: 0;
    content: "";
    width: $afterWidth;
    height: $afterHeight;
    background: url($afterBg) no-repeat center;
    background-size: contain;
    pointer-events: none;

    transform: unset; // 去掉press-btn自带before的影响
    left: unset;
    bottom: unset;
    opacity: 1;
  }
}

@mixin primaryMixin() {
  font-size: $font-size-lg;
  color: $color-white;
  border-radius: $border-radius-md;
  background-image: $color-primary-btn;
  border: none; // 没有border
  &:not(.press-button--unclickable):active {
    background: $color-blue;
  }
}

.press-button {
  &--e-sport-primary {
    width: 1.76rem;
    height: 0.72rem;
    @include primaryMixin();
  }

  &--e-sport-secondary {
    width: 2rem;
    height: 0.72rem;
    font-size: $font-size-lg;
    color: $color-black;
    border-radius: $border-radius-md;
    background: $color-secondary-btn;
    border: none; // 没有border
    &:not(.press-button--unclickable):active {
      background: $color-gray-3;
    }
    &::before {
      background-color: transparent;
      border: none;
    }
  }

  &--e-sport-border {
    width: 2rem;
    height: 0.72rem;
    font-size: $font-size-lg;
    color: $color-primary;
    border-width: $border-width-base;
    border-style: solid;
    border-color: $color-primary;
    border-radius: $border-radius-md;
    background: transparent;
    &:not(.press-button--unclickable):active {
      background: $color-bg;
      border-color: $color-blue;
      color: $color-blue;
    }
    &::before {
      background-color: transparent;
      border: none;
    }
  }

  &--e-sport-bg {
    width: 2.72rem;
    height: 0.72rem;
    @include bgMixin();

    &-lg {
      width: 5.34rem;
      height: 0.88rem;

      &::before {
        width: $button-e-sport-bg-before-lg-width;
        height: $button-e-sport-bg-before-lg-height;
        background-image: url($button-e-sport-bg-before-lg-img);
        background-color: transparent;
        border: none;
      }
      &::after {
        top: $button-e-sport-bg-after-lg-top;
        width: $button-e-sport-bg-after-lg-width;
        height: $button-e-sport-bg-after-lg-height;
        background-image: url($button-e-sport-bg-after-lg-img);
      }
    }

    &-xl {
      width: 6rem;
      height: 0.88rem;

      &::before {
        width: $button-e-sport-bg-before-xl-width;
        height: $button-e-sport-bg-before-xl-height;
        background-image: url($button-e-sport-bg-before-xl-img);
        background-color: transparent;
        border: none;
      }
      &::after {
        top: $button-e-sport-bg-after-xl-top;
        width: $button-e-sport-bg-after-xl-width;
        height: $button-e-sport-bg-after-xl-height;
        background-image: url($button-e-sport-bg-after-xl-img);
        background-color: transparent;
        border: none;
      }
    }
  }

  &--e-sport-disabled {
    opacity: var(--button-disabled-opacity, $button-disabled-opacity);
  }
}
</style>
