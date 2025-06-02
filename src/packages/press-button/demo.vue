<template>
  <div class="demo-wrap">
    <demo-block :title="t('type')">
      <div class="demo-button-row">
        <PressButton
          type="default"
          :custom-style="customStyle"
          @click="onClick"
        >
          {{ t('default') }}
        </PressButton>
        <PressButton
          type="primary"
          :custom-style="`${customStyle}`"
          @click="onVibrateShort"
        >
          {{ t('primary') }}
        </PressButton>
        <PressButton
          type="info"
          @click="onVibrateLong"
        >
          {{ t('info') }}
        </PressButton>
      </div>

      <div class="demo-button-row">
        <PressButton
          type="warning"
          :custom-style="customStyle"
        >
          {{ t('warning') }}
        </PressButton>
        <PressButton
          type="danger"
        >
          {{ t('danger') }}
        </PressButton>
      </div>
    </demo-block>

    <demo-block :title="t('plain')">
      <div class="demo-button-row">
        <PressButton
          plain
          type="default"
          :custom-style="customStyle"
        >
          {{ t('plain') }}
        </PressButton>
        <PressButton
          plain
          type="primary"
          :custom-style="customStyle"
        >
          {{ t('plain') }}
        </PressButton>
      </div>

      <PressButton
        plain
        type="info"
      >
        {{ t('plain') }}
      </PressButton>
    </demo-block>


    <demo-block :title="t('hairline')">
      <PressButton
        plain
        hairline
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('hairlineButton') }}
      </PressButton>
      <PressButton
        plain
        hairline
        type="info"
      >
        {{ t('hairlineButton') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('disabled')">
      <div class="demo-button-row">
        <PressButton
          disabled
          type="primary"
          :custom-style="customStyle"
        >
          {{ t('disabled') }}
        </PressButton>
        <PressButton
          disabled
          type="info"
          :custom-style="customStyle"
        >
          {{ t('disabled') }}
        </PressButton>
      </div>

      <PressButton
        disabled
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('disabled') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('loading')">
      <PressButton
        loading
        type="primary"
        :custom-style="customStyle"
      />
      <PressButton
        loading
        type="primary"
        loading-type="spinner"
        :custom-style="customStyle"
      />
      <PressButton
        loading
        loading-type="circular-tdesign"
        type="info"
        :loading-text="t('loadingText')"
      />
    </demo-block>

    <demo-block :title="t('shape')">
      <PressButton
        square
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('square') }}
      </PressButton>
      <PressButton
        round
        type="info"
      >
        {{ t('round') }}
      </PressButton>
    </demo-block>


    <demo-block :title="t('icon')">
      <PressButton
        icon="star-o"
        type="primary"
        :custom-style="customStyle"
      />
      <PressButton
        icon="star-o"
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('button') }}
      </PressButton>
      <PressButton
        icon="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent-2.png"
      >
        {{ t('button') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('size')">
      <div class="demo-button-row">
        <PressButton
          type="primary"
          size="large"
        >
          {{ t('large') }}
        </PressButton>
      </div>

      <PressButton
        type="primary"
        size="normal"
        :custom-style="customStyle"
      >
        {{ t('normal') }}
      </PressButton>
      <PressButton
        type="primary"
        size="small"
        :custom-style="customStyle"
      >
        {{ t('small') }}
      </PressButton>
      <PressButton
        type="primary"
        size="mini"
      >
        {{ t('mini') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('blockElement')">
      <PressButton
        type="primary"
        block
      >
        {{ t('blockElement') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('customColor')">
      <PressButton
        color="#7232dd"
        :custom-style="customStyle"
        open-type="openSetting"
      >
        {{ t('pure') }}
      </PressButton>
      <PressButton
        color="#7232dd"
        plain
        :custom-style="customStyle"
        open-type="feedback"
      >
        {{ t('pure') }}
      </PressButton>
      <PressButton
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        open-type="share"
      >
        {{ t('gradient') }}
      </PressButton>
    </demo-block>

    <demo-block
      v-for="(item,index) of [0,1,2]"
      :key="index"
      :title="index===1 ?'E-SPORT-DISABLE' : index===2 ? 'E-SPORT-LOADING' : 'E-SPORT'"
    >
      <div class="demo-button-row">
        <!-- :size="{width: '136px', height: '36px'}" -->
        <PressButton
          type="e-sport-primary"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary
        </PressButton>
        <PressButton
          type="e-sport-primary-bg"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg
        </PressButton>
      </div>

      <div class="demo-button-row">
        <PressButton
          type="e-sport-primary-bg-lg"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg-lg
        </PressButton>
      </div>

      <div class="demo-button-row">
        <PressButton
          type="e-sport-primary-bg-xl"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg-xl
        </PressButton>
      </div>

      <div class="demo-button-row">
        <PressButton
          type="e-sport-secondary"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
          :size="{width: '136px', height: '36px'}"
        >
          secondary
        </PressButton>

        <!-- 线框的loader图片是透明的，没效果，直接隐藏 -->
        <PressButton
          v-if="index!==2"
          type="e-sport-border"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
          :size="{width: '136px', height: '36px'}"
        >
          border
        </PressButton>
      </div>
    </demo-block>
  </div>
</template>
<script>
import { isNotInUni } from 'press-ui/common/utils/utils';
import PressButton from 'press-ui/press-button/press-button.vue';


export default {
  i18n: {
    'zh-CN': {
      type: '按钮类型',
      size: '按钮尺寸',
      icon: '图标按钮',
      loading: '加载状态',
      disabled: '禁用状态',
      shape: '按钮形状',
      default: '默认按钮',
      primary: '主要按钮',
      info: '信息按钮',
      danger: '危险按钮',
      warning: '警告按钮',
      large: '大号按钮',
      normal: '普通按钮',
      small: '小型按钮',
      mini: '迷你按钮',
      plain: '朴素按钮',
      square: '方形按钮',
      round: '圆形按钮',
      hairline: '细边框',
      hairlineButton: '细边框按钮',
      loadingText: '加载中...',
      router: '页面导航',
      urlRoute: 'URL 跳转',
      vueRoute: '路由跳转',
      customColor: '自定义颜色',
      pure: '单色按钮',
      gradient: '渐变色按钮',
      blockElement: '块级元素',
    },
    'en-US': {
      type: 'Type',
      size: 'Size',
      icon: 'Icon',
      loading: 'Loading',
      disabled: 'Disabled',
      shape: 'Shape',
      default: 'Default',
      primary: 'Primary',
      info: 'Info',
      danger: 'Danger',
      warning: 'Warning',
      large: 'Large',
      normal: 'Normal',
      small: 'Small',
      mini: 'Mini',
      plain: 'Plain',
      square: 'Square',
      round: 'Round',
      hairline: 'Hairline',
      hairlineButton: 'Hairline',
      loadingText: 'Loading...',
      router: 'Router',
      urlRoute: 'URL',
      vueRoute: 'Vue Router',
      customColor: 'Custom Color',
      pure: 'Pure',
      gradient: 'Gradient',
      blockElement: 'Block Element',
    },
  },
  components: {
    PressButton,
  },
  data() {
    return {
      customStyle: 'margin-right: 16px;',
    };
  },
  onReady() {

  },
  methods: {
    onClick(event) {
      console.log('[CLICK]', event);
    },
    onVibrateLong() {
      if (isNotInUni()) return;

      uni.vibrateLong({
        success() {
          console.log('success');
        },
        fail() {
          console.log('fail');
        },
      });
    },
    onVibrateShort() {
      // #ifdef H5
      navigator.vibrate(1000);
      // #endif

      if (isNotInUni()) return;

      uni.vibrateLong({
        success() {
          console.log('success');
        },
        fail() {
          console.log('fail');
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.demo-button-row {
  margin-bottom: 12px;
}
</style>

