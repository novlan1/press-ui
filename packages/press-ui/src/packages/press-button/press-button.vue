<template>
  <button
    v-if="isVue3Mp"
    :id="id"
    :data-detail="dataset"
    :class="buttonClass"
    :hover-class="['press-button--active', hoverClass]"
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
    @tap.stop="onFakeTap"
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
        :custom-class="loadingClass"
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
  </button>

  <Button
    v-else
    :id="id"
    :data-detail="dataset"
    :class="buttonClass"
    :hover-class="['press-button--active', hoverClass]"
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
    @tap.stop="onFakeTap"
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
        :custom-class="loadingClass"
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
import utils, { isNotInUni } from '../common/utils/utils';
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
  emits: ['click', 'getuserinfo'],
  data() {
    return {
      baseStyle: '',
    };
  },
  computed: {
    isVue3Mp() {
      let result = false;
      // #ifdef VUE3
      // #ifdef MP
      result = true;
      // #endif
      // #endif
      return result;
    },
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
      if (isNotInUni()) {
        this.realFakeClick(event);
      }
    },
    realFakeClick(event) {
      const { disabled,  loading } = this;
      if (disabled || loading) return;
      this.onClick(event);
    },
    onFakeTap(event) {
      if (!isNotInUni()) {
        this.realFakeClick(event);
      }
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
<style scoped lang="scss" src="./css/index.scss">
</style>
