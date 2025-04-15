<template>
  <PressPopup
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
      <PressIconPlus
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
        :key="index"
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
        <PressLoading
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
  </PressPopup>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressPopup from '../press-popup-plus/press-popup-plus.vue';
import PressLoading from '../press-loading-plus/press-loading-plus.vue';
import { button } from '../mixins/button';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';


export default {
  name: 'PressActionSheet',
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
  emits: ['select', 'close', 'cancel', 'click-overlay', 'getuserinfo'],
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
<style scoped lang="scss" src="./css/index.scss">
</style>
