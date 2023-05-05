<template>
  <div>
    <div>
      <demo-block :title="t('closeIcon')">
        <PressButton
          type="e-sport-primary"
          :custom-style="customStyle"
          @click="onShowPopup('normal')"
        >
          {{ t('check') }}
        </PressButton>
      </demo-block>
      <demo-block :title="t('cancelIcon')">
        <PressButton
          type="e-sport-primary"
          :custom-style="customStyle"
          @click="onShowPopup('cancel')"
        >
          {{ t('check') }}
        </PressButton>
      </demo-block>
      <demo-block :title="t('noCloseOrCancel')">
        <PressButton
          type="e-sport-primary"
          :custom-style="customStyle"
          @click="onShowPopup('noClose')"
        >
          {{ t('check') }}
        </PressButton>
      </demo-block>

      <demo-block :title="t('plainButtonConfirm')">
        <PressButton
          type="e-sport-primary"
          :custom-style="customStyle"
          @click="onShowPopup('borderBtn')"
        >
          {{ t('check') }}
        </PressButton>
      </demo-block>

      <demo-block :title="t('horizontal')">
        <PressButton
          type="e-sport-primary"
          :custom-style="customStyle"
          @click="onShowPopup('hor')"
        >
          {{ t('check') }}
        </PressButton>
      </demo-block>
    </div>

    <PressPopup
      v-if="popupOptions.normal.show"
      :is-showpopup-close="true"
      :show-back-arrow="false"
      :popup-title="popupOptions.normal.title"
      :popup-title-btn="t('confirm')"
      @onConfirm="popupOptions.normal.onConfirm"
      @onCancel="popupOptions.normal.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopup>

    <PressPopup
      v-if="popupOptions.cancel.show"
      :is-showpopup-close="true"
      :show-back-arrow="true"
      :popup-title="popupOptions.cancel.title"
      :popup-title-btn="t('confirm')"
      @onConfirm="popupOptions.cancel.onConfirm"
      @onCancel="popupOptions.cancel.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopup>

    <PressPopup
      v-if="popupOptions.noClose.show"
      :is-showpopup-close="false"
      :show-back-arrow="false"
      :popup-title="popupOptions.noClose.title"
      :popup-title-btn="t('confirm')"
      @onConfirm="popupOptions.noClose.onConfirm"
      @onCancel="popupOptions.noClose.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopup>

    <PressPopup
      v-if="popupOptions.hor.show"
      :is-showpopup-close="true"
      :is-cross-slab="true"
      :width-number="54"
      :popup-title="popupOptions.hor.title"
      @onConfirm="popupOptions.hor.onConfirm"
      @onCancel="popupOptions.hor.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopup>

    <PressPopup
      v-if="popupOptions.borderBtn.show"
      :is-showpopup-close="true"
      :show-back-arrow="false"
      :is-border-btn="true"
      :popup-title="popupOptions.borderBtn.title"
      :popup-title-btn="t('confirm')"
      @onConfirm="popupOptions.borderBtn.onConfirm"
      @onCancel="popupOptions.borderBtn.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopup>
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      wayToWin: '决胜方式',
      SomeContent: '一些内容',
      check: '查看',
      closeIcon: '关闭图标',
      cancelIcon: '取消图标',
      noCloseOrCancel: '没有关闭/取消',
      plainButtonConfirm: '线框确认图标',
      horizontal: '横版',
    },
    'en-US': {
      wayToWin: 'Bo Number',
      SomeContent: 'Some Content',
      check: 'Check',
      closeIcon: 'Close Ion',
      cancelIcon: 'Cancel Icon',
      noCloseOrCancel: 'No Close Or Cancel',
      plainButtonConfirm: 'Plain Confirm Button',
      horizontal: 'Horizontal Version',
    },
  },
  data() {
    return {
      type: '',
      customStyle: '',
      popupOptions: {
        normal: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.normal.show = false;
          },
          onConfirm: () => {
            this.popupOptions.normal.show = false;
          },
        },
        cancel: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.cancel.show = false;
          },
          onConfirm: () => {
            this.popupOptions.cancel.show = false;
          },
        },
        noClose: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.noClose.show = false;
          },
          onConfirm: () => {
            this.popupOptions.noClose.show = false;
          },
        },
        hor: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.hor.show = false;
          },
          onConfirm: () => {
            this.popupOptions.hor.show = false;
          },
        },
        borderBtn: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.borderBtn.show = false;
          },
          onConfirm: () => {
            this.popupOptions.borderBtn.show = false;
          },
        },
      },
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onShowPopup(type) {
      this.type = type;
      console.log('type', type);
      if (this.popupOptions[type]) {
        this.popupOptions[type].show = true;
      }
    },
    validateConfirm() {
      if (['noClose', 'borderBtn'].indexOf(this.type) <= -1) return true;

      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.type === 'noClose') {
            console.log('异步确认后可以关闭');
            resolve(true);
          } else {
            resolve(false);
            console.log('异步确认后禁止关闭');
          }
        }, 2000);
      });
    },
  },
};
</script>
<style scoped>
.content {
  font-size: 16px;
  padding: 20px;
}
</style>
