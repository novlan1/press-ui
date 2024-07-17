<template>
  <press-collapse-item
    v-if="quickLinkList.length"
    name="quickList"
    :is-link="false"
    :active="activeNames.indexOf(`quickList`) > -1"
  >
    <press-section
      slot="title"
      key="other-project-section"
      :title="t('otherProject')"
      :active="activeNames.indexOf(`quickList`) > -1"
      :color="sectionStyle.color"
      :clickable="true"
      type="line"
      :header-style="sectionStyle.header"
    />

    <PressCell
      v-for="(quickLink) of quickLinkList"
      :key="quickLink.link"
      is-link
      :title="quickLink.label"
      custom-class="component-cell"
      @click="onJumpToOtherDemo(quickLink)"
    />
  </press-collapse-item>
</template>
<script>
import PressSection from '../press-section/press-section.vue';
import PressCollapseItem from 'press-ui/press-collapse-item/press-collapse-item';

import { isNotInUni } from '../../../packages/common/utils/utils';
import { setClipboardData } from '../../../packages/common/clipboard/clipboard';

import { fetchData } from '../../../utils/index';


const HELP_DATA_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__press_ui_helpe_config.json';


function getShowDemoMap() {
  let showOtherDemoMap = {
    vue2Uni: false,
    vue2NotUni: false,
    vue3Uni: false,
  };
  showOtherDemoMap = {
    vue2Uni: true,
    vue2NotUni: true,
    vue3Uni: true,
  };

  // #ifdef VUE3
  showOtherDemoMap.vue3Uni = false;
  // #endif

  if (isNotInUni()) {
    showOtherDemoMap.vue2NotUni = false;
  }

  // #ifndef VUE3
  if (!isNotInUni()) {
    showOtherDemoMap.vue2Uni = false;
  }
  // #endif

  return showOtherDemoMap;
}


export default {
  i18n: {
    'zh-CN': {
      otherProject: '相关项目',
    },
    'en-US': {
      otherProject: 'Other Project',
    },
  },
  name: 'QuickListComp',
  components: {
    PressSection,
    PressCollapseItem,
  },
  props: {
    helpDataUrl: {
      type: String,
      default: HELP_DATA_URL,
    },
    sectionStyle: {
      type: Object,
      default: () => ({
        header: 'font-weight: 500;margin-bottom: 0px;',
        color: '#007aff',
      }),
    },
    activeNames: {
      type: Array,
      default: () => (['quickList']),
    },
  },
  data() {
    return {
      showOtherDemoMap: getShowDemoMap(),
      helpConfig: {},
    };
  },
  computed: {
    quickLinkList() {
      const { showOtherDemoMap, helpConfig = {} } = this;
      let list = helpConfig.quickLinkList || [];

      if (!showOtherDemoMap.vue2Uni) {
        list = list.filter(item => item.name !== 'vue2-uni');
      }
      if (!showOtherDemoMap.vue2NotUni) {
        list = list.filter(item => item.name !== 'vue2-not-uni');
      }
      if (!showOtherDemoMap.vue3Uni) {
        list = list.filter(item => item.name !== 'vue3-uni');
      }

      // #ifdef MP-QQ
      list = list.filter(item => !!item.mpQQ);
      // #endif
      return list;
    },
  },
  mounted() {
    this.getHelpData();
  },
  methods: {
    getHelpData() {
      fetchData(this.helpDataUrl).then((data) => {
        this.helpConfig = data;
      });
    },
    onJumpToOtherDemo(item) {
      const { link, mpWeixin, mpQQ } = item;
      if (!link) return;

      // #ifdef H5
      this.$toast.loading({
        message: '正在跳转...',
        forbidClick: true,
        duration: 300,
        loadingType: 'spinner',
      });

      this.$emit('onBeforeDestroy');
      setTimeout(() => {
        window.location.href = link;
      }, 300);
      // #endif

      // #ifndef H5
      // #ifdef MP-WEIXIN
      if (mpWeixin && mpWeixin.appId) {
        uni.navigateToMiniProgram({
          appId: mpWeixin.appId,
          path: mpWeixin.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      // #ifdef MP-QQ
      if (mpQQ && mpQQ.appId) {
        uni.navigateToMiniProgram({
          appId: mpQQ.appId,
          path: mpQQ.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      setClipboardData(link).then(() => {
        this.onGTip('🎉 复制成功，请到浏览器中查看');
      });
      // #endif
    },
  },
};
</script>
