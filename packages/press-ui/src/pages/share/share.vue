<template>
  <div
    class="demo-wrap"
  >
    <demo-block
      :title="t('share')"
    >
      <press-cell
        :title="t('share')"
        is-link
        @click="onShare"
      />
    </demo-block>

    <demo-block
      :title="t('custom')"
    >
      <press-cell
        :title="t('custom')"
        is-link
        @click="onCustom"
      />
    </demo-block>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL_2"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL_2"
      mode="functional"
    />
  </div>
</template>
<script>
import { FUNCTIONAL_ID_MAP } from 'src/packages/press-popup-cell/demo-helper/helper';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';

import { showCustomPopup } from './custom';
import { initShare, openShareUI, initShareMp, openShareUIMp } from 't-comm/lib/share/index';
import { getWxSignaturePromise } from '../../utils/wx/wx-signature';
import { getMiniProgramOpenLink } from '../../utils/wx/open-link';
import { calBase64Size } from 't-comm/lib/share/helper';
import { urlToBase64 } from 't-comm/lib/dom-to-image/dom-to-image';
import { invoke } from './pvp-app';


export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
      share: '分享',
    },
    'en-US': {
      custom: 'Custom',
      share: 'Share',
    },
  },
  components: {
    PressPopupCell,
    PressCell,
  },
  data() {
    return {
      FUNCTIONAL_ID_MAP,
      params: {
        showTypeInGame: [1, 2, 3, 4],
        useOpenLink: true,
      },
      shareParams: {
        title: 'PressUI 跨端组件库',
        desc: 'PressUI可用于uni-app项目、基于Vue的普通H5和PC项目',
        icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fshare-sheet-wechat.png',
        mpImageUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-avatar-wx-share.png',

        link: 'https://novlan1.github.io/press-ui-demo-vue2/#/pages/launch-app/launch-app?show=true',
        mpPath: '/pages/press/protocol/protocol?a=1&b=2&c=3&d=china&e=dd123ff',
        getWxSignaturePromise,
        getMiniProgramOpenLink,
        pvpInvoke: invoke,
      },
    };
  },
  created() {
  },
  mounted() {
    // getMiniProgramOpenLink();
    this.onInitShare();
  },
  methods: {
    onInitShare() {
      // #ifdef H5
      initShare(this.shareParams);
      // #endif
      // #ifndef H5
      initShareMp(this.shareParams);
    // #endif
    },
    onCustom() {
      showCustomPopup({
        context: this,
        callback: {
          changeParams: this.changeParams,
        },
        params: this.params,
      });
    },
    changeParams(params) {
      this.params = {
        ...this.params,
        ...(params || {}),
      };
      const { showTypeInGame, useOpenLink } = this.params;
      if (useOpenLink) {
        this.shareParams.getMiniProgramOpenLink = getMiniProgramOpenLink;
      } else {
        delete this.shareParams.getMiniProgramOpenLink;
      }
      this.shareParams.showTypeInGame = showTypeInGame;
      this.onInitShare();
    },
    onShare() {
      // #ifdef H5
      openShareUI();
      // #endif
      // #ifndef H5
      openShareUIMp();
    // #endif
    },
    async onGetImgSize() {
      const icon = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article%2F2023%2F8%2Fqq-btn.png';
      const data = await urlToBase64(icon);
      const size = calBase64Size(data);
      console.log('[onGetImgSize] size', size);
      console.log('[onGetImgSize] data', data);
    },
  },
};
</script>
