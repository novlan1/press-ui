<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressCell
        :title="t('basicUsage')"
        is-link
        @click="onShowPopup('center')"
      />
    </demo-block>

    <demo-block :title="t('position')">
      <PressCell
        :title="t('top')"
        is-link
        @click="onShowPopup('top')"
      />
      <PressCell
        :title="t('bottom')"
        is-link
        @click="onShowPopup('bottom')"
      />
      <PressCell
        :title="t('left')"
        is-link
        @click="onShowPopup('left')"
      />
      <PressCell
        :title="t('right')"
        is-link
        @click="onShowPopup('right')"
      />
    </demo-block>

    <demo-block :title="t('closeIcon')">
      <PressCell
        :title="t('closeIcon')"
        is-link
        @click="onShowPopup('bottom', { closeable: true })"
      />
      <PressCell
        :title="t('customIcon')"
        is-link
        @click="onShowPopup('bottom', { closeable: true, closeIcon: 'close' })"
      />
      <PressCell
        :title="t('iconPosition')"
        is-link
        @click="onShowPopup('bottom', { closeable: true, closeIconPosition: 'top-left' })"
      />
      <PressCell
        :title="t('rightCloseIcon')"
        is-link
        @click="onShowPopup('right', { closeable: true })"
      />
    </demo-block>

    <demo-block :title="t('round')">
      <PressCell
        :title="t('round')"
        is-link
        @click="onShowPopup('bottom', { round: true, })"
      />
    </demo-block>

    <PressPopup
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
    </PressPopup>
  </div>
</template>
<script>
import { nextTick } from 'press-ui/common/utils/system';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressPopup from 'press-ui/press-popup/press-popup.vue';


const DEFAULT_POSITION = 'center';
const DEFAULT_CLOSE_ICON = 'cross';
const DEFAULT_CLOSE_ICON_POSITION = 'top-right';

export default {
  i18n: {
    'zh-CN': {
      show: '查看',
      position: '弹出位置',
      bottom: '底部弹出',
      top: '顶部弹出',
      left: '左侧弹出',
      right: '右侧弹出',
      closeIcon: '关闭图标',
      customIcon: '自定义图标',
      iconPosition: '图标位置',
      rightCloseIcon: '右侧弹出关闭图标',
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
      rightCloseIcon: 'Right with Icon',
      round: 'Round',
    },
  },
  components: {
    PressCell,
    PressPopup,
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
      const sidePositionStyle = `${[
        'width: 30%',
        'height: calc(100% - var(--window-top, 0px))',
        'top: calc(50% + var(--window-top, 0px) / 2)',
        'bottom: 0',
      ].join(';')};`;

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
          customStyle = sidePositionStyle ;
          break;
        }

        case 'right': {
          customStyle = sidePositionStyle;
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
      nextTick(() => {
        this.show = true;
      });
    },

  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding-bottom: 400px;
  font-size: 16px;
}
</style>
