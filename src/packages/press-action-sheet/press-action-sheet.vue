<template>
  <press-popup
    :show="show"
    position="bottom"
    :round="round"
    :z-index="zIndex"
    :overlay="overlay"
    custom-class="press-action-sheet"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClickOverlay"
  >
    <div
      v-if="title"
      class="press-action-sheet__header"
    >
      {{ title }}
      <press-icon-plus
        name="cross"
        custom-class="press-action-sheet__close"
        @click="onClose"
      />
    </div>
    <div
      v-if="description"
      class="press-action-sheet__description press-hairline--bottom"
    >
      {{ description }}
    </div>
    <div v-if="actions && actions.length">
      <button
        v-for="(item,index) in (actions)"
        :key="item.index"
        :open-type="getOpenType(item)"
        :style="item.color ? 'color: ' + item.color : ''"
        :class="true ? getActionClass(item) : ''"
        hover-class="press-action-sheet__item--hover"
        :data-index="index"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @click="()=>onFakeSelect(item,index)"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        <template v-if="(!item.loading)">
          {{ item.name }}
          <div
            v-if="item.subname"
            class="press-action-sheet__subname"
          >
            {{ item.subname }}
          </div>
        </template>
        <press-loading
          v-else
          custom-class="press-action-sheet__loading"
          size="22px"
        />
      </button>
    </div>
    <slot />
    <template v-if="cancelText">
      <div class="press-action-sheet__gap" />
      <div
        class="press-action-sheet__cancel"
        hover-class="press-action-sheet__cancel--hover"
        hover-stay-time="70"
        @click="onCancel"
      >
        {{ cancelText }}
      </div>
    </template>
  </press-popup>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressPopup from '../press-popup-plus/press-popup-plus.vue';
import PressLoading from '../press-loading-plus/press-loading-plus.vue';
import { button } from '../mixins/button';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';

export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressPopup,
    PressLoading,
  },
  mixins: [button],
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: '' },
    cancelText: { type: String, default: '' },
    description: { type: String, default: '' },
    round: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
  },
  data() {
    return {

    };
  },
  methods: {
    getActionClass(item) {
      return `${utils.bem2('action-sheet__item', { disabled: item.disabled || item.loading })} ${item.className || ''}`;
    },
    getOpenType(item) {
      const { canIUseGetUserProfile } = this;
      return item.disabled || item.loading || (canIUseGetUserProfile && item.openType === 'getUserInfo') ? '' : item.openType;
    },
    onFakeSelect(item, index) {
      if (item.disabled || item.loading) return;
      this.onSelect(item, index);
    },
    onSelect(item) {
      const {  closeOnClickAction, canIUseGetUserProfile } = this;
      if (item) {
        this.$emit('select', item);
        if (closeOnClickAction) {
          this.onClose();
        }
        if (item.openType === 'getUserInfo' && canIUseGetUserProfile) {
          uni.getUserProfile({
            desc: item.getUserProfileDesc || '  ',
            complete: (userProfile) => {
              this.$emit('getuserinfo', userProfile);
            },
          });
        }
      }
    },
    onCancel() {
      this.$emit('cancel');
    },
    onClose() {
      this.$emit('close');
    },
    onClickOverlay() {
      this.$emit('click-overlay');
      this.onClose();
    },
  },
};
</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-action-sheet {
  max-height: var(
    --action-sheet-max-height,
    $action-sheet-max-height
  ) !important;
  color: var(--action-sheet-item-text-color, $action-sheet-item-text-color);

  &__item,
  &__cancel {
    padding: 14px $padding-md;
    text-align: center;
    font-size: var(--action-sheet-item-font-size, $action-sheet-item-font-size);
    line-height: var(
      --action-sheet-item-line-height,
      $action-sheet-item-line-height
    );
    background-color: var(
      --action-sheet-item-background,
      $action-sheet-item-background
    );

    &--hover {
      background-color: $active-color;
    }

    // reset weapp default border
    &::after {
      border-width: 0;
    }
  }

  &__cancel {
    color: var(
      --action-sheet-cancel-text-color,
      $action-sheet-cancel-text-color
    );
  }

  &__gap {
    display: block;
    height: var(
      --action-sheet-cancel-padding-top,
      $action-sheet-cancel-padding-top
    );
    background-color: var(
      --action-sheet-cancel-padding-color,
      $action-sheet-cancel-padding-color
    );
  }

  &__item--disabled {
    color: var(
      --action-sheet-item-disabled-text-color,
      $action-sheet-item-disabled-text-color
    );
  }

  &__item--disabled.press-action-sheet__item--hover {
    background-color: var(
      --action-sheet-item-background,
      $action-sheet-item-background
    );
  }

  &__subname {
    margin-top: var(--padding-xs, $padding-xs);
    font-size: var(
      --action-sheet-subname-font-size,
      $action-sheet-subname-font-size
    );
    color: var(--action-sheet-subname-color, $action-sheet-subname-color);
    line-height: var(
      --action-sheet-subname-line-height,
      $action-sheet-subname-line-height
    );
  }

  &__header {
    text-align: center;
    font-weight: var(--font-weight-bold, $font-weight-bold);
    font-size: var(
      --action-sheet-header-font-size,
      $action-sheet-header-font-size
    );
    line-height: var(--action-sheet-header-height, $action-sheet-header-height);
  }

  &__description {
    text-align: center;
    padding: 20px var(--padding-md, $padding-md);
    color: var(
      --action-sheet-description-color,
      $action-sheet-description-color
    );
    font-size: var(
      --action-sheet-description-font-size,
      $action-sheet-description-font-size
    );
    line-height: var(
      --action-sheet-description-line-height,
      $action-sheet-description-line-height
    );
  }

  &__close {
    position: absolute !important;
    top: 0;
    right: 0;
    line-height: inherit !important;
    padding: var(
      --action-sheet-close-icon-padding,
      $action-sheet-close-icon-padding
    );
    font-size: var(
      --action-sheet-close-icon-size,
      $action-sheet-close-icon-size
    ) !important;
    color: var(--action-sheet-close-icon-color, $action-sheet-close-icon-color);
  }

  &__loading {
    display: flex !important;
  }
}
</style>
