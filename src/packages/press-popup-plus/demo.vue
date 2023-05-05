<template>
  <div class="wrap">
    <demo-block :title="t('basicUsage')">
      <press-button
        type="e-sport-primary-bg"
        @click="onShowPopup('center')"
      >
        {{ t('show') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('position')">
      <press-button
        type="e-sport-primary-bg"
        custom-style="margin: 0 12px 12px 0;"
        @click="onShowPopup('top')"
      >
        {{ t('top') }}
      </press-button>

      <press-button
        type="e-sport-primary-bg"
        custom-style="margin: 0 0 12px 0;"
        @click="onShowPopup('bottom')"
      >
        {{ t('bottom') }}
      </press-button>

      <press-button
        type="e-sport-primary-bg"
        custom-style="margin: 0 12px 0 0;"
        @click="onShowPopup('left')"
      >
        {{ t('left') }}
      </press-button>

      <press-button
        type="e-sport-primary-bg"
        @click="onShowPopup('right')"
      >
        {{ t('right') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('closeIcon')">
      <press-button
        type="e-sport-primary-bg"
        custom-style="margin: 0 12px 12px 0;"
        @click="onShowPopup('bottom', { closeable: true })"
      >
        {{ t('closeIcon') }}
      </press-button>

      <press-button
        type="e-sport-primary-bg"
        custom-style="margin: 0 0 12px 0;"
        @click="onShowPopup('bottom', { closeable: true, closeIcon: 'close' })"
      >
        {{ t('customIcon') }}
      </press-button>

      <press-button
        type="e-sport-primary-bg"
        @click="onShowPopup('bottom', { closeable: true, closeIconPosition: 'top-left' })"
      >
        {{ t('iconPosition') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('round')">
      <press-button
        type="e-sport-primary-bg"
        @click="onShowPopup('bottom', { round: true })"
      >
        {{ t('round') }}
      </press-button>
    </demo-block>

    <press-popup-plus
      :show="show"
      :position="popupPosition"
      :custom-style="customStyle"
      :round="isRound"
      :closeable="isCloseable"
      :close-icon="closeIcon"
      :close-icon-position="closeIconPosition"
      @close="onClose"
    >
      {{ popupPosition ==='center' ? t('content') : '' }}
    </press-popup-plus>
  </div>
</template>
<script>
const DEFAULT_POSITION = 'center';
const DEFAULT_CLOSE_ICON = 'cross';
const DEFAULT_CLOSE_ICON_POSITION = 'top-right';

export default {
  i18n: {
    'zh-CN': {
      show: '展示弹出层',
      position: '弹出位置',
      bottom: '底部弹出',
      top: 'top',
      left: 'left',
      right: 'right',
      closeIcon: '关闭图标',
      customIcon: '自定义图标',
      iconPosition: '图标位置',
      round: '圆角弹窗',
    },
    'en-US': {
      show: 'Show',
      position: 'Position',
      bottom: 'Bottom',
      top: 'Top',
      left: 'Left',
      right: 'Right',
      closeIcon: 'Close Icon',
      customIcon: 'Custom Icon',
      iconPosition: 'Icon Position',
      round: 'Round',
    },
  },
  data() {
    return {
      show: false,
      popupPosition: DEFAULT_POSITION,
      customStyle: '',
      isRound: false,
      isCloseable: false,
      closeIcon: DEFAULT_CLOSE_ICON,
      closeIconPosition: DEFAULT_CLOSE_ICON_POSITION,
    };
  },
  methods: {
    onClose() {
      this.show = false;
    },
    onShowPopup(position, props = {}) {
      this.popupPosition = position || DEFAULT_POSITION;

      let customStyle = '';

      this.isRound = !!props.round;
      this.isCloseable = !!props.closeable;
      this.closeIcon = props.closeIcon || DEFAULT_CLOSE_ICON;
      this.closeIconPosition = props.closeIconPosition || DEFAULT_CLOSE_ICON_POSITION;

      switch (position) {
        case 'top': {
          customStyle = 'height: 20%;';
          break;
        }

        case 'bottom': {
          customStyle = 'height: 20%;';
          break;
        }

        case 'left': {
          customStyle = 'width: 30%;height: 100%;';
          break;
        }

        case 'right': {
          customStyle = 'width: 30%;height: 100%;';
          break;
        }

        case 'center': {
          customStyle = 'padding: 30px 50px;';
          break;
        }

        default: {
          customStyle = '';
        }
      }
      this.customStyle = customStyle;

      // 去除上一次遗留动画方向影响
      this.$nextTick(() => {
        this.show = true;
      });
    },

  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
</style>
