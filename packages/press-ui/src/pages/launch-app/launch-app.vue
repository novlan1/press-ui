<template>
  <div
    v-if="canShow"
    class="demo-wrap"
  >
    <demo-block
      :title="t('launchApp')"
    >
      <press-cell
        v-for="(item, index) of gameList"
        :key="index"
        :title="item.en"
        is-link
        @click="onLaunchApp(item.key)"
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
  </div>
</template>
<script>
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';

import { FUNCTIONAL_ID_MAP } from 'src/packages/press-popup-cell/demo-helper/helper';
import {
  GAME_MAP,
} from './config';
import { showCustomPopup } from './custom';


export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
      launchApp: 'Launch App',
    },
    'en-US': {
      custom: 'Custom',
      launchApp: 'Launch App',
    },
  },
  components: {
    PressPopupCell,
    PressCell,
  },
  data() {
    const canShow = true;
    const gameList = Object.keys(GAME_MAP).reduce((acc, key) => {
      acc.push({
        ...(GAME_MAP[key] || {}),
        key,
      });
      return acc;
    }, []);

    return {
      canShow,
      GAME_MAP,
      FUNCTIONAL_ID_MAP,
      gameList,
      params: {
        isUseSchemeParams: true,
        openMarket: false,
        needRedirect: false,
      },
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onLaunchApp(key) {
      const { launchFunction } = GAME_MAP[key];
      console.log('[params]', this.params);

      launchFunction?.(this.params);
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
    },
  },
};
</script>
