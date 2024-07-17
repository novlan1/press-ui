<template>
  <div
    v-if="show"
    class="press-text"
    :class="[]"
    :style="{
      margin: margin,
      justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end'
    }"
    @click.stop="clickHandler"
  >
    <span
      v-if="mode === 'price'"
      :class="['press-text__price', type && `press-text__value--${type}`]"
      :style="valueStyle"
    >
      ￥
    </span>
    <div
      v-if="prefixIcon"
      class="press-text__prefix-icon"
    >
      <PressIconPlus
        :name="prefixIcon"
        :custom-style="parsedIconStyle"
      />
    </div>
    <PressLink
      v-if="mode === 'link'"
      :text="value"
      :href="href"
      underline
    />
    <template v-else-if="openType && isMp">
      <button
        :class="[
          'press-reset-button',
          'press-text__value',
          type && `press-text__value--${type}`,
        ]"
        :style="valueStyle"
        :data-index="index"
        :openType="openType"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        {{ value }}
      </button>
    </template>
    <span
      v-else
      class="press-text__value"
      :style="valueStyle"
      :class="[
        type && `press-text__value--${type}`,
        lines && `press-line-${lines}`
      ]"
    >
      {{ value }}
    </span>
    <div
      v-if="suffixIcon"
      class="press-text__suffix-icon"
    >
      <PressIconPlus
        :name="suffixIcon"
        :custom-style="parsedIconStyle"
      />
    </div>
  </div>
</template>

<script>
import props from './props';
import value from './value';

import button from './mixin-button';
import openType from './mixin-open-type';

import { addUnit } from '../common/utils/add-unit';
import { style as styleUtil } from '../common/utils/style';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressLink from '../press-link/press-link.vue';

let mixins = [];


// #ifdef MP
mixins = [value, button, openType, props];
// #endif
// #ifndef MP
mixins = [value, props];
// #endif

export default {
  name: 'PressText',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressLink,
  },
  mixins,
  emits: [
    'click',
  ],
  data() {
    return {};
  },
  computed: {
    valueStyle() {
      const style = {
        textDecoration: this.decoration,
        fontWeight: this.bold ? 'bold' : 'normal',
        wordWrap: this.wordWrap,
        fontSize: addUnit(this.size),
      };
      !this.type && (style.color = this.color);
      this.isNvue && this.lines && (style.lines = this.lines);
      this.lineHeight
              && (style.lineHeight = addUnit(this.lineHeight));
      !this.isNvue && this.block && (style.display = 'block');

      return styleUtil([style, this.customStyle]);
    },
    parsedIconStyle() {
      const style = {
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
      };
      return styleUtil([style, this.iconStyle]);
    },
    isNvue() {
      let nvue = false;
      // #ifdef APP-NVUE
      nvue = true;
      // #endif
      return nvue;
    },
    isMp() {
      let mp = false;
      // #ifdef MP
      mp = true;
      // #endif
      return mp;
    },
  },
  methods: {
    styleUtil,
    clickHandler() {
      // 如果为手机号模式，拨打电话
      if (this.call && this.mode === 'phone') {
        uni.makePhoneCall({
          phoneNumber: this.text,
        });
      }
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
