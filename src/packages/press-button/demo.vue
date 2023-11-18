<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block :title="t('type')">
      <div class="demo-button-row">
        <press-button
          type="default"
          :custom-style="customStyle"
          @click="onClick"
        >
          {{ t('default') }}
        </press-button>
        <press-button
          type="primary"
          :custom-style="`${customStyle}`"
          @click="onVibrateShort"
        >
          {{ t('primary') }}
        </press-button>
        <press-button
          type="info"
          @click="onVibrateLong"
        >
          {{ t('info') }}
        </press-button>
      </div>

      <div class="demo-button-row">
        <press-button
          type="warning"
          :custom-style="customStyle"
          @click="onLaunchMp"
        >
          {{ t('warning') }}
        </press-button>
        <press-button
          type="danger"
          @click="onLaunchMp(1)"
        >
          {{ t('danger') }}
        </press-button>
      </div>
    </demo-block>

    <demo-block :title="t('plain')">
      <div class="demo-button-row">
        <press-button
          plain
          type="default"
          :custom-style="customStyle"
        >
          {{ t('plain') }}
        </press-button>
        <press-button
          plain
          type="primary"
          :custom-style="customStyle"
        >
          {{ t('plain') }}
        </press-button>
      </div>

      <press-button
        plain
        type="info"
      >
        {{ t('plain') }}
      </press-button>
    </demo-block>


    <demo-block :title="t('hairline')">
      <press-button
        plain
        hairline
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('hairlineButton') }}
      </press-button>
      <press-button
        plain
        hairline
        type="info"
      >
        {{ t('hairlineButton') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('disabled')">
      <div class="demo-button-row">
        <press-button
          disabled
          type="primary"
          :custom-style="customStyle"
        >
          {{ t('disabled') }}
        </press-button>
        <press-button
          disabled
          type="info"
          :custom-style="customStyle"
        >
          {{ t('disabled') }}
        </press-button>
      </div>

      <press-button
        disabled
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('disabled') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('loading')">
      <press-button
        loading
        type="primary"
        :custom-style="customStyle"
      />
      <press-button
        loading
        type="primary"
        loading-type="spinner"
        :custom-style="customStyle"
      />
      <press-button
        loading
        type="info"
        :loading-text="t('loadingText')"
      />
    </demo-block>

    <demo-block :title="t('shape')">
      <press-button
        square
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('square') }}
      </press-button>
      <press-button
        round
        type="info"
      >
        {{ t('round') }}
      </press-button>
    </demo-block>


    <demo-block :title="t('icon')">
      <press-button
        icon="star-o"
        type="primary"
        :custom-style="customStyle"
      />
      <press-button
        icon="star-o"
        type="primary"
        :custom-style="customStyle"
      >
        {{ t('button') }}
      </press-button>
      <press-button
        icon="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent-2.png"
      >
        {{ t('button') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('size')">
      <div class="demo-button-row">
        <press-button
          type="primary"
          size="large"
        >
          {{ t('large') }}
        </press-button>
      </div>

      <press-button
        type="primary"
        size="normal"
        :custom-style="customStyle"
      >
        {{ t('normal') }}
      </press-button>
      <press-button
        type="primary"
        size="small"
        :custom-style="customStyle"
      >
        {{ t('small') }}
      </press-button>
      <press-button
        type="primary"
        size="mini"
      >
        {{ t('mini') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('blockElement')">
      <press-button
        type="primary"
        block
      >
        {{ t('blockElement') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('customColor')">
      <press-button
        color="#7232dd"
        :custom-style="customStyle"
      >
        {{ t('pure') }}
      </press-button>
      <press-button
        color="#7232dd"
        plain
        :custom-style="customStyle"
      >
        {{ t('pure') }}
      </press-button>
      <press-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
      >
        {{ t('gradient') }}
      </press-button>
    </demo-block>

    <demo-block
      v-for="(item,index) of [0,1,2]"
      :key="index"
      :title="index===1 ?'E-SPORT-DISABLE' : index===2 ? 'E-SPORT-LOADING' : 'E-SPORT'"
    >
      <div class="demo-button-row">
        <!-- :size="{width: '136px', height: '36px'}" -->
        <press-button
          type="e-sport-primary"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary
        </press-button>
        <press-button
          type="e-sport-primary-bg"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg
        </press-button>
      </div>

      <div class="demo-button-row">
        <press-button
          type="e-sport-primary-bg-lg"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg-lg
        </press-button>
      </div>

      <div class="demo-button-row">
        <press-button
          type="e-sport-primary-bg-xl"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
        >
          primary-bg-xl
        </press-button>
      </div>

      <div class="demo-button-row">
        <press-button
          type="e-sport-secondary"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
          :size="{width: '136px', height: '36px'}"
        >
          secondary
        </press-button>

        <!-- 线框的loader图片是透明的，没效果，直接隐藏 -->
        <press-button
          v-if="index!==2"
          type="e-sport-border"
          :disabled="index===1"
          :loading="index===2"
          :custom-style="customStyle"
          :size="{width: '136px', height: '36px'}"
        >
          border
        </press-button>
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressButton from 'src/packages/press-button/press-button.vue';
import { isNotInUni } from 'src/packages/common/utils/utils';
import { launchMiniProgram } from 't-comm/lib/msdk/mini-program';


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
    onLaunchMp(isQQ) {
      console.log('[launchMiniProgram]');
      // #ifdef H5
      launchMiniProgram({
        appId: 'wx99c1c10a389e7433',
        isWxMp: !isQQ,
      });
      // #endif
    },
    onClick(event) {
      console.log(event);
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

